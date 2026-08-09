import React from "react";
import SeoPage from "@/components/seo/SeoPage";

export default function ThreeCarGarageEpoxyCost() {
  return (
    <SeoPage
      slug="3-car-garage-epoxy-cost"
      title="How Much Does It Cost to Epoxy a 3-Car Garage? | Instant Estimate"
      metaDescription="How much does it cost to epoxy a 3-car garage? Get an instant personalized estimate in 60 seconds. See what affects 3-car garage floor coating pricing."
      h1="How Much Does It Cost to Epoxy a 3-Car Garage?"
      breadcrumbs={[{ label: "3-Car Garage Epoxy Cost" }]}
      intro="A 3-car garage is a larger project with more square footage, more material, and more labor. Get a personalized estimate range in about 60 seconds."
      estimatorLabel="Start with a 3-car garage estimate"
      prefillSize="three_car"
      sections={[
        {
          h2: "What affects 3-car garage epoxy cost",
          cards: [
            { t: "Square footage", d: "Most 3-car garages are 600–720 sq ft — significantly more than a 2-car." },
            { t: "Finish selection", d: "Per-square-foot cost is the same, but total cost is higher due to size." },
            { t: "Concrete condition", d: "Larger floors may have more cracks or joints to address." },
            { t: "Preparation", d: "More square footage means more grinding, repair, and coating material." }
          ]
        },
        {
          h2: "Is a 3-car garage worth coating?",
          body: [
            <p key="1">A 3-car garage is a large, visible part of your home. Coating it transforms the space from a raw concrete storage area into a finished extension of your home.</p>,
            <p key="2">Because the square footage is larger, the total investment is higher — but the per-square-foot cost is the same as a smaller garage with the same finish.</p>
          ]
        },
        {
          h2: "Getting an accurate 3-car estimate",
          list: [
            "Use custom dimensions if your garage is oversized or undersized",
            "Note any existing coatings or major cracks",
            "Upload photos so your specialist can review the condition",
            "Choose the finish you're considering"
          ]
        }
      ]}
    />
  );
}