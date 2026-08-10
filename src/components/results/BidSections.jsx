import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { scopeForLead, WARRANTY_TEXT, FAQS } from "@/lib/bidContent";

// Surfaces the full detailed bid (scope of work, warranty, FAQs) on the results
// page — the same content the homeowner receives in their email.
export default function BidSections({ lead }) {
  const scope = scopeForLead(lead.floor_condition);
  return (
    <div className="space-y-10">
      {scope.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 mb-4">Scope of work — what's included</h2>
          <div className="rounded-2xl border border-stone-200 bg-white divide-y divide-stone-100 overflow-hidden">
            {scope.map((s, i) => (
              <div key={i} className="flex gap-3 p-4">
                <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">{s.label}</div>
                  <div className="text-sm text-stone-500 leading-relaxed mt-0.5">{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-semibold text-stone-900">Our warranty</h2>
        </div>
        <p className="text-sm text-stone-700 leading-relaxed">{WARRANTY_TEXT}</p>
      </section>

      {FAQS.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="rounded-2xl border border-stone-200 bg-white px-4">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`b${i}`} className="border-b border-stone-100 last:border-0">
                <AccordionTrigger className="text-left text-base font-medium text-stone-900">{f.q}</AccordionTrigger>
                <AccordionContent className="text-stone-600 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </div>
  );
}