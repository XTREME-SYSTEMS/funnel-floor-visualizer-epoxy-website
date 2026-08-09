import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How accurate is the instant estimate?", a: "It is a preliminary range based on the information you provide. Your final price is confirmed after speaking with a specialist and, when necessary, inspecting your concrete." },
  { q: "How long does an installation take?", a: "Most residential garages are completed in a short window. Your specialist will confirm the schedule for your project." },
  { q: "Do I have to move everything out of the garage?", a: "The floor needs to be clear to be prepared and coated. We'll walk you through what's needed before the install date." },
  { q: "What if I already have an old coating?", a: "Existing coatings usually need to be removed before a new system goes down. Let us know during the estimator so we can factor it in." },
  { q: "Is the estimate a contract?", a: "No. It is an initial estimate only and is not a proposal or a guaranteed final price." }
];

export default function FAQ() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">Frequently asked questions</h2>
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