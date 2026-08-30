// XPS Xpress store locations — US, Canada, and International.
// Coordinates marked `geocoded: true` are precise rooftop points.
// Others are approximate city centers, runtime-geocoded at lookup time.

// ── Region mapping (state → region label) ──────────────────────────────────
export const REGION_MAP = {
  FL: "Florida", TX: "Texas",
  VA: "North East", DC: "North East", NY: "North East", NJ: "North East", PA: "North East",
  SC: "South East", GA: "South East", NC: "South East",
  OK: "Central", WI: "Central", TN: "Central", KY: "Central", IA: "Central",
  IL: "Central", MI: "Central", IN: "Central", OH: "Central",
  NM: "West", NV: "West", UT: "West", CA: "West", AZ: "West", CO: "West",
  ON: "Canada", AB: "Canada", BC: "Canada",
};

export function getRegion(state) {
  return REGION_MAP[state] || "Other";
}

// ── US locations ────────────────────────────────────────────────────────────
export const XPS_LOCATIONS = [
  // Florida
  { city: "Pompano Beach", state: "FL", address: "2200 NW 32nd St, Suite 300", phone: "(954) 516-1721", lat: 26.2698215, lng: -80.1536915, hq: true, geocoded: true, training: true },
  { city: "Miami", state: "FL", address: "2830 NW 79th Ave", phone: "(786) 589-8609", lat: 25.8010141, lng: -80.3251894, geocoded: true },
  { city: "Tampa", state: "FL", address: "6302 Benjamin Rd, Suite 411", phone: "(813) 322-6259", lat: 28.0056799, lng: -82.5424735, geocoded: true },
  { city: "Orlando (Altamonte Springs)", state: "FL", address: "640 Douglas Ave, Suite 1510", phone: "(407) 305-9183", lat: 28.6725038, lng: -81.3904286, geocoded: true, training: true },
  { city: "Pensacola", state: "FL", address: "5680 Gulf Breeze Pkwy, Suite 5", phone: "(850) 940-4912", lat: 30.364512, lng: -87.167106, geocoded: true },
  { city: "Fort Myers", state: "FL", address: "10231 Metro Pkwy, Suite 105", phone: "(239) 510-8287", lat: 26.5954148, lng: -81.8502425, geocoded: true },
  { city: "Orlando (Winter Garden)", state: "FL", address: "13054 W Colonial Dr", phone: "(407) 315-1352", lat: 28.551105, lng: -81.591144, geocoded: true },
  { city: "Naples", state: "FL", address: "3888 Mannix Dr", phone: "(239) 319-6222", lat: 26.1553983, lng: -81.6768645, geocoded: true },
  { city: "Port St. Lucie", state: "FL", address: "651 NW Enterprise Dr, Suite 111", phone: "(772) 877-0828", lat: 27.3302506, lng: -80.4086204, geocoded: true },
  { city: "Jacksonville", state: "FL", address: "5151 Sunbeam Rd, Suite 1", phone: "(904) 595-9117", lat: 30.2064147, lng: -81.5810627, geocoded: true },
  { city: "Sarasota", state: "FL", address: "351-355 Interstate Blvd, Building C", phone: "(941) 239-7127", lat: 27.3334879, lng: -82.4463627, geocoded: true },
  { city: "Daytona Beach", state: "FL", address: "1901 Mason Ave, Suite 109", phone: "(386) 261-6237", lat: 29.2115286, lng: -81.0834685, geocoded: true },

  // Texas
  { city: "Austin", state: "TX", address: "2711 Daisy Dr, Suite 120", phone: "(737) 257-6910", lat: 30.1688309, lng: -97.8919664, geocoded: true },
  { city: "Amarillo", state: "TX", address: "3501 SW 45th Ave, Suite A", phone: "(806) 994-4407", lat: 35.162926, lng: -101.8737503, geocoded: true },
  { city: "Dallas (Allen)", state: "TX", address: "13 Prestige Cir, #120", phone: "(469) 224-1366", lat: 33.0937848, lng: -96.6728096, geocoded: true },
  { city: "Dallas (Euless)", state: "TX", address: "2803 W Euless Blvd", phone: "(430) 243-4532", lat: 32.8372144, lng: -97.0751427, geocoded: true, training: true },
  { city: "Houston", state: "TX", address: "3332 Spring Stuebner Rd, Suite B", phone: "(832) 737-1378", lat: 30.08298, lng: -95.469473, geocoded: true },
  { city: "South Houston", state: "TX", address: "5904 South Loop E", phone: "(713) 843-7188", lat: 29.6896738, lng: -95.3324926, geocoded: true },
  { city: "San Antonio", state: "TX", address: "10646 Gulfdale St, Suite 1", phone: "(210) 908-5387", lat: 29.5376718, lng: -98.4904251, geocoded: true },
  { city: "El Paso", state: "TX", address: "7206 North Loop Dr, Suite G", phone: "(915) 308-8963", lat: 31.7547367, lng: -106.3816553, geocoded: true },
  { city: "McAllen", state: "TX", address: "1401E Hackberry Ave, Suite C", phone: "(956) 395-2693", lat: 26.209257, lng: -98.21666, geocoded: true, status: "coming_soon" },
  { city: "Lubbock", state: "TX", address: "Coming Soon", phone: "(806) 230-4162", lat: 33.577, lng: -101.855, geocoded: false, status: "coming_soon" },

  // North East
  { city: "Portsmouth (Tidewater)", state: "VA", address: "1823 County St.", phone: "(302) 401-7514", lat: 36.832964, lng: -76.322179, geocoded: true },
  { city: "Chantilly", state: "VA", address: "14155 Sullyfield Cir, Suite E", phone: "(703) 947-0742", lat: 38.8905747, lng: -77.4363157, geocoded: true },
  { city: "Washington", state: "DC", address: "7838 Parston Dr.", phone: "(240) 512-9280", lat: 38.8470042, lng: -76.8708529, geocoded: true },
  { city: "Marcy", state: "NY", address: "9669 River Rd.", phone: "(315) 860-8129", lat: 43.1310038, lng: -75.2496655, geocoded: true },
  { city: "Westchester", state: "NY", address: "4 Edna St.", phone: "(914) 256-1400", lat: 41.2281551, lng: -73.7130869, geocoded: true },
  { city: "Long Island", state: "NY", address: "45 Ramsey Rd, Suite 19", phone: "(631) 201-5186", lat: 40.8153846, lng: -73.2116584, geocoded: true },
  { city: "Garfield", state: "NJ", address: "259 Passaic Street", phone: "(973) 381-3910", lat: 40.8695329, lng: -74.0982493, geocoded: true },
  { city: "Greater Philadelphia", state: "PA", address: "2200 Wallace Blvd, Suite D", phone: "(215) 714-3506", lat: 39.966598, lng: -75.174471, geocoded: true },
  { city: "Pottsville", state: "PA", address: "194 E Norwegian St", phone: "(570) 673-0759", lat: 40.685441, lng: -76.194534, geocoded: true },

  // South East
  { city: "Charleston", state: "SC", address: "1379 Ashley River Rd, Suite 300", phone: "(843) 287-9880", lat: 32.7979044, lng: -80.0035775, geocoded: true },
  { city: "Greenville", state: "SC", address: "1200 Woodruff Rd, Suite C-10", phone: "(864) 481-8392", lat: 34.8219165, lng: -82.2896045, geocoded: true },
  { city: "Atlanta (Marietta)", state: "GA", address: "1700 Cumberland Point Dr, Suite 20", phone: "(678) 557-5989", lat: 33.9106039, lng: -84.4935827, geocoded: true },
  { city: "Savannah", state: "GA", address: "10510 Abercorn St, Suite A", phone: "(912) 574-2251", lat: 31.9853752, lng: -81.1314331, geocoded: true },
  { city: "Atlanta (Stone Mountain)", state: "GA", address: "1785 E Park Pl Blvd.", phone: "(706) 397-5351", lat: 33.822079, lng: -84.110619, geocoded: true },
  { city: "Charlotte", state: "NC", address: "920 Blairhill Rd, Suite B116", phone: "(980) 449-6138", lat: 35.1980193, lng: -80.8853386, geocoded: true },
  { city: "Raleigh", state: "NC", address: "6325 Limousine Dr.", phone: "(919) 705-0872", lat: 35.9000051, lng: -78.7592107, geocoded: true },

  // Central
  { city: "Oklahoma City", state: "OK", address: "247 W Wilshire Blvd, Suite C", phone: "(405) 704-3710", lat: 35.5514697, lng: -97.5184014, geocoded: true, training: true },
  { city: "Milwaukee", state: "WI", address: "16232 W Lincoln Ave", phone: "(414) 928-8610", lat: 43.003005, lng: -88.114483, geocoded: true, training: true },
  { city: "Nashville", state: "TN", address: "475 Metroplex Dr, Suite 106", phone: "(615) 722-4498", lat: 36.0885714, lng: -86.7004457, geocoded: true },
  { city: "Chattanooga", state: "TN", address: "4295 Cromwell Rd, Suite 205", phone: "(423) 872-2672", lat: 35.0661109, lng: -85.1968985, geocoded: true },
  { city: "Louisville", state: "KY", address: "1733 Mellwood Ave", phone: "(502) 806-2599", lat: 38.2587259, lng: -85.7185366, geocoded: true },
  { city: "Cedar Rapids", state: "IA", address: "1720 Robins Rd, #500", phone: "(319) 727-8582", lat: 42.099378, lng: -91.6978, geocoded: true, training: true },
  { city: "Chicago", state: "IL", address: "33W480 E Fabyan Pkwy, Suite 102", phone: "(312) 313-7561", lat: 41.8699472, lng: -88.2716323, geocoded: true },
  { city: "Rockford", state: "IL", address: "7303 Edwards Dr.", phone: "(815) 605-6738", lat: 42.2489602, lng: -88.9772855, geocoded: true },
  { city: "Bloomfield", state: "MI", address: "1991 Orchard Lake Rd.", phone: "(248) 916-0260", lat: 42.61524, lng: -83.323964, geocoded: true },
  { city: "Fort Wayne", state: "IN", address: "395 W Washington Center Rd", phone: "(260) 377-3139", lat: 41.108, lng: -85.140, geocoded: false },
  { city: "Columbus", state: "OH", address: "620 Taylor Station Rd, Suite K", phone: "(614) 665-5282", lat: 39.962, lng: -82.866, geocoded: false },

  // West
  { city: "Albuquerque", state: "NM", address: "4227 Montgomery Blvd NE", phone: "(505) 600-6193", lat: 35.081, lng: -106.649, geocoded: false },
  { city: "Las Vegas", state: "NV", address: "2901 S Highland Dr, Suite 14B", phone: "(702) 766-7523", lat: 36.158, lng: -115.152, geocoded: false, training: true },
  { city: "Saint George", state: "UT", address: "155 N 400 W, Suite C", phone: "(435) 990-3409", lat: 37.110, lng: -113.584, geocoded: false },
  { city: "Salt Lake City", state: "UT", address: "76 West 13775 S, Suite 1", phone: "(385) 853-5573", lat: 40.576, lng: -111.939, geocoded: false },
  { city: "Los Angeles (Commerce)", state: "CA", address: "2201 Yates Ave", phone: "(323) 990-7366", lat: 34.001, lng: -118.396, geocoded: false, label: "XPS West", training: true },
  { city: "Santa Fe Springs", state: "CA", address: "15421 Carmenita Rd, Suite M", phone: "(213) 513-7901", lat: 33.912, lng: -118.083, geocoded: false },
  { city: "San Diego", state: "CA", address: "10969 San Diego Mission Rd", phone: "(858) 602-1741", lat: 32.722, lng: -117.160, geocoded: false },
  { city: "Tempe", state: "AZ", address: "2430 W 12th St, Suite 2", phone: "(520) 462-1103", lat: 33.425, lng: -111.948, geocoded: false },
  { city: "Denver (Englewood)", state: "CO", address: "3601 Natches Ct", phone: "(720) 753-4068", lat: 39.651483, lng: -105.00458, geocoded: true },
];

