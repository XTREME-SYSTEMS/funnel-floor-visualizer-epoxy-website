import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How accurate is the instant estimate?", a: "It is a preliminary range based on the information you provide. Your final price is confirmed after speaking with a specialist and, when necessary, inspecting your concrete." },
  { q: "One-day vs. two-day installation — what's the difference?", a: "One-day polyaspartic systems cure fast and get you back on your floor in 24 hours, but they skip critical moisture-mitigation steps. Our two-day system focuses on thorough concrete preparation — grinding, crack repair, and moisture testing on day one — then applies the industrial-grade epoxy, flake, and polyurea topcoat on day two. The result is a floor that won't peel, bubble, or suffer hot-tire pickup, backed by our lifetime warranty." },
  { q: "How is your coating system different from standard DIY epoxy?", a: "Big-box DIY epoxy kits are typically thin water-based coatings that peel under hot tires within 1–2 years. We use 100% solids industrial-grade epoxy, decorative flake systems, and UV-stable polyurea topcoats — the same manufacturer-grade materials contractors buy from Xtreme Polishing Systems. Our system is 20x more durable than store-bought kits and guaranteed for life against hot-tire pickup." },
  { q: "What does the lifetime warranty cover?", a: "Our lifetime satisfaction warranty covers peeling, blistering, and hot-tire pickup for as long as you own your home. If your floor fails due to a product or workmanship issue, we'll repair or recoat it at no cost. The warranty is transferable to the next homeowner." },
  { q: "Do you require a deposit to get started?", a: "No. We never ask for an up-front deposit. Your estimate is free, and you don't pay anything until your installation is scheduled and you've reviewed and approved your final proposal." },
  { q: "How long does an installation take?", a: "Most residential garages are completed in 1–2 days depending on the system you choose and the condition of your concrete. Your specialist will confirm the exact schedule for your project during your consultation." },
  { q: "Do I have to move everything out of the garage?", a: "The floor needs to be clear to be prepared and coated. We'll walk you through what's needed before the install date and can recommend storage solutions if needed." },
  { q: "What if I already have an old coating?", a: "Existing coatings usually need to be mechanically removed (ground down) before a new system goes down. Let us know during the estimator so we can factor the removal into your price." },
  { q: "Can you coat concrete that has cracks or damage?", a: "Yes. Surface preparation includes grinding the concrete and repairing cracks, spalling, and pitting with industrial-grade polyurea crack filler. Minor cracking is normal and fully addressed before coating." },
  { q: "Is the estimate a contract?", a: "No. It is an initial estimate only and is not a proposal or a guaranteed final price. There is zero obligation." },
  { q: "Do you offer financing?", a: "Ask your sales pro about available financing options during your consultation. Many of our customers spread the cost over affordable monthly payments." },
  { q: "What areas do you serve?", a: "With 70+ XPS Xpress locations nationwide, we serve homeowners within a 50-mile radius of each store. Enter your ZIP code in our location finder to see your nearest store and confirm service availability." },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">Frequently asked questions</h2>
        <p className="mt-3 text-stone-600">Everything you need to know before requesting your free estimate.</p>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-stone-600 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}