import React from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How accurate is the instant estimate?", a: "It is a preliminary range based on the information you provide. Your final price is confirmed after speaking with a specialist and, when necessary, inspecting your concrete." },
  { q: "One-day vs. two-day installation — what's the difference?", a: "The only difference is the higher cost of product with one-day systems. There is no change in quality or durability — speed and convenience impose more cost." },
  { q: "How are your systems different?", a: "As manufacturers, we have spent significant research developing products that are more flexible, more moisture-tolerant, and designed for commercial applications. With 30+ years of experience, you get the benefit of our experience." },
  { q: "What does the lifetime warranty cover?", a: "Our lifetime satisfaction warranty covers peeling, blistering, and hot-tire pickup for as long as you own your home. If your floor fails due to a product or workmanship issue, we'll repair or recoat it at no cost." },
  { q: "Do you require a deposit to get started?", a: "Yes. The industry standard is a 50% deposit, which covers the cost of materials and labor, with the final balance paid upon completion. However, if you need additional help, please let us know — we may be able to make accommodations." },
  { q: "How long does an installation take?", a: "Most residential garages are completed in 1–2 days depending on the system you choose and the condition of your concrete. Your specialist will confirm the exact schedule for your project during your consultation." },
  { q: "Do I have to move everything out of the garage?", a: "The floor needs to be clear to be prepared and coated. We'll walk you through what's needed before the install date and can recommend storage solutions if needed." },
  { q: "What if I already have an old coating?", a: "Existing coatings usually need to be mechanically removed (ground down) before a new system goes down. Let us know during the estimator so we can factor the removal into your price." },
  { q: "Can you coat concrete that has cracks or damage?", a: "Yes. Surface preparation includes grinding the concrete and repairing cracks, spalling, and pitting with industrial-grade polyurea crack filler. Minor cracking is normal and fully addressed before coating." },
  { q: "Is the estimate a contract?", a: "No. It is an initial estimate only and is not a proposal or a guaranteed final price. There is zero obligation." },
  { q: "Do you offer financing?", a: <>Yes, we offer financing. <a href="https://xtremepolishingsystems.com/pages/equipment-financing" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold underline hover:text-amber-500">Learn more about our flexible payment plans</a>.</> },
  { q: "What areas do you serve?", a: <>We service all 50 states. <Link to="/locations" className="text-amber-600 font-semibold underline hover:text-amber-500">Find your nearest dealer with our ZIP code locator</Link>.</> },
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