import React, { useState } from "react";
import { Save, TrendingUp, Info } from "lucide-react";
import { FLOOR_SYSTEM_DATA } from "@/lib/colorData";
import { SIZE_OPTIONS } from "@/lib/defaults";

const SIZE_SQFT = { one_car: 240, two_car: 440, three_car: 660, four_car: 880, not_sure: 440 };

export default function AppEstimate({ appData }) {
  const { estimate, setEstimate } = appData;
  const [size, setSize] = useState(estimate?.garage_size || "two_car");
  const [systemKey, setSystemKey] = useState(estimate?.system_key || "flake-epoxy");
  const [customSqft, setCustomSqft] = useState(estimate?.custom_sqft || "");

  const system = FLOOR_SYSTEM_DATA.find((s) => s.slug === systemKey) || FLOOR_SYSTEM_DATA[0];
  const sqft = size === "custom" ? (Number(customSqft) || 0) : SIZE_SQFT[size] || 440;
  const low = Math.round(sqft * system.base_rate_low);
  const high = Math.round(sqft * system.base_rate_high);
  const mid = Math.round((low + high) / 2);
  const perSqft = ((system.base_rate_low + system.base_rate_high) / 2).toFixed(2);

  const handleSave = () => {
    setEstimate({
      garage_size: size,
      square_footage: sqft,
      system_key: systemKey,
      system_name: system.name,
      low, high, mid,
      custom_sqft: customSqft,
      calculatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Instant Bid</h1>
      <p className="text-sm text-stone-500 mb-4">Get a price range in seconds using national average pricing.</p>

      {/* Size picker */}
      <div className="mb-4">
        <label className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-2 block">Garage Size</label>
        <div className="grid grid-cols-3 gap-2">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSize(s.key)}
              className={`py-3 px-2 rounded-xl text-xs font-semibold transition border-2 ${size === s.key ? "border-amber-500 bg-amber-50 text-stone-900" : "border-stone-200 bg-white text-stone-600"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {size === "custom" && (
          <input
            type="number"
            value={customSqft}
            onChange={(e) => setCustomSqft(e.target.value)}
            placeholder="Enter square footage"
            className="mt-2 w-full h-12 px-4 rounded-xl border-2 border-stone-200 text-sm focus:border-amber-400 outline-none"
          />
        )}
      </div>

      {/* System picker */}
      <div className="mb-4">
        <label className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-2 block">Floor System</label>
        <div className="space-y-2">
          {FLOOR_SYSTEM_DATA.map((s) => (
            <button
              key={s.slug}
              onClick={() => setSystemKey(s.slug)}
              className={`w-full text-left p-3 rounded-xl border-2 transition flex items-center justify-between ${systemKey === s.slug ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-stone-900">{s.name}</div>
                <div className="text-[11px] text-stone-500 truncate">{s.description}</div>
              </div>
              <div className="text-right ml-3 shrink-0">
                <div className="text-xs font-bold text-stone-700">${s.base_rate_low}–${s.base_rate_high}</div>
                <div className="text-[10px] text-stone-400">per sq ft</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 p-5 text-center">
        <div className="text-xs font-bold tracking-wider text-amber-500 uppercase">Estimated Range</div>
        <div className="text-3xl font-extrabold text-white mt-1">${low.toLocaleString()} – ${high.toLocaleString()}</div>
        <div className="text-sm text-stone-400 mt-1">{system.name} · {sqft} sq ft · avg ${perSqft}/sq ft</div>
        <button onClick={handleSave} className="mt-4 w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition">
          <Save className="h-4 w-4" /> Save this bid
        </button>
      </div>

      {/* National average info */}
      <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3 flex gap-2">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>How we calculate:</strong> Ranges use national average install rates of ${system.base_rate_low}–${system.base_rate_high}/sq ft for {system.name}. Your final price depends on concrete condition, prep, and selected finish.
        </p>
      </div>

      {estimate && (
        <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-amber-600 shrink-0" />
          <p className="text-xs text-stone-700">Last saved bid: <strong>${estimate.low.toLocaleString()}–${estimate.high.toLocaleString()}</strong> for {estimate.system_name}</p>
        </div>
      )}
    </div>
  );
}