// ── Canada locations ─────────────────────────────────────────────────────────
export const XPS_CANADA_LOCATIONS = [
  { city: "Toronto", state: "ON", country: "CA", address: "90 Nolan Ct, Suite 36", phone: "(289) 276-8421", lat: 43.8599076, lng: -79.3349945, geocoded: true, training: true },
  { city: "Calgary", state: "AB", country: "CA", address: "777-64th Ave SE, Suite 27", phone: "(587) 600-8962", lat: 50.981, lng: -114.062, geocoded: false, training: true },
  { city: "Edmonton", state: "AB", country: "CA", address: "3269 Parsons Rd NW", phone: "(780) 800-7539", lat: 53.472, lng: -113.378, geocoded: false },
  { city: "Vancouver", state: "BC", country: "CA", address: "91 Golden Dr, Suite 22", phone: "(604) 670-0632", lat: 49.175, lng: -122.952, geocoded: false, training: true },
];

// ── International locations ──────────────────────────────────────────────────
export const XPS_INTERNATIONAL_LOCATIONS = [
  { city: "Kendal", state: "UK", country: "GB", address: "Unit 22 Castle Mills, Aynam Road, Kendal LA9 5RR", phone: "+44 15394 68679", lat: 54.327, lng: -2.748, geocoded: false },
  { city: "Kampala", state: "UG", country: "UG", address: "7th Street Industrial Area", phone: "", lat: 0.347, lng: 32.582, geocoded: false },
  { city: "Edinburgh", state: "EU", country: "GB", address: "51C Ferniehill Rd, Edinburgh EH17 7BL", phone: "", lat: 55.907, lng: -3.132, geocoded: false, label: "Scotland" },
  { city: "Kingston", state: "JM", country: "JM", address: "Coming Soon", phone: "", lat: 17.971, lng: -76.793, geocoded: false, status: "coming_soon" },
  { city: "Sydney", state: "AU", country: "AU", address: "Unit 112, 2 The Crescent", phone: "+61 0451 799 977", lat: -33.868, lng: 151.205, geocoded: false },
];

