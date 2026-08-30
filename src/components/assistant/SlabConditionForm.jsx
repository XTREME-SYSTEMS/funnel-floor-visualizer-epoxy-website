import React from "react";
import { Plus } from "lucide-react";

const CONDITIONS = [
  { key: "cracks", label: "Cracks", unit: "qty", addIncrement: 1 },
  { key: "patches", label: "Excessive Patches", unit: "qty", addIncrement: 250 },
  { key: "holes", label: "Holes", unit: "qty", addIncrement: 1 },
  { key: "sawCuts", label: "Saw Cuts", unit: "lin. ft.", addIncrement: 250 },
];

export default function SlabConditionForm({ slab, setSlab }) {
  const update = (key, val) => setSlab({ ...slab, [key]: Math.max(0, val) });

  return (
    <div className="space-y-3">
      <h3 className="text-[14px] font-bold text-black">Slab Condition</h3>
      <p className="text-[10px] text-stone-500">Tell us about your floor's condition so we can prepare properly.</p>
      <div className="space-y-2.5">
        {CONDITIONS.map((c) => (
          <div key={c.key} className="rounded-lg border border-stone-200 p-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-semibold text-black">{c.label}</span>
              <span className="text-[9px] text-stone-400">{c.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={slab[c.key] || 0}
                onChange={(e) => update(c.key, parseInt(e.target.value) || 0)}
                className="flex-1 h-9 rounded-lg border border-stone-300 px-2.5 text-[12px] text-black bg-white focus:border-amber-500 outline-none"
              />
              <button
                onClick={() => update(c.key, (slab[c.key] || 0) + c.addIncrement)}
                className="h-9 px-2.5 rounded-lg border border-amber-500 bg-amber-50 text-[11px] font-bold text-amber-700 flex items-center gap-1 whitespace-nowrap hover:bg-amber-100"
              >
                <Plus className="h-3 w-3" /> {c.addIncrement}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}