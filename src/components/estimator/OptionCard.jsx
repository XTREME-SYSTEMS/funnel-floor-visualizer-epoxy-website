import React from "react";
import { Check } from "lucide-react";

export default function OptionCard({ selected, onClick, title, subtitle, image, compact }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left rounded-2xl border transition-all duration-200 overflow-hidden active:scale-[0.98] ${
        selected ? "border-amber-500 ring-2 ring-amber-500/30 bg-amber-50" : "border-stone-200 bg-white hover:border-stone-300"
      }`}
    >
      {image && (
        <div className="h-32 w-full overflow-hidden bg-stone-100">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold text-stone-900 leading-tight">{title}</div>
            {subtitle && <div className="text-sm text-stone-500 mt-1 leading-snug">{subtitle}</div>}
          </div>
          <span
            className={`shrink-0 mt-0.5 h-6 w-6 rounded-full border flex items-center justify-center ${
              selected ? "bg-amber-500 border-amber-500 text-white" : "border-stone-300"
            }`}
          >
            {selected && <Check className="h-4 w-4" />}
          </span>
        </div>
      </div>
    </button>
  );
}