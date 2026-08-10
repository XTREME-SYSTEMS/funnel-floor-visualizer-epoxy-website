import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Estimates a residential garage's square footage from a street address.
// Uses OpenStreetMap Nominatim (free, no key) to geocode + validate the address,
// then the Overpass API to find building footprints at that location.
// Falls back to a size-based estimate when no building data is found.

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const EARTH_RADIUS_M = 6378137;

function haversineArea(lat1, lon1, lat2, lon2) {
  // approximate area of a lat/lon bounding box in sq meters
  const latRad = (lat1 + lat2) / 2 * Math.PI / 180;
  const widthM = (lon2 - lon1) * Math.PI / 180 * EARTH_RADIUS_M * Math.cos(latRad);
  const heightM = (lat2 - lat1) * Math.PI / 180 * EARTH_RADIUS_M;
  return Math.abs(widthM * heightM);
}

function polygonAreaM2(ring) {
  // shoelace on lat/lon converted to meters (local projection)
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

export default async function(req) {
  try {
    // Public utility used in the lead-gen funnel (unauthenticated visitors).
    // Only calls public OpenStreetMap APIs — no user data accessed.
    const body = await req.json();
    const address = body?.address;
    const fallbackSize = body?.garage_size || "two_car";
    const fallbackSqft = body?.fallback_sqft || 440;

    if (!address) return Response.json({ error: "Address is required" }, { status: 400 });

    // 1. Geocode the address
    const geo = await geocode(address);
    if (!geo) {
      return Response.json({
        address_valid: false,
        sqft: fallbackSqft,
        source: "fallback_size",
        note: "Address could not be verified; using selected garage size estimate."
      });
    }

    // 2. Look up nearby building footprints
    let buildings = [];
    try {
      buildings = await findBuildings(geo.lat, geo.lon);
    } catch (e) {
      // Overpass may be unavailable; fall through to estimate
    }

    // 3. Determine garage sqft
    let sqft = fallbackSqft;
    let source = "fallback_size";

    const garages = buildings.filter((b) => b.isGarage);
    if (garages.length) {
      // Use the largest garage footprint found
      const best = garages.reduce((a, b) => (b.areaM2 > a.areaM2 ? b : a));
      sqft = sqMetersToSqFt(best.areaM2);
      source = "osm_garage_footprint";
    } else if (buildings.length) {
      // No dedicated garage — estimate garage as a fraction of the largest building
      const largest = buildings.reduce((a, b) => (b.areaM2 > a.areaM2 ? b : a));
      const homeSqft = sqMetersToSqFt(largest.areaM2);
      // Garage is typically 18-25% of a home's footprint; cap to reasonable garage range
      const estimated = Math.round(homeSqft * 0.22);
      sqft = Math.min(Math.max(estimated, 200), 1000);
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
      garage_found: garages.length > 0
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}