import { secrets } from "base44:runtime";

// Estimates a residential garage's square footage from a street address.
//
// Primary source: Browserbase Fetch against Zillow. Zillow server-renders
// property facts (garage spaces, interior sqft, parking description) into its
// homedetails pages, so Fetch's structured-JSON extraction can pull them
// without executing JavaScript. The lookup is two-step:
//   1. Fetch the Zillow search page and extract a homedetails URL from it.
//   2. Fetch that homedetails page and extract garage + interior sqft.
// Zillow shields its search with PerimeterX bot detection, so this step can be
// intermittently blocked — when it is, we fall through to the fallbacks below.
//
// Fallback 1: OpenStreetMap Nominatim (geocode) + Overpass (building footprints).
// Fallback 2: a size-based estimate chosen by the visitor.

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const BROWSERBASE_FETCH_URL = "https://api.browserbase.com/v1/fetch";
const EARTH_RADIUS_M = 6378137;

// Standard single garage bay ≈ 12' x 20' (240 sqft); 220 is a conservative avg.
const SQFT_PER_GARAGE_BAY = 220;
const GARAGE_FRACTION_OF_LIVING = 0.20;

function polygonAreaM2(ring) {
  if (!ring || ring.length < 3) return 0;
  const lat0 = ring[0][1] * Math.PI / 180;
  const mPerDegLat = EARTH_RADIUS_M * Math.PI / 180;
  const mPerDegLon = EARTH_RADIUS_M * Math.PI / 180 * Math.cos(lat0);
  let area = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    area += (x1 * mPerDegLon) * (y2 * mPerDegLat) - (x2 * mPerDegLon) * (y1 * mPerDegLat);
  }
  return Math.abs(area / 2);
}

function sqMetersToSqFt(m2) {
  return Math.round(m2 * 10.7639);
}

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

async function geocode(address) {
  const url = `${NOMINATIM_URL}?format=jsonv2&addressdetails=1&limit=1&q=${encodeURIComponent(address)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "FloorPricePro/1.0 (property-lookup)",
      "Accept-Language": "en"
    }
  });
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
  const data = await res.json();
  if (!data || !data.length) return null;
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    displayName: data[0].display_name,
    type: data[0].type,
    category: data[0].category
  };
}

async function findBuildings(lat, lon) {
  const radius = 40; // meters
  const query = `
    [out:json][timeout:15];
    (
      way(around:${radius},${lat},${lon})["building"];
      relation(around:${radius},${lat},${lon})["building"];
    );
    out geom;
  `;
  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "data=" + encodeURIComponent(query)
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.elements || []).map((el) => {
    const tags = el.tags || {};
    let geom = null;
    if (el.type === "way" && el.geometry) {
      geom = el.geometry.map((p) => [p.lon, p.lat]);
    } else if (el.type === "relation" && el.members) {
      const outer = el.members.find((m) => m.role === "outer" && m.geometry);
      if (outer) geom = outer.geometry.map((p) => [p.lon, p.lat]);
    }
    if (!geom || geom.length < 3) return null;
    return {
      areaM2: polygonAreaM2(geom),
      building: tags.building,
      name: tags.name,
      isGarage: tags.building === "garage" || tags.building === "garages" || (tags.name || "").toLowerCase().includes("garage")
    };
  }).filter(Boolean);
}

// Single Browserbase Fetch call (proxies + redirects enabled). Returns the
// parsed response envelope, or null on failure/timeout.
async function bbFetch(apiKey, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(BROWSERBASE_FETCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-BB-API-Key": apiKey
      },
      body: JSON.stringify({ proxies: true, allowRedirects: true, ...payload }),
      signal: controller.signal
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// Parse a car count out of a free-text parking description, e.g.
// "2 car garage", "one car carport", "1-car garage".
function parseCarCount(desc) {
  if (!desc || typeof desc !== "string") return null;
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const wordMatch = desc.match(/\b(one|two|three|four|five)\b[\s-]?car\b/i);
  if (wordMatch) return words[wordMatch[1].toLowerCase()] ?? null;
  const numMatch = desc.match(/(\d+)\s*[-\s]?car\b/i);
  if (numMatch) return parseInt(numMatch[1], 10);
  return null;
}

// Build an Estately listing URL slug from a street address. Estately serves
// property pages at https://www.estately.com/listings/info/{address-slug} with
// server-rendered HTML (no JavaScript required), so Browserbase Fetch can read
// interior sqft, beds, baths, and a parking description directly.
function estatelySlug(address) {
  return address.toLowerCase()
    .replace(/,/g, "")
    .replace(/\./g, "")
    .replace(/#/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Scrape Estately via Browserbase Fetch with structured-JSON extraction.
// Returns the extracted property facts, or null when unconfigured / not found.
async function browserbasePropertyLookup(address) {
  const apiKey = secrets.get("BROWSERBASE_API_KEY");
  if (!apiKey) return null;

  const url = `https://www.estately.com/listings/info/${estatelySlug(address)}`;
  const schema = {
    type: "object",
    properties: {
      found: { type: "boolean", description: "True if a property listing matching this address was found on the page" },
      interior_sqft: { type: "number", description: "Interior living area in square feet" },
      beds: { type: "number", description: "Number of bedrooms" },
      baths: { type: "number", description: "Number of bathrooms" },
      parking_desc: { type: "string", description: "Parking/garage description from the listing, e.g. 'one car carport', '2 car garage', or empty if none mentioned" },
      garage_spaces: { type: "number", description: "Number of enclosed garage parking spaces (0 if carport only or none)" }
    },
    required: ["found"]
  };

  const data = await bbFetch(apiKey, { url, format: "json", schema });
  let content = data?.content;
  if (typeof content === "string") {
    try { content = JSON.parse(content); } catch { return null; }
  }
  if (!content || content.found === false) return null;
  return content;
}

