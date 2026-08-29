import React from "react";
import { FLOOR_SYSTEM_DATA } from "@/lib/colorData";
import { Check } from "lucide-react";

export default function AppServices() {
  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Our Services</h1>
      <p className="text-sm text-stone-500 mb-4">Full-service concrete and epoxy flooring — from garages to commercial warehouses.</p>

      <div className="space-y-3">
        {FLOOR_SYSTEM_DATA.map((s) => (
          <div key={s.slug} className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="text-base font-bold text-stone-900">{s.name}</h2>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded shrink-0">${s.base_rate_low}–${s.base_rate_high}/sq ft</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">{s.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.finishes.map((f) => (
                  <span key={f} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded-full">{f}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {s.colors.slice(0, 8).map((c) => (
                  <div key={c.code} className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-full border border-stone-200" style={{ background: c.hex }} />
                  </div>
                ))}
                <span className="text-[10px] text-stone-400 ml-1">+{s.colors.length} colors</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-stone-50 border border-stone-200 p-4">
        <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-1.5">
          <Check className="h-4 w-4 text-amber-500" /> What's Included
        </h3>
        <ul className="space-y-1.5 text-xs text-stone-600">
          <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" /> Free in-home consultation & measurement</li>
          <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" /> Surface prep, crack repair & moisture testing</li>
          <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" /> Premium XPS epoxy, polyaspartic & flake products</li>
          <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" /> Professional installation by trained crews</li>
          <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" /> Written warranty & post-install support</li>
        </ul>
      </div>
    </div>
  );
}