import React from "react";
import SeoPage from "@/components/seo/SeoPage";

export default function TwoCarGarageEpoxyCost() {
  return (
    <SeoPage
      slug="2-car-garage-epoxy-cost"
      title="How Much Does It Cost to Epoxy a 2-Car Garage? | Instant Estimate"
      metaDescription="How much does it cost to epoxy a 2-car garage? Get an instant personalized estimate in 60 seconds. See what affects 2-car garage floor coating pricing."
      h1="How Much Does It Cost to Epoxy a 2-Car Garage?"
      breadcrumbs={[{ label: "2-Car Garage Epoxy Cost" }]}
      intro="A 2-car garage is the most common residential epoxy project. The cost depends on your exact square footage, the finish you choose, and the condition of your concrete. Get a personalized range in about 60 seconds."
      estimatorLabel="Start with a 2-car garage estimate"
      prefillSize="two_car"
      sections={[
        {
          h2: "What affects 2-car garage epoxy cost",
          cards: [
            { t: "Square footage", d: "Most 2-car garages are 400–480 sq ft. Larger footprints need more material." },
            { t: "Finish selection", d: "Decorative flake is the most popular; metallic costs more per square foot." },
            { t: "Concrete condition", d: "Cracks, stains, and existing coatings add preparation cost." },
            { t: "Coating removal", d: "If an old coating needs removal, expect additional cost." }
          ]
        },
        {
          h2: "How to get the most accurate estimate",
          list: [
            "Measure your garage length and width if you can — custom dimensions give a more precise calculation",
            "Note any cracks, stains, or existing coatings before you start",
            "Upload a few photos so your specialist can review the condition",
            "Choose the finish you're most interested in"
          ]
        },
        {
          h2: "Why a range instead of a single price?",
          body: [
            <p key="1">A 2-car garage can vary in price based on preparation needs and finish selection. We provide a range so you can budget realistically.</p>,
            <p key="2">Your final price is confirmed after an in-home inspection, where we verify square footage, concrete condition, and any preparation requirements.</p>
          ]
        }
      ]}
    />
  );
}