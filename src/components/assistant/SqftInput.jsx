import React from "react";

export default function SqftInput({ sqft, setSqft }) {
  const overage = Math.ceil(sqft * 0.1);
  const total = sqft + overage;

  return (
    <div className="space-y-3">
      <h3 className="text-[14px] font-bold text-black">Square Footage</h3>
      <p className="text-[10px] text-stone-500">Enter the area being measured. We add 10% for overage automatically.</p>
      <input
        type="number"
        min="0"
        value={sqft || ""}
        onChange={(e) => setSqft(parseInt(e.target.value) || 0)}
        placeholder="Enter square feet"
        className="w-full h-11 rounded-lg border border-stone-300 px-3 text-[14px] text-black bg-white focus:border-amber-500 outline-none"
      />
      {sqft > 0 && (
        <div className="rounded-lg bg-stone-50 border border-stone-200 p-2.5 text-[12px] space-y-1">
          <div className="flex justify-between text-stone-600"><span>Entered:</span><span>{sqft} sq ft</span></div>
          <div className="flex justify-between text-stone-600"><span>10% Overage:</span><span>+{overage} sq ft</span></div>
          <div className="flex justify-between font-bold text-black mt-1 pt-1 border-t border-stone-200"><span>Total Needed:</span><span>{total} sq ft</span></div>
        </div>
      )}
    </div>
  );
}