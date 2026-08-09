import React from "react";
import { Ruler, Layers, Wrench, Calendar, Image, DollarSign } from "lucide-react";

const factors = [
  { icon: Ruler, t: "Garage size", d: "Square footage is the biggest driver of cost. Larger garages need more material and labor." },
  { icon: Layers, t: "Selected finish", d: "Decorative flake, solid color, and metallic systems each carry different material and labor costs." },
  { icon: Wrench, t: "Floor condition", d: "Cracks, stains, paint, or existing coatings may need extra preparation before coating." },
  { icon: Image, t: "Existing coating removal", d: "If an old coating needs to be removed, expect additional preparation time and cost." },
  { icon: Calendar, t: "Timeline", d: "Timeline doesn't change price directly, but it helps us prioritize your project." },
  { icon: DollarSign, t: "Minimum project charge", d: "Very small garages may be subject to a minimum project charge to cover setup and mobilization." }
];

export default function WhatAffectsPricing() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">What affects your garage floor cost</h2>
        <p className="mt-3 text-stone-500 max-w-2xl">Every estimate is personalized. These are the main factors that move the price up or down.</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((f) => (
            <div key={f.t}>
              <f.icon className="h-6 w-6 text-amber-500" />
              <h3 className="mt-3 text-base font-semibold text-stone-900">{f.t}</h3>
              <p className="mt-1.5 text-sm text-stone-500 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}