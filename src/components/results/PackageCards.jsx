import React from "react";
import { money } from "@/lib/pricing";

export default function PackageCards({ packages = [] }) {
  if (!packages.length) return null;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {packages.map((p) => (
        <div
          key={p.tier}
          className={`rounded-2xl border p-6 ${p.tier === "BETTER" ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}
        >
          <div className="text-xs font-bold tracking-[0.2em] text-amber-600">{p.tier}</div>
          <h3 className="mt-2 text-lg font-semibold text-stone-900">{p.name}</h3>
          <div className="mt-3 text-xl font-semibold text-stone-900 tabular-nums">
            {money(p.low)} – {money(p.high)}
          </div>
          <p className="mt-3 text-sm text-stone-500 leading-relaxed">{p.description}</p>
        </div>
      ))}
    </div>
  );
}