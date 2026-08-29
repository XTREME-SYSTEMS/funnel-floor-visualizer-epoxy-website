import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import { COLOR_DATA } from "@/lib/colorData";

const SYSTEMS = [
  { key: "flake", label: "Flake" },
  { key: "metallic", label: "Metallic" },
  { key: "solid", label: "Solid" },
  { key: "quartz", label: "Quartz" },
  { key: "glitter", label: "Glitter" },
  { key: "dye_stain", label: "Stain" }
];

export default function AppColors() {
  const [system, setSystem] = useState("flake");
  const colors = COLOR_DATA.filter((c) => c.system === system);

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Color Charts</h1>
      <p className="text-sm text-stone-500 mb-4">Browse {colors.length}+ {SYSTEMS.find(s => s.key === system)?.label} colors from XPS & Torginol.</p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {SYSTEMS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSystem(s.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition ${system === s.key ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {colors.map((c) => (
          <div key={c.code} className="rounded-xl overflow-hidden bg-white border border-stone-200 shadow-sm">
            <div className="h-24 relative">
              {c.image_url ? (
                <Image src={c.image_url} alt={c.color_name} fittingType="fill" className="h-full w-full" />
              ) : (
                <div className="h-full w-full" style={{ background: c.hex }} />
              )}
              {c.in_stock && <span className="absolute top-1 right-1 text-[8px] font-bold bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded">IN STOCK</span>}
            </div>
            <div className="p-2">
              <div className="text-xs font-bold text-stone-800 truncate">{c.color_name}</div>
              <div className="text-[10px] text-stone-400">{c.code}</div>
              <div className="text-[9px] text-stone-400 mt-0.5">{c.collection}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}