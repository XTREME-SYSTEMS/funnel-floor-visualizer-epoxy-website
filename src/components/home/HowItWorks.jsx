import React from "react";

const steps = [
  { n: "01", t: "Answer a few questions", d: "Tell us about your garage size, concrete condition and the finish you like." },
  { n: "02", t: "See your price range", d: "We calculate a realistic estimated project range instantly." },
  { n: "03", t: "Talk to a specialist", d: "A floor specialist reviews your details and answers your questions." },
  { n: "04", t: "Confirm final pricing", d: "We inspect the concrete when needed and provide a final proposal." }
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">How it works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-stone-200 pt-5">
              <div className="text-amber-500 font-mono text-sm font-bold">{s.n}</div>
              <h3 className="mt-3 font-semibold text-lg text-stone-900">{s.t}</h3>
              <p className="mt-2 text-stone-500 leading-relaxed text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}