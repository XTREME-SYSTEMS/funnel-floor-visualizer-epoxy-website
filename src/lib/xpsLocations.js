// XPS Xpress store locations nationwide. Coordinates marked `geocoded: true`
// are precise rooftop points (used directly for Street View aiming). Others
// are approximate city centers and are runtime-geocoded at lookup time.
export const XPS_LOCATIONS = [
  { city: "Pompano Beach", state: "FL", address: "2200 NW 32nd St, Suite 300", phone: "(954) 516-1721", lat: 26.2698215, lng: -80.1536915, hq: true, geocoded: true },
  { city: "Miami", state: "FL", address: "2830 NW 79th Ave", phone: "(786) 589-8609", lat: 25.8010141, lng: -80.3251894, geocoded: true },
  { city: "Tampa", state: "FL", address: "6302 Benjamin Rd, Suite 411", phone: "(813) 322-6259", lat: 28.0056799, lng: -82.5424735, geocoded: true },
  { city: "Orlando (Altamonte Springs)", state: "FL", address: "640 Douglas Ave, Suite 1510", phone: "(407) 305-9183", lat: 28.6725038, lng: -81.3904286, geocoded: true },
  { city: "Pensacola", state: "FL", address: "5680 Gulf Breeze Pkwy, Suite 5", phone: "(850) 940-4912", lat: 30.364512, lng: -87.167106, geocoded: true },
  { city: "Fort Myers", state: "FL", address: "10231 Metro Pkwy, Suite 105", phone: "(239) 510-8287", lat: 26.5954148, lng: -81.8502425, geocoded: true },
  { city: "Orlando (Winter Garden)", state: "FL", address: "13054 W Colonial Dr", phone: "(407) 315-1352", lat: 28.551105, lng: -81.591144, geocoded: true },
  { city: "Naples", state: "FL", address: "3888 Mannix Dr", phone: "(239) 319-6222", lat: 26.1553983, lng: -81.6768645, geocoded: true },
  { city: "Port St. Lucie", state: "FL", address: "651 NW Enterprise Dr, Suite 111", phone: "(772) 877-0828", lat: 27.3302506, lng: -80.4086204, geocoded: true },
  { city: "Jacksonville", state: "FL", address: "5151 Sunbeam Rd, Suite 1", phone: "(904) 595-9117", lat: 30.2064147, lng: -81.5810627, geocoded: true },
  { city: "Sarasota", state: "FL", address: "351-355 Interstate Blvd, Building C", phone: "(941) 239-7127", lat: 27.3334879, lng: -82.4463627, geocoded: true },
  { city: "Daytona Beach", state: "FL", address: "1901 Mason Ave, Suite 109", phone: "(386) 261-6237", lat: 29.2115286, lng: -81.0834685, geocoded: true },

  { city: "Austin", state: "TX", address: "2711 Daisy Dr, Suite 120", phone: "(737) 257-6910", lat: 30.1688309, lng: -97.8919664, geocoded: true },
  { city: "Amarillo", state: "TX", address: "3501 SW 45th Ave, Suite A", phone: "(806) 994-4407", lat: 35.162926, lng: -101.8737503, geocoded: true },
  { city: "Dallas (Allen)", state: "TX", address: "13 Prestige Cir, #120", phone: "(469) 224-1366", lat: 33.0937848, lng: -96.6728096, geocoded: true },
  { city: "Dallas (Euless)", state: "TX", address: "2803 W Euless Blvd", phone: "(430) 243-4532", lat: 32.8372144, lng: -97.0751427, geocoded: true },
  { city: "Houston", state: "TX", address: "3332 Spring Stuebner Rd, Suite B", phone: "(832) 737-1378", lat: 30.08298, lng: -95.469473, geocoded: true },
  { city: "South Houston", state: "TX", address: "5904 South Loop E", phone: "(713) 843-7188", lat: 29.6896738, lng: -95.3324926, geocoded: true },
  { city: "San Antonio", state: "TX", address: "10646 Gulfdale St, Suite 1", phone: "(210) 908-5387", lat: 29.5376718, lng: -98.4904251, geocoded: true },
  { city: "El Paso", state: "TX", address: "7206 North Loop Dr, Suite G", phone: "(915) 308-8963", lat: 31.7547367, lng: -106.3816553, geocoded: true },
  { city: "McAllen", state: "TX", address: "1401E Hackberry Ave, Suite C", phone: "(956) 395-2693", lat: 26.209257, lng: -98.21666, geocoded: true },

  { city: "Portsmouth (Tidewater)", state: "VA", address: "1823 County St.", phone: "(302) 401-7514", lat: 36.832964, lng: -76.322179, geocoded: true },
  { city: "Chantilly", state: "VA", address: "14155 Sullyfield Cir, Suite E", phone: "(703) 947-0742", lat: 38.8905747, lng: -77.4363157, geocoded: true },
  { city: "Washington, DC", state: "DC", address: "7838 Parston Dr.", phone: "(240) 512-9280", lat: 38.8470042, lng: -76.8708529, geocoded: true },

  { city: "Marcy", state: "NY", address: "9669 River Rd.", phone: "(315) 860-8129", lat: 43.1310038, lng: -75.2496655, geocoded: true },
  { city: "Westchester", state: "NY", address: "4 Edna St.", phone: "(914) 256-1400", lat: 41.2281551, lng: -73.7130869, geocoded: true },
  { city: "Long Island", state: "NY", address: "45 Ramsey Rd, Suite 19", phone: "(631) 201-5186", lat: 40.8153846, lng: -73.2116584, geocoded: true },
  { city: "Garfield", state: "NJ", address: "259 Passaic Street", phone: "(973) 381-3910", lat: 40.8695329, lng: -74.0982493, geocoded: true },

  { city: "Greater Philadelphia", state: "PA", address: "2200 Wallace Blvd, Suite D", phone: "(215) 714-3506", lat: 39.966598, lng: -75.174471, geocoded: true },
  { city: "Pottsville", state: "PA", address: "194 E Norwegian St", phone: "(570) 673-0759", lat: 40.685441, lng: -76.194534, geocoded: true },

  { city: "Charleston", state: "SC", address: "1379 Ashley River Rd, Suite 300", phone: "(843) 287-9880", lat: 32.7979044, lng: -80.0035775, geocoded: true },
  { city: "Greenville", state: "SC", address: "1200 Woodruff Rd, Suite C-10", phone: "(864) 481-8392", lat: 34.8219165, lng: -82.2896045, geocoded: true },
  { city: "Atlanta (Marietta)", state: "GA", address: "1700 Cumberland Point Dr, Suite 20", phone: "(678) 557-5989", lat: 33.9106039, lng: -84.4935827, geocoded: true },
  { city: "Savannah", state: "GA", address: "10510 Abercorn St, Suite A", phone: "(912) 574-2251", lat: 31.9853752, lng: -81.1314331, geocoded: true },
  { city: "Atlanta (Stone Mountain)", state: "GA", address: "1785 E Park Pl Blvd.", phone: "(706) 397-5351", lat: 33.822079, lng: -84.110619, geocoded: true },
  { city: "Charlotte", state: "NC", address: "920 Blairhill Rd, Suite B116", phone: "(980) 449-6138", lat: 35.1980193, lng: -80.8853386, geocoded: true },
  { city: "Raleigh", state: "NC", address: "6325 Limousine Dr.", phone: "(919) 705-0872", lat: 35.9000051, lng: -78.7592107, geocoded: true },

  { city: "Oklahoma City", state: "OK", address: "247 W Wilshire Blvd, Suite C", phone: "(405) 704-3710", lat: 35.5514697, lng: -97.5184014, geocoded: true },
  { city: "Milwaukee", state: "WI", address: "16232 W Lincoln Ave", phone: "(414) 928-8610", lat: 43.003005, lng: -88.114483, geocoded: true },
  { city: "Nashville", state: "TN", address: "475 Metroplex Dr, Suite 106", phone: "(615) 722-4498", lat: 36.0885714, lng: -86.7004457, geocoded: true },
  { city: "Chattanooga", state: "TN", address: "4295 Cromwell Rd, Suite 205", phone: "(423) 872-2672", lat: 35.0661109, lng: -85.1968985, geocoded: true },
  { city: "Louisville", state: "KY", address: "1733 Mellwood Ave", phone: "(502) 806-2599", lat: 38.2587259, lng: -85.7185366, geocoded: true },
  { city: "Cedar Rapids", state: "IA", address: "1720 Robins Rd, #500", phone: "(319) 727-8582", lat: 42.099378, lng: -91.6978, geocoded: true },
  { city: "Chicago", state: "IL", address: "33W480 E Fabyan Pkwy, Suite 102", phone: "(312) 313-7561", lat: 41.8699472, lng: -88.2716323, geocoded: true },
  { city: "Rockford", state: "IL", address: "7303 Edwards Dr.", phone: "(815) 605-6738", lat: 42.2489602, lng: -88.9772855, geocoded: true },
  { city: "Bloomfield", state: "MI", address: "1991 Orchard Lake Rd.", phone: "(248) 916-0260", lat: 42.61524, lng: -83.323964, geocoded: true },

  { city: "Denver (Englewood)", state: "CO", address: "3601 Natches Ct", phone: "(720) 753-4068", lat: 39.651483, lng: -105.00458, geocoded: true }
];

