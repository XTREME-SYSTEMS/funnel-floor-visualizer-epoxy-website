export const DEFAULT_SETTINGS = {
  company_name: "EpoxyGarageFloorEstimate.com",
  public_business_name: "EpoxyGarageFloorEstimate.com",
  legal_business_name: "",
  phone: "(754) 555-0142",
  email: "hello@epoxygaragefloorestimate.com",
  service_area: "Pompano Beach, FL and surrounding South Florida communities",
  primary_city: "Pompano Beach",
  primary_state: "FL",
  is_test_pricing: true,
  size_defaults: { one_car: 240, two_car: 440, three_car: 660, four_car: 880, not_sure: 440 },
  systems: [
    { key: "flake", name: "Decorative Flake Floor", description: "Classic residential garage coating with a decorative flake blend. Popular, durable, and budget-friendly.", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", price_per_sqft: 7 },
    { key: "premium_flake", name: "Premium Flake Floor", description: "Higher-end decorative flake system with a fuller, more uniform finish and expanded color options.", image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", price_per_sqft: 9 },
    { key: "solid", name: "Solid Color Floor", description: "Clean, uniform single-color finish. A sleek, modern look.", image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", price_per_sqft: 6 },
    { key: "metallic", name: "Metallic Floor", description: "Premium decorative system with a flowing, reflective metallic appearance.", image_url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800", price_per_sqft: 12 },
    { key: "not_sure", name: "Help Me Choose", description: "Not sure which finish is right? We'll help you decide based on your garage and budget.", image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", price_per_sqft: 8 }
  ],
  condition_adjustments: [
    { key: "good", label: "Clean / bare concrete", percent: 0 },
    { key: "minor", label: "Minor cracks or stains", percent: 5 },
    { key: "several", label: "Several cracks or repairs needed", percent: 12 },
    { key: "paint", label: "Painted concrete", percent: 10 },
    { key: "epoxy", label: "Existing coating needs removal", percent: 18 },
    { key: "major", label: "Major damage / not sure", percent: 20 }
  ],
  minimum_project_price: 1800,
  range_low_percent: 12,
  range_high_percent: 15,
  packages: [
    { tier: "GOOD", name: "Professional Garage Floor", description: "Our core garage floor package with a clean, durable finished look.", multiplier: 0.85 },
    { tier: "BETTER", name: "Premium Garage Floor", description: "Upgraded finish detail and expanded color and flake selection.", multiplier: 1 },
    { tier: "BEST", name: "Designer Garage Floor", description: "Our highest-detail decorative package with custom design input.", multiplier: 1.25 }
  ],
  lead_scoring: {
    timeline: { "AS SOON AS POSSIBLE": 30, "WITHIN 30 DAYS": 22, "1–3 MONTHS": 12, "3–6 MONTHS": 6, "JUST RESEARCHING": 3 },
    garage_size: { one_car: 5, two_car: 12, three_car: 18, four_car: 22, custom: 15, not_sure: 8 },
    has_full_address: 10,
    has_photos: 10,
    consultation_booked: 20,
    call_clicked: 15
  },
  salesperson: {
    name: "Marcus Delaney",
    title: "Senior Floor Specialist",
    bio: "Marcus has helped hundreds of South Florida homeowners choose the right garage floor finish for their space, budget, and timeline.",
    phone: "(754) 555-0142",
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
  },
  google_rating: 4.9,
  google_review_count: 214,
  testimonials: [
    { name: "Dana R.", location: "Pompano Beach, FL", quote: "The estimate was close to the final number and the crew finished in a weekend.", rating: 5 },
    { name: "Peter M.", location: "Coral Springs, FL", quote: "Easiest home project we've done. The garage finally looks finished.", rating: 5 },
    { name: "Alicia B.", location: "Deerfield Beach, FL", quote: "Loved that I got a price range before anyone called me.", rating: 5 }
  ],
  gallery: [
    { before_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800", after_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "2-car garage, premium flake — Pompano Beach" },
    { before_url: "https://images.unsplash.com/photo-1520697222862-c5b2c1e6b0a1?w=800", after_url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800", caption: "3-car garage, metallic finish — Coral Springs" },
    { before_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", after_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", caption: "1-car garage, solid color — Deerfield Beach" }
  ],
  calendar_url: "",
  disclaimer: "This is a preliminary project estimate — not a contract, proposal, or guaranteed final price. Final pricing may change based on actual square footage, concrete condition, moisture, cracks, repairs, existing coatings, preparation requirements, access, selected system, and other site-specific conditions confirmed during an in-home inspection.",
  consent_language: "By submitting this form you agree to be contacted by phone, text, and email about your garage floor estimate. Message and data rates may apply. You can opt out at any time.",
  hero_image_url: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/bd60851ce_image.png",
  seo: {
    site_name: "EpoxyGarageFloorEstimate.com",
    default_title: "Epoxy Garage Floor Cost & Instant Estimate | Pompano Beach FL",
    default_description: "Get an instant epoxy garage floor cost estimate in about 60 seconds. Serving Pompano Beach and South Florida. Free, no obligation, personalized price range.",
    business_hours: "Mon–Sat 7:00am–7:00pm",
    business_category: "Garage Floor Coating Contractor",
    gbp_url: "",
    review_url: "",
    social_profiles: []
  }
};

export const SIZE_OPTIONS = [
  { key: "one_car", label: "1-Car Garage" },
  { key: "two_car", label: "2-Car Garage" },
  { key: "three_car", label: "3-Car Garage" },
  { key: "four_car", label: "4+ Car Garage" },
  { key: "custom", label: "Custom Size" },
  { key: "not_sure", label: "I'm Not Sure" }
];

export const TIMELINE_OPTIONS = [
  "AS SOON AS POSSIBLE",
  "WITHIN 30 DAYS",
  "1–3 MONTHS",
  "3–6 MONTHS",
  "JUST RESEARCHING"
];