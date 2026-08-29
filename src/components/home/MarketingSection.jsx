import React from "react";
import { Droplets, ShieldCheck, Flame, Clock, Sparkles, Award } from "lucide-react";

const highlights = [
  { icon: Droplets, label: "Stain & oil resistant" },
  { icon: ShieldCheck, label: "Crack & moisture sealed" },
  { icon: Flame, label: "Hot-tire proof" },
  { icon: Clock, label: "1-day installation" },
  { icon: Sparkles, label: "Easy to clean" }
];

// Black band highlighting the key benefits of an epoxy garage floor,
// with a prominent power statement above it.
export default function MarketingSection() {
  return (
    <section className="bg-stone-950 text-white">
      {/* Power statement banner */}
      <div className="border-b border-amber-500/40 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 py-5 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 text-center">
          <Award className="h-7 w-7 text-amber-400 shrink-0" strokeWidth={2.2} />
          <span
            className="font-extrabold uppercase tracking-tight leading-none"
            style={{
              fontSize: "clamp(1.1rem, 2.4vw, 1.9rem)",
              color: "#FFD700",
              WebkitTextStroke: "0.5px #000",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)"
            }}
          >
            Powered by America's #1 Epoxy Superstore
          </span>
        </div>
      </div>

      {/* Benefits band */}
      <div className="py-8 px-6 border-b border-stone-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {highlights.map((h) => (
            <div key={h.label} className="flex items-center gap-2.5">
              <h.icon className="h-5 w-5 text-amber-400 shrink-0" />
              <span className="text-sm font-medium text-stone-200">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}