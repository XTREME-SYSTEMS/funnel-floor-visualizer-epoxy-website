export const DEFAULT_SETTINGS = {
  company_name: "Ironvale Garage Floors",
  phone: "(555) 018-4420",
  email: "hello@ironvalefloors.test",
  service_area: "Greater metro area and surrounding suburbs",
  is_test_pricing: true,
  size_defaults: { one_car: 240, two_car: 400, three_car: 600, four_car: 840, not_sure: 400 },
  systems: [
    { key: "flake", name: "Decorative Flake Floor", description: "Classic residential garage coating with a decorative flake blend.", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", price_per_sqft: 7 },
    { key: "premium_flake", name: "Premium Flake Floor", description: "Higher-end decorative flake system with a fuller finish.", image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", price_per_sqft: 9 },
    { key: "metallic", name: "Metallic Floor", description: "Decorative premium appearance with a flowing metallic look.", image_url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800", price_per_sqft: 12 },
    { key: "solid", name: "Solid Color Floor", description: "Clean commercial-style single-color appearance.", image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", price_per_sqft: 6 },
    { key: "not_sure", name: "I'm Not Sure", description: "Help me choose the right floor for my garage.", image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", price_per_sqft: 8 }
  ],
  condition_adjustments: [
    { key: "good", label: "Good / mostly clean concrete", percent: 0 },
    { key: "minor", label: "Minor cracks or stains", percent: 5 },
    { key: "several", label: "Several cracks / repairs needed", percent: 12 },
    { key: "paint", label: "Existing paint or coating", percent: 10 },
    { key: "epoxy", label: "Existing epoxy/coating needs removal", percent: 18 },
    { key: "major", label: "Major damage / I'm not sure", percent: 20 }
  ],
  minimum_project_price: 1800,
  range_low_percent: 12,
  range_high_percent: 15,
  packages: [
    { tier: "GOOD", name: "Professional Garage Floor", description: "Our core garage floor package with a clean, durable finished look.", multiplier: 0.85 },
    { tier: "BETTER", name: "Premium Garage Floor", description: "Upgraded finish detail and expanded color and flake selection.", multiplier: 1 },
    { tier: "BEST", name: "Designer Garage Floor", description: "Our highest-detail decorative package with custom design input.", multiplier: 1.25 }
  ],
  salesperson: {
    name: "Marcus Delaney",
    title: "Senior Floor Specialist",
    bio: "Marcus has helped hundreds of homeowners choose the right garage floor finish for their space, budget and timeline.",
    phone: "(555) 018-4420",
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
  },
  google_rating: 4.9,
  google_review_count: 214,
  testimonials: [
    { name: "Dana R.", location: "Oak Ridge", quote: "The estimate was close to the final number and the crew finished in a weekend.", rating: 5 },
    { name: "Peter M.", location: "Lakeview", quote: "Easiest home project we've done. The garage finally looks finished.", rating: 5 },
    { name: "Alicia B.", location: "Fairfield", quote: "Loved that I got a price range before anyone called me.", rating: 5 }
  ],
  gallery: [
    { before_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800", after_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "2-car garage, premium flake" },
    { before_url: "https://images.unsplash.com/photo-1520697222862-c5b2c1e6b0a1?w=800", after_url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800", caption: "3-car garage, metallic finish" },
    { before_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", after_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", caption: "1-car garage, solid color" }
  ],
  calendar_url: "",
  disclaimer: "This is a preliminary estimate and not a contract, proposal, or guaranteed final price. Final pricing may change based on actual square footage, concrete condition, moisture, cracks, repairs, existing coatings, preparation requirements, access, selected system, and other site-specific conditions.",
  consent_language: "By submitting this form you agree to be contacted by phone, text and email about your garage floor estimate. Message and data rates may apply.",
  hero_image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
};

export const SIZE_OPTIONS = [
  { key: "one_car", label: "1-Car Garage" },
  { key: "two_car", label: "2-Car Garage" },
  { key: "three_car", label: "3-Car Garage" },
  { key: "four_car", label: "4+ Car Garage" },
  { key: "custom", label: "Custom Size" },
  { key: "not_sure", label: "Not Sure" }
];

export const TIMELINE_OPTIONS = [
  "AS SOON AS POSSIBLE",
  "WITHIN 30 DAYS",
  "1–3 MONTHS",
  "3–6 MONTHS",
  "JUST RESEARCHING"
];