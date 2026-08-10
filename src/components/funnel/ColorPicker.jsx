import React, { useMemo, useState } from "react";
import { COLOR_DATA } from "@/lib/colorData";
import SwatchImg from "@/components/ui/SwatchImg";
import { Check } from "lucide-react";

const SYSTEM_LABELS = {
  flake: "Flake",
  metallic: "Metallic",
  solid: "Solid",
  quartz: "Quartz",
  glitter: "Glitter",
  dye_stain: "Stained Concrete"
};

// --- high-contrast selection helpers ---

function hexToHsl(hex) {
  if (!hex) return { h: 0, s: 0, l: 50 };
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hue = (g - b) / d + (g < b ? 6 : 0); break;
      case g: hue = (b - r) / d + 2; break;
      case b: hue = (r - g) / d + 4; break;
    }
    hue *= 60;
  }
  return { h: hue, s: s * 100, l: l * 100 };
}

function colorDistance(a, b) {
  const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h));
  const ds = Math.abs(a.s - b.s);
  const dl = Math.abs(a.l - b.l);
  return Math.sqrt(dh * dh * 0.5 + ds * ds * 1.2 + dl * dl * 1.5);
}

// Greedily pick `n` colors that are as visually distinct from each other as
// possible (high contrast). `colors` is pre-shuffled so the starting point is
// random, giving a varied-but-stable selection per mount.
function pickHighContrast(colors, n) {
  if (colors.length <= n) return colors;
  const withHsl = colors.map((c) => ({ ...c, _h: hexToHsl(c.hex) }));
  const picked = [withHsl[0]];
  const pool = withHsl.slice(1);
  while (picked.length < n && pool.length) {
    let bestIdx = 0, bestMin = -1;
    for (let i = 0; i < pool.length; i++) {
      let minD = Infinity;
      for (const p of picked) minD = Math.min(minD, colorDistance(pool[i]._h, p._h));
      if (minD > bestMin) { bestMin = minD; bestIdx = i; }
    }
    picked.push(pool.splice(bestIdx, 1)[0]);
  }
  return picked;
}

// Categorized color picker for the funnel. Each tab is a real XPS color chart
// (flake, metallic, solid, …); swatches use the actual manufacturer photos.
export default function ColorPicker({ selected, onSelect }) {
  const systems = useMemo(() => {
    const present = new Set(COLOR_DATA.map((c) => c.system));
    return Object.keys(SYSTEM_LABELS).filter((s) => present.has(s));
  }, []);

  const [active, setActive] = useState(systems[0] || "flake");

  // Shuffle once per system change, then greedily pick high-contrast swatches.
  const shown = useMemo(() => {
    const all = COLOR_DATA.filter((c) => c.system === active);
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return pickHighContrast(shuffled, 12);
  }, [active]);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {systems.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              active === s
                ? "bg-stone-950 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
            }`}
          >
            {SYSTEM_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Swatch grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {shown.map((c) => {
          const isActive = selected === c.code;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => onSelect?.(c)}
              className={`text-left rounded-xl border overflow-hidden transition ${
                isActive ? "border-amber-500 ring-2 ring-amber-500" : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <div className="relative aspect-square">
                <SwatchImg
                  src={c.image_url}
                  hex={c.hex}
                  alt={`${c.color_name} (${c.code})`}
                  wrapperClassName="h-full w-full"
                />
                {isActive && (
                  <span className="absolute top-1 right-1 bg-amber-500 text-stone-950 rounded-full p-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <div className="p-2">
                <div className="text-xs font-semibold text-stone-900 truncate">{c.color_name}</div>
                <div className="text-[10px] text-stone-500 truncate">{c.code}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}