import React from "react";
import SeoPage from "@/components/seo/SeoPage";

export default function EpoxyGarageFloorCost() {
  return (
    <SeoPage
      slug="epoxy-garage-floor-cost"
      title="How Much Does an Epoxy Garage Floor Cost? | Instant Estimate"
      metaDescription="How much does an epoxy garage floor cost? Get an instant personalized estimate in 60 seconds. See what affects pricing — garage size, condition, finish, and more."
      h1="How Much Does an Epoxy Garage Floor Cost?"
      breadcrumbs={[{ label: "Epoxy Garage Floor Cost" }]}
      intro="The cost of an epoxy garage floor depends on your garage size, the finish you choose, and the condition of your concrete. Instead of guessing or calling around, get a personalized range in about 60 seconds with our estimator."
      sections={[
        {
          h2: "Pricing variables at a glance",
          cards: [
            { t: "Square footage", d: "The biggest factor. More square footage means more material and labor." },
            { t: "Finish selection", d: "Decorative flake, solid color, and metallic systems each carry different per-square-foot costs." },
            { t: "Floor condition", d: "Cracks, stains, paint, and existing coatings may require extra preparation." },
            { t: "Existing coating removal", d: "Removing an old coating adds preparation time and cost." },
            { t: "Repairs", d: "Crack filling, joint repair, and spalling repair add to preparation." },
            { t: "Minimum project charge", d: "Very small garages may be subject to a minimum to cover setup and mobilization." }
          ]
        },
        {
          h2: "Why estimates vary between contractors",
          body: [
            <p key="1">Two contractors can quote very different prices for the same garage. The difference usually comes down to preparation method, coating system quality, number of coats, and whether the price includes repairs.</p>,
            <p key="2">A lower price may mean fewer preparation steps, a thinner system, or skipped repairs. A higher price may include more thorough preparation, a multi-coat system, and a longer-wearing topcoat.</p>
          ]
        },
        {
          h2: "Typical garage sizes",
          list: [
            "1-car garage: ~240 sq ft — often subject to a minimum project charge",
            "2-car garage: ~400–480 sq ft — the most common residential project",
            "3-car garage: ~600–720 sq ft — larger footprint, more material",
            "4+ car garage: custom pricing based on actual dimensions"
          ]
        },
        {
          h2: "How to use this estimator",
          body: [
            <p key="1">Answer a few quick questions about your garage. You'll get a low-to-high estimated range instantly. There's no obligation and no phone call required to see your estimate.</p>,
            <p key="2">If the range fits your budget, book a free consultation. We'll confirm the details and schedule an in-home inspection to provide a final proposal.</p>
          ]
        }
      ]}
    />
  );
}