// ── Coming Soon — expansion cities (new business opportunities) ──────────────
export const XPS_COMING_SOON_LOCATIONS = [
  { city: "Syracuse", state: "NY" },
  { city: "Buffalo", state: "NY" },
  { city: "Boston", state: "MA" },
  { city: "Pittsburgh", state: "PA" },
  { city: "Reading", state: "PA" },
  { city: "Cleveland", state: "OH" },
  { city: "Baltimore", state: "MD" },
  { city: "Richmond", state: "VA" },
  { city: "Fayetteville", state: "NC" },
  { city: "Wilmington", state: "NC" },
  { city: "Greensboro", state: "NC" },
  { city: "Columbia", state: "SC" },
  { city: "Macon", state: "GA" },
  { city: "Allentown", state: "PA" },
  { city: "Wilkes-Barre", state: "PA" },
  { city: "Gainesville", state: "FL" },
  { city: "Mobile", state: "AL" },
  { city: "Huntsville", state: "AL" },
  { city: "Birmingham", state: "AL" },
  { city: "Cincinnati", state: "OH" },
  { city: "Memphis", state: "TN" },
  { city: "Lexington", state: "KY" },
  { city: "St. Louis", state: "MO" },
  { city: "Indianapolis", state: "IN" },
  { city: "Akron", state: "OH" },
  { city: "Madison", state: "WI" },
  { city: "St. Paul", state: "MN" },
  { city: "Minneapolis", state: "MN" },
  { city: "Omaha", state: "NE" },
  { city: "Wichita", state: "KS" },
  { city: "Corpus Christi", state: "TX" },
  { city: "Tulsa", state: "OK" },
  { city: "Fort Collins", state: "CO" },
  { city: "Seattle", state: "WA" },
  { city: "Vancouver", state: "WA" },
  { city: "Portland", state: "OR" },
  { city: "San Jose", state: "CA" },
  { city: "Fresno", state: "CA" },
  { city: "Bakersfield", state: "CA" },
  { city: "Tucson", state: "AZ" },
];

// All XPS retail stores (US + Canada) — for map markers and nearest-store lookups.
export const ALL_XPS_LOCATIONS = [...XPS_LOCATIONS, ...XPS_CANADA_LOCATIONS];

// Every location worldwide (for footer display and full schema).
export const ALL_WORLDWIDE_LOCATIONS = [
  ...XPS_LOCATIONS,
  ...XPS_CANADA_LOCATIONS,
  ...XPS_INTERNATIONAL_LOCATIONS,
];

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
    if (loc.status === "coming_soon") continue;
    const d = distanceMiles(lat, lng, loc.lat, loc.lng);
    if (d < bestDist) {
      bestDist = d;
      best = { ...loc, distance: Math.round(d) };
    }
  }
  return best;
}