import React, { useState } from "react";
import { Image } from "@/components/ui/image";

const COLORS = [
  { n: "01", name: "Gravel", code: "FB-414", desc: "Gray / Black / White" },
  { n: "02", name: "Outback", code: "FB-517", desc: "Earth tones" },
  { n: "03", name: "Quicksilver", code: "FB-424", desc: "Dark gray / Black / White" },
  { n: "04", name: "Safari", code: "FB-504", desc: "Tan / White / Black" },
  { n: "05", name: "Wombat", code: "FB-616", desc: "Brown / Tan / Gray" },
  { n: "06", name: "Stonehenge", code: "FB-427", desc: "Light gray / White / Tan" },
  { n: "07", name: "Rapids", code: "FB-506", desc: "Blue / Gray / White" },
  { n: "08", name: "Creekbed", code: "FB-716", desc: "Brown / Tan / Sand" },
  { n: "09", name: "Domino", code: "FB-411", desc: "High-contrast Black / White" },
  { n: "10", name: "Shoreline", code: "FB-421", desc: "Light tan / Gray / White" },
  { n: "11", name: "Orbit", code: "FB-310", desc: "White / Gray / Black" },
  { n: "12", name: "Snowfall", code: "FB-602", desc: "Light gray / White / Dark gray" }
];

const CHART_URL = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/108afbd51_xps-top-flake-colors-approved.webp";

export default function FlakeColorChart({ selected, onSelect }) {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden border border-stone-200 mb-6">
        <Image src={CHART_URL} alt="XPS Top 12 Epoxy Flake Colors chart" fittingType="fit" className="w-full" />
      </div>
      <p className="text-sm text-stone-500 mb-4">
        Tap a color to select your favorite. We'll confirm the final blend with physical samples before installation.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {COLORS.map((c) => {
          const active = selected === c.code;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => onSelect?.(c.code)}
              className={`text-left rounded-xl border p-3 transition ${active ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500" : "border-stone-200 bg-white hover:border-stone-300"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400">{c.n}</span>
                {active && <span className="text-xs font-bold text-amber-600">SELECTED</span>}
              </div>
              <div className="mt-1 font-semibold text-stone-900 text-sm">{c.name}</div>
              <div className="text-xs text-stone-500">{c.code}</div>
              <div className="text-xs text-stone-400 mt-0.5">{c.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}