// Xtreme Polishing Systems Canada — retail/contractor locations.
// Coordinates are city-center level until exact storefront addresses are
// confirmed; refine lat/lng when street addresses are available.
export const XPS_CANADA_LOCATIONS = [
  { city: "Toronto (Markham)", state: "ON", country: "CA", address: "Markham, ON", phone: "+1 416-453-0707", lat: 43.8599076, lng: -79.3349945, geocoded: true, type: "contractor" },
  { city: "Coquitlam", state: "BC", country: "CA", address: "Coquitlam, BC", phone: "+1 778-941-3199", lat: 49.2837626, lng: -122.7932065, geocoded: true },
  { city: "Edmonton", state: "AB", country: "CA", address: "Edmonton, AB", phone: "+1 780-465-1601", lat: 53.5461663, lng: -113.4937355, geocoded: true },
  { city: "Calgary", state: "AB", country: "CA", address: "Calgary, AB", phone: "+1 587-295-3625", lat: 51.0447331, lng: -114.0718831, geocoded: true }
];

// All XPS retail stores (US + Canada) — use this for map markers and
// nearest-store lookups so the locator covers both countries.
export const ALL_XPS_LOCATIONS = [...XPS_LOCATIONS, ...XPS_CANADA_LOCATIONS];

// Haversine distance in miles between two lat/lng points.
export function distanceMiles(lat1, lng1, lat2, lng2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function nearestLocation(lat, lng) {
  let best = null;
  let bestDist = Infinity;
  for (const loc of ALL_XPS_LOCATIONS) {
    const d = distanceMiles(lat, lng, loc.lat, loc.lng);
    if (d < bestDist) {
      bestDist = d;
      best = { ...loc, distance: Math.round(d) };
    }
  }
  return best;
}