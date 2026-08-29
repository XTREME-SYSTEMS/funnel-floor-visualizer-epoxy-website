import React from "react";
import { Droplets, ShieldCheck, Flame, Clock, Sparkles, TrendingUp } from "lucide-react";

const highlights = [
  { icon: Droplets, label: "Stain & oil resistant" },
  { icon: ShieldCheck, label: "Crack & moisture sealed" },
  { icon: Flame, label: "Hot-tire proof" },
  { icon: Clock, label: "1-day installation" },
  { icon: Sparkles, label: "Easy to clean" },
  { icon: TrendingUp, label: "Powered by Americas #1 Epoxy Superstore" }
];

// Small black band highlighting the key benefits of an epoxy garage floor.
export default function MarketingSection() {
  return (
    <section className="bg-stone-950 text-white py-8 px-6 border-b border-stone-800">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {highlights.map((h) => (
          <div key={h.label} className="flex items-center gap-2.5">
            <h.icon className="h-5 w-5 text-amber-400 shrink-0" />
            <span className="text-sm font-medium text-stone-200">{h.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}