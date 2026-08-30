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

// Build a Realtor.com property detail URL from a street address.
// Format: https://www.realtor.com/realestateandhomes-detail/{street}_{city}_{state}_{zip}
function realtorUrl(address) {
  const parts = address.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length < 3) return null;
  const clean = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const street = clean(parts[0]);
  const city = clean(parts[1]);
  const lastPart = parts[parts.length - 1];
  const m = lastPart.match(/^([A-Za-z]{2})\s*(\d{5})?/);
  if (!m) return null;
  const state = m[1].toUpperCase();
  const zip = m[2] || "";
  return `https://www.realtor.com/realestateandhomes-detail/${street}_${city}_${state}${zip ? `_${zip}` : ""}`;
}

// Build a Zillow search URL. Zillow redirects /homes/{query}_rb/ to the matching
// property details page when an exact address is found.
function zillowUrl(address) {
  return `https://www.zillow.com/homes/${encodeURIComponent(address)}_rb/`;
}

// Scrape multiple public-records sources via the Browserbase cloud browser with
// structured-JSON extraction. Tries Realtor.com, Zillow, then Estately — each has
// different coverage, so trying several maximizes the chance of finding real
// garage data. Returns the extracted facts + which source succeeded, or null.
async function browserbaseMultiSourceLookup(address) {
  const apiKey = secrets.get("BROWSERBASE_API_KEY");
  if (!apiKey) return null;

  const schema = {
    type: "object",
    properties: {
      found: { type: "boolean", description: "True if a property matching this address was found on the page" },
      interior_sqft: { type: "number", description: "Interior living area in square feet" },
      garage_spaces: { type: "number", description: "Number of enclosed garage parking spaces (0 if carport only or none)" },
      parking_desc: { type: "string", description: "Parking/garage description, e.g. '2 car garage', 'one car carport', or empty if none mentioned" },
      lot_sqft: { type: "number", description: "Lot size in square feet" }
    },
    required: ["found"]
  };

  const sources = [
    { name: "realtor", url: realtorUrl(address) },
    { name: "zillow", url: zillowUrl(address) },
    { name: "estately", url: `https://www.estately.com/listings/info/${estatelySlug(address)}` }
  ].filter((s) => s.url);

  for (const source of sources) {
    try {
      const data = await bbFetch(apiKey, { url: source.url, format: "json", schema });
      let content = data?.content;
      if (typeof content === "string") {
        try { content = JSON.parse(content); } catch { continue; }
      }
      if (content && content.found !== false) {
        return { ...content, source_name: source.name };
      }
    } catch {
      // try next source
    }
  }
  return null;
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

    // 1. Try the Browserbase cloud browser FIRST across multiple public-records
    // sources (Realtor.com, Zillow, Estately). This needs only the address string
    // (no geocoding), so it runs even when Nominatim is rate-limited. Each source
    // has different coverage, so trying several maximizes the chance of finding
    // the real garage square footage from public records.
    const listing = await browserbaseMultiSourceLookup(address);
    const listingSqft = garageSqftFromListing(listing);
    if (listingSqft) {
      // Best-effort geocode for lat/lon (don't block the response on it).
      let geo = null;
      try { geo = await geocode(address); } catch {}
      return Response.json({
        address_valid: true,
        sqft: listingSqft,
        latitude: geo?.lat ?? null,
        longitude: geo?.lon ?? null,
        matched_address: geo?.displayName ?? null,
        source: `browserbase_${listing.source_name}`,
        garage_spaces: listing.garage_spaces ?? null,
        interior_sqft: listing.interior_sqft ?? null,
        parking_desc: listing.parking_desc ?? null
      });
    }

    // 2. Fall back to OpenStreetMap building footprints (needs geocoding).
    let geo = null;
    try { geo = await geocode(address); } catch {}

    if (!geo) {
      return Response.json({
        address_valid: false,
        sqft: fallbackSqft,
        source: "fallback_size",
        browserbase_attempted: true,
        note: "No public-records listing found and address could not be geocoded; using selected garage size estimate."
      });
    }

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
      browserbase_attempted: true
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}