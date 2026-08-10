// XPS Xpress store locations nationwide. Coordinates are approximate city
// centers — accurate enough for "nearest location" distance math.
export const XPS_LOCATIONS = [
  { city: "Pompano Beach", state: "FL", address: "2200 NW 32nd St, Suite 300", phone: "(954) 516-1721", lat: 26.236, lng: -80.137, hq: true },
  { city: "Miami", state: "FL", address: "2830 NW 79th Ave", phone: "(786) 589-8609", lat: 25.838, lng: -80.322 },
  { city: "Tampa", state: "FL", address: "6302 Benjamin Rd, Suite 411", phone: "(813) 322-6259", lat: 27.996, lng: -82.515 },
  { city: "Orlando (Altamonte Springs)", state: "FL", address: "640 Douglas Ave, Suite 1510", phone: "(407) 305-9183", lat: 28.661, lng: -81.365 },
  { city: "Pensacola", state: "FL", address: "5680 Gulf Breeze Pkwy, Suite 5", phone: "(850) 940-4912", lat: 30.385, lng: -87.218 },
  { city: "Fort Myers", state: "FL", address: "10231 Metro Pkwy, Suite 105", phone: "(239) 510-8287", lat: 26.540, lng: -81.870 },
  { city: "Orlando (Winter Garden)", state: "FL", address: "13054 W Colonial Dr", phone: "(407) 315-1352", lat: 28.461, lng: -81.450 },
  { city: "Naples", state: "FL", address: "3888 Mannix Dr", phone: "(239) 319-6222", lat: 26.143, lng: -81.795 },
  { city: "Port St. Lucie", state: "FL", address: "651 NW Enterprise Dr, Suite 111", phone: "(772) 877-0828", lat: 27.319, lng: -80.404 },
  { city: "Jacksonville", state: "FL", address: "5151 Sunbeam Rd, Suite 1", phone: "(904) 595-9117", lat: 30.247, lng: -81.598 },
  { city: "Sarasota", state: "FL", address: "351-355 Interstate Blvd, Building C", phone: "(941) 239-7127", lat: 27.359, lng: -82.516 },
  { city: "Daytona Beach", state: "FL", address: "1901 Mason Ave, Suite 109", phone: "(386) 261-6237", lat: 29.210, lng: -81.078 },

  { city: "Austin", state: "TX", address: "2711 Daisy Dr, Suite 120", phone: "(737) 257-6910", lat: 30.247, lng: -97.768 },
  { city: "Amarillo", state: "TX", address: "3501 SW 45th Ave, Suite A", phone: "(806) 994-4407", lat: 35.202, lng: -101.836 },
  { city: "Dallas (Allen)", state: "TX", address: "13 Prestige Cir, #120", phone: "(469) 224-1366", lat: 33.103, lng: -96.671 },
  { city: "Dallas (Euless)", state: "TX", address: "2803 W Euless Blvd", phone: "(430) 243-4532", lat: 32.848, lng: -97.082 },
  { city: "Houston", state: "TX", address: "3332 Spring Stuebner Rd, Suite B", phone: "(832) 737-1378", lat: 30.085, lng: -95.418 },
  { city: "South Houston", state: "TX", address: "5904 South Loop E", phone: "(713) 843-7188", lat: 29.688, lng: -95.278 },
  { city: "San Antonio", state: "TX", address: "10646 Gulfdale St, Suite 1", phone: "(210) 908-5387", lat: 29.389, lng: -98.459 },
  { city: "El Paso", state: "TX", address: "7206 North Loop Dr, Suite G", phone: "(915) 308-8963", lat: 31.812, lng: -106.427 },
  { city: "McAllen", state: "TX", address: "1401E Hackberry Ave, Suite C", phone: "(956) 395-2693", lat: 26.218, lng: -98.236 },

  { city: "Portsmouth (Tidewater)", state: "VA", address: "1823 County St.", phone: "(302) 401-7514", lat: 36.836, lng: -76.362 },
  { city: "Chantilly", state: "VA", address: "14155 Sullyfield Cir, Suite E", phone: "(703) 947-0742", lat: 38.894, lng: -77.431 },
  { city: "Washington, DC", state: "DC", address: "7838 Parston Dr.", phone: "(240) 512-9280", lat: 38.960, lng: -76.890 },

  { city: "Marcy", state: "NY", address: "9669 River Rd.", phone: "(315) 860-8129", lat: 43.153, lng: -75.233 },
  { city: "Westchester", state: "NY", address: "4 Edna St.", phone: "(914) 256-1400", lat: 41.034, lng: -73.762 },
  { city: "Long Island", state: "NY", address: "45 Ramsey Rd, Suite 19", phone: "(631) 201-5186", lat: 40.768, lng: -73.409 },
  { city: "Garfield", state: "NJ", address: "259 Passaic Street", phone: "(973) 381-3910", lat: 40.882, lng: -74.113 },

  { city: "Greater Philadelphia", state: "PA", address: "2200 Wallace Blvd, Suite D", phone: "(215) 714-3506", lat: 40.037, lng: -75.163 },
  { city: "Pottsville", state: "PA", address: "194 E Norwegian St", phone: "(570) 673-0759", lat: 40.685, lng: -76.195 },

  { city: "Charleston", state: "SC", address: "1379 Ashley River Rd, Suite 300", phone: "(843) 287-9880", lat: 32.787, lng: -79.974 },
  { city: "Greenville", state: "SC", address: "1200 Woodruff Rd, Suite C-10", phone: "(864) 481-8392", lat: 34.841, lng: -82.256 },
  { city: "Atlanta (Marietta)", state: "GA", address: "1700 Cumberland Point Dr, Suite 20", phone: "(678) 557-5989", lat: 33.889, lng: -84.478 },
  { city: "Savannah", state: "GA", address: "10510 Abercorn St, Suite A", phone: "(912) 574-2251", lat: 32.017, lng: -81.133 },
  { city: "Atlanta (Stone Mountain)", state: "GA", address: "1785 E Park Pl Blvd.", phone: "(706) 397-5351", lat: 33.811, lng: -84.183 },
  { city: "Charlotte", state: "NC", address: "920 Blairhill Rd, Suite B116", phone: "(980) 449-6138", lat: 35.168, lng: -80.770 },
  { city: "Raleigh", state: "NC", address: "6325 Limousine Dr.", phone: "(919) 705-0872", lat: 35.790, lng: -78.659 },

  { city: "Oklahoma City", state: "OK", address: "247 W Wilshire Blvd, Suite C", phone: "(405) 704-3710", lat: 35.489, lng: -97.534 },
  { city: "Milwaukee", state: "WI", address: "16232 W Lincoln Ave", phone: "(414) 928-8610", lat: 42.962, lng: -88.043 },
  { city: "Nashville", state: "TN", address: "475 Metroplex Dr, Suite 106", phone: "(615) 722-4498", lat: 36.246, lng: -86.737 },
  { city: "Chattanooga", state: "TN", address: "4295 Cromwell Rd, Suite 205", phone: "(423) 872-2672", lat: 35.046, lng: -85.200 },
  { city: "Cedar Rapids", state: "IA", address: "1720 Robins Rd, #500", phone: "(319) 727-8582", lat: 42.071, lng: -91.665 },
  { city: "Chicago", state: "IL", address: "33W480 E Fabyan Pkwy, Suite 102", phone: "(312) 313-7561", lat: 41.839, lng: -88.243 },
  { city: "Rockford", state: "IL", address: "7303 Edwards Dr.", phone: "(815) 605-6738", lat: 42.301, lng: -89.002 },
  { city: "Bloomfield", state: "MI", address: "1991 Orchard Lake Rd.", phone: "(248) 916-0260", lat: 42.611, lng: -83.338 },

  { city: "Denver (Englewood)", state: "CO", address: "3601 Natches Ct", phone: "(720) 753-4068", lat: 39.640, lng: -104.987 }
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
  for (const loc of XPS_LOCATIONS) {
    const d = distanceMiles(lat, lng, loc.lat, loc.lng);
    if (d < bestDist) {
      bestDist = d;
      best = { ...loc, distance: Math.round(d) };
    }
  }
  return best;
}