// Convert extracted property facts to a garage sqft estimate.
function garageSqftFromListing(listing) {
  if (!listing) return null;
  let spaces = Number(listing.garage_spaces);
  if (!Number.isFinite(spaces) || spaces < 1) {
    const fromDesc = parseCarCount(listing.parking_desc);
    if (fromDesc) spaces = fromDesc;
  }
  if (Number.isFinite(spaces) && spaces >= 1) {
    return clamp(Math.round(spaces * SQFT_PER_GARAGE_BAY), 200, 1000);
  }
  const interior = Number(listing.interior_sqft);
  if (Number.isFinite(interior) && interior >= 400) {
    return clamp(Math.round(interior * GARAGE_FRACTION_OF_LIVING), 200, 900);
  }
  return null;
}

export default async function(req) {
  try {
    // Public utility used in the lead-gen funnel (unauthenticated visitors).
    // Only calls public property/OpenStreetMap APIs — no user data accessed.
    const body = await req.json();
    const address = body?.address;
    const fallbackSqft = body?.fallback_sqft || 440;

    if (!address) return Response.json({ error: "Address is required" }, { status: 400 });

    // 1. Geocode the address (validates it and gives lat/lon for the OSM fallback)
    const geo = await geocode(address);
    if (!geo) {
      return Response.json({
        address_valid: false,
        sqft: fallbackSqft,
        source: "fallback_size",
        note: "Address could not be verified; using selected garage size estimate."
      });
    }

    // 2. Try Browserbase (Estately) first — most accurate garage data
    const listing = await browserbasePropertyLookup(address);
    const listingSqft = garageSqftFromListing(listing);
    if (listingSqft) {
      return Response.json({
        address_valid: true,
        sqft: listingSqft,
        latitude: geo.lat,
        longitude: geo.lon,
        matched_address: geo.displayName,
        source: "browserbase_estately",
        garage_spaces: listing.garage_spaces ?? null,
        interior_sqft: listing.interior_sqft ?? null,
        parking_desc: listing.parking_desc ?? null
      });
    }

    // 3. Fall back to OpenStreetMap building footprints
    let buildings = [];
    try {
      buildings = await findBuildings(geo.lat, geo.lon);
    } catch {
      // Overpass may be unavailable; fall through to estimate
    }

    let sqft = fallbackSqft;
    let source = "fallback_size";

    const garages = buildings.filter((b) => b.isGarage);
    if (garages.length) {
      const best = garages.reduce((a, b) => (b.areaM2 > a.areaM2 ? b : a));
      sqft = sqMetersToSqFt(best.areaM2);
      source = "osm_garage_footprint";
    } else if (buildings.length) {
      const largest = buildings.reduce((a, b) => (b.areaM2 > a.areaM2 ? b : a));
      const homeSqft = sqMetersToSqFt(largest.areaM2);
      sqft = clamp(Math.round(homeSqft * 0.22), 200, 1000);
      source = "osm_building_estimate";
    }

    return Response.json({
      address_valid: true,
      sqft,
      latitude: geo.lat,
      longitude: geo.lon,
      matched_address: geo.displayName,
      source,
      buildings_found: buildings.length,
      garage_found: garages.length > 0,
      browserbase_attempted: !!secrets.get("BROWSERBASE_API_KEY")
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}