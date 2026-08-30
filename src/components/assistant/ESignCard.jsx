import React, { useState } from "react";
import Disclaimer from "./Disclaimer";

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function ESignCard({ title, onSign, signed }) {
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const canSign = name.trim().length > 1 && agreed && !signed;

  return (
    <div className="space-y-3">
      <h3 className="text-[14px] font-bold text-black">{title}</h3>
      <Disclaimer />
      <label className="flex items-start gap-2">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} disabled={signed} className="mt-0.5 h-4 w-4 accent-amber-500" />
        <span className="text-[11px] text-stone-600 leading-snug">I agree to the terms above and confirm this electronic signature.</span>
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={signed}
        placeholder="Type your full name to sign"
        className="w-full h-11 rounded-lg border border-stone-300 px-3 text-[13px] text-black bg-white focus:border-amber-500 outline-none disabled:bg-stone-50"
      />
      <p className="text-[9px] text-stone-400">Date: {new Date().toLocaleDateString()}</p>
      <button
        disabled={!canSign}
        onClick={() => onSign(name)}
        className="w-full h-11 rounded-xl text-[13px] font-bold disabled:opacity-50 flex items-center justify-center gap-1.5"
        style={{ background: signed ? "#d4d4d4" : GOLD_GRADIENT, border: "2px solid #000", color: signed ? "#666" : "#1a1a1a" }}
      >
        {signed ? "✓ Signed" : "Sign & Continue"}
      </button>
    </div>
  );
}