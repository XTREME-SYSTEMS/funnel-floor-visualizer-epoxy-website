// Locations for the XPS family of brands beyond the XPS Xpress retail stores
// (which live in xpsLocations.js). These cover training centers, a contractor
// service-area network, and a nationwide commercial service brand.

// Polished Concrete University — hands-on training centers.
// The main facility is in Pompano Beach; training is also hosted at select
// XPS Xpress stores, plus a Las Vegas location (address not yet published).
export const PCU_LOCATIONS = [
  {
    name: "Main Training Center",
    address: "2200 NW 32nd St, Ste 1100",
    city: "Pompano Beach",
    state: "FL",
    zip: "33069",
    phone: "(954) 228-8856",
    alt_phone: "877-958-5669",
    note: "Headquarters & primary 5-day certification facility",
    hq: true
  },
  {
    name: "Altamonte Springs",
    address: "640 Douglas Ave, Suite 1510",
    city: "Altamonte Springs",
    state: "FL",
    phone: "(407) 305-9183",
    note: "Training hosted at XPS Xpress store"
  },
  {
    name: "Dallas (Euless)",
    address: "2803 W Euless Blvd",
    city: "Euless",
    state: "TX",
    phone: "(430) 243-4532",
    note: "Training hosted at XPS Xpress store"
  },
  {
    name: "Oklahoma City",
    address: "247 W Wilshire Blvd, Suite C",
    city: "Oklahoma City",
    state: "OK",
    phone: "(405) 704-3710",
    note: "Training hosted at XPS Xpress store"
  },
  {
    name: "Milwaukee",
    address: "16232 W Lincoln Ave",
    city: "Milwaukee",
    state: "WI",
    phone: "(414) 928-8610",
    note: "Training hosted at XPS Xpress store"
  },
  {
    name: "Cedar Rapids",
    address: "1720 Robins Rd, #500",
    city: "Cedar Rapids",
    state: "IA",
    phone: "(319) 727-8582",
    note: "Training hosted at XPS Xpress store"
  },
  {
    name: "Las Vegas",
    address: "Address to be confirmed",
    city: "Las Vegas",
    state: "NV",
    phone: "877-958-5669",
    note: "New training location — call to register"
  }
];

// National Concrete Polishing — the contractor / installation arm.
// HQ in Pompano Beach; the entries below are service-area cities (places they
// serve), not physical storefronts.
export const NCP_INFO = {
  name: "National Concrete Polishing",
  hq_address: "2200 NW 32nd St, Ste 600, Pompano Beach, FL 33069",
  phone: "(844) 876-5474",
  alt_phone: "866-950-7522",
  website: "https://nationalconcretepolishing.net"
};

export const NCP_SERVICE_AREAS = [
  { city: "Fort Lauderdale", state: "FL" },
  { city: "Mount Pocono", state: "PA" },
  { city: "Washington", state: "DC" },
  { city: "Boston", state: "MA" },
  { city: "Chattanooga", state: "TN" },
  { city: "Cedar Rapids", state: "IA" },
  { city: "Alberta", state: "MN" },
  { city: "Fort Wayne", state: "IN" },
  { city: "Saint Paul", state: "MN" },
  { city: "Port St. Lucie", state: "FL" },
  { city: "Fort Myers", state: "FL" },
  { city: "Miami", state: "FL" },
  { city: "Pompano Beach", state: "FL" },
  { city: "Trenton", state: "NJ" },
  { city: "Baltimore", state: "MD" },
  { city: "Austin", state: "TX" },
  { city: "San Diego", state: "CA" },
  { city: "Tucson", state: "AZ" },
  { city: "Orlando", state: "FL" },
  { city: "Phoenix", state: "AZ" },
  { city: "Oklahoma City", state: "OK" },
  { city: "Chicago", state: "IL" },
  { city: "Hartford", state: "CT" },
  { city: "Saint George", state: "UT" },
  { city: "Los Angeles", state: "CA" },
  { city: "Las Vegas", state: "NV" },
  { city: "Pensacola", state: "FL" },
  { city: "Columbus", state: "OH" },
  { city: "Jacksonville", state: "FL" },
  { city: "Tampa", state: "FL" },
  { city: "Denver", state: "CO" },
  { city: "San Jose", state: "CA" },
  { city: "Charlotte", state: "NC" },
  { city: "Houston", state: "TX" },
  { city: "New York City", state: "NY" }
];

// National Epoxy Pros — nationwide commercial / industrial epoxy flooring.
// A bid-and-install service brand with no physical storefronts.
export const NEP_INFO = {
  name: "National Epoxy Pros",
  tagline: "Commercial & Industrial Floor Systems",
  description:
    "Industrial-grade epoxy and polished concrete for facilities that cannot afford downtime. National Epoxy Pros provides full specification packages, competitive bids, and certified installation across 47 states — with no physical storefronts, every project starts with a request for bid.",
  stats: [
    { value: "2,400+", label: "Commercial projects" },
    { value: "47", label: "States served" },
    { value: "15", label: "Years in industry" },
    { value: "98%", label: "Client retention" }
  ],
  website: "https://nationalepoxypros.com"
};