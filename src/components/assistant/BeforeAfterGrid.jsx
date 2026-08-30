import React from "react";
import { Loader2 } from "lucide-react";
import Disclaimer from "./Disclaimer";

const SHEEN_FILTERS = {
  matte: "brightness(0.95) saturate(0.9)",
  satin: "brightness(1.0) saturate(1.0)",
  gloss: "brightness(1.08) saturate(1.2) contrast(1.03)",
};

export default function BeforeAfterGrid({ photos, composites, sheen, generating, selectedColor }) {
  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
        <p className="text-[12px] text-stone-600">Generating your floor preview…</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-[14px] font-bold text-black">Your Floor Preview</h3>
      {selectedColor && (
        <p className="text-[10px] text-stone-500">
          Color: <span className="font-semibold text-black">{selectedColor.color_name}</span> ({selectedColor.code}) · Finish: <span className="font-semibold capitalize">{sheen}</span>
        </p>
      )}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[10px] font-bold text-stone-500 uppercase mb-1.5 text-center">Before</div>
          <div className="space-y-2">
            {photos.map((p, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-stone-200 aspect-square">
                <img src={p.url} alt={`Before ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-amber-600 uppercase mb-1.5 text-center">After</div>
          <div className="space-y-2">
            {composites.map((c, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-amber-300 aspect-square">
                <img src={c} alt={`After ${i + 1}`} className="w-full h-full object-cover" style={{ filter: SHEEN_FILTERS[sheen] }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Disclaimer />
    </div>
  );
}