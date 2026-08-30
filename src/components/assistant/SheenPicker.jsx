import React from "react";

const SHEENS = [
  { key: "matte", label: "Matte", desc: "No shine, subtle", preview: "#d4d4d4" },
  { key: "satin", label: "Satin", desc: "Soft sheen", preview: "linear-gradient(135deg,#e8e8e8,#c0c0c0)" },
  { key: "gloss", label: "Gloss", desc: "High shine", preview: "linear-gradient(135deg,#fff,#e8e8e8,#c0c0c0,#fff)" },
];

export default function SheenPicker({ sheen, setSheen }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[14px] font-bold text-black">Choose Your Finish</h3>
      <p className="text-[10px] text-stone-500">Select the sheen level for your floor.</p>
      <div className="grid grid-cols-3 gap-2">
        {SHEENS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSheen(s.key)}
            className={`xa-gold-hover rounded-xl border p-3 text-center transition ${sheen === s.key ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}
          >
            <div className="h-10 w-10 mx-auto rounded-full mb-1.5 border border-stone-300" style={{ background: s.preview }} />
            <div className="text-[12px] font-bold text-black">{s.label}</div>
            <div className="text-[9px] text-stone-500">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}