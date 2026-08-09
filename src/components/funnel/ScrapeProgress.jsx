import React, { useEffect, useState } from "react";
import { Search, MapPin, Home, Ruler, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: Search, label: "Searching public property records…", duration: 1200 },
  { icon: MapPin, label: "Locating parcel boundaries…", duration: 1000 },
  { icon: Home, label: "Detecting garage footprint…", duration: 1100 },
  { icon: Ruler, label: "Calculating garage square footage…", duration: 900 },
  { icon: CheckCircle2, label: "Lookup complete!", duration: 600 }
];

export default function ScrapeProgress({ address, onComplete }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let elapsed = 0;
    const total = STEPS.reduce((s, st) => s + st.duration, 0);

    const run = (i) => {
      if (cancelled) return;
      if (i >= STEPS.length) {
        setProgress(100);
        setTimeout(() => !cancelled && onComplete?.(), 400);
        return;
      }
      setStepIdx(i);
      const start = elapsed;
      const stepEnd = start + STEPS[i].duration;
      const tick = setInterval(() => {
        if (cancelled) return;
        elapsed += 50;
        setProgress(Math.min(100, (elapsed / total) * 100));
        if (elapsed >= stepEnd) {
          clearInterval(tick);
          run(i + 1);
        }
      }, 50);
    };
    run(0);
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 mb-4">
            <Search className="h-8 w-8 text-amber-500 animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Looking up your garage</h2>
          <p className="mt-2 text-stone-400 text-sm truncate">{address}</p>
        </div>

        <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-amber-500 transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>

        <div className="space-y-3">
          {STEPS.map((s, i) => {
            const done = i < stepIdx;
            const active = i === stepIdx;
            return (
              <div key={i} className={`flex items-center gap-3 transition ${done || active ? "opacity-100" : "opacity-30"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-green-500/20" : active ? "bg-amber-500/20" : "bg-stone-800"}`}>
                  {done ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <s.icon className={`h-4 w-4 ${active ? "text-amber-500" : "text-stone-500"}`} />}
                </div>
                <span className={`text-sm ${done ? "text-stone-400" : active ? "text-white font-medium" : "text-stone-500"}`}>
                  {s.label}
                  {active && <span className="ml-1 inline-flex"><span className="animate-pulse">.</span><span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span><span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span></span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}