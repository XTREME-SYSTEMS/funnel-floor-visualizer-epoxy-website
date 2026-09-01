import React, { useEffect, useState, useRef } from "react";
import { Loader2, MoveHorizontal } from "lucide-react";
import { compositeFloorImage } from "@/lib/floorComposite";

const FALLBACK_BEFORE = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/2fa2f386d_generated_image.png";

// Canvas-based result visualizer — composites the EXACT uploaded photo with
// a procedural texture generated from the exact color chart hex value.
// Guarantees color accuracy (no AI guessing). Shows a before/after compare.
export default function ResultVisualizer({ photoUrl, color, onAfterReady }) {
  const [afterUrl, setAfterUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [comparePos, setComparePos] = useState(50);
  const compareRef = useRef(null);
  const dragging = useRef(false);

  const colorName = color?.name || color?.color_name || color?.code || "";

  // Composite the floor texture onto the uploaded photo using the exact hex
  useEffect(() => {
    if (!photoUrl || !color?.hex) {
      onAfterReady?.(photoUrl || "");
      return;
    }
    let cancelled = false;
    setLoading(true);
    const run = async () => {
      try {
        const dataUrl = await compositeFloorImage(photoUrl, {
          hex: color.hex,
          system: color.system,
        }, "gloss");
        if (!cancelled) {
          setAfterUrl(dataUrl);
          onAfterReady?.(dataUrl);
        }
      } catch {
        if (!cancelled) {
          setAfterUrl(photoUrl);
          onAfterReady?.(photoUrl);
        }
      }
      if (!cancelled) setLoading(false);
    };
    run();
    return () => { cancelled = true; };
  }, [photoUrl, color?.hex]);

  const moveCompare = (clientX) => {
    const el = compareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setComparePos(Math.max(0, Math.min(100, p)));
  };

  // No uploaded photo — show the generic showcase
  if (!photoUrl) {
    return (
      <div>
        <p className="text-sm text-stone-500 mb-4">Here's an example transformation with {colorName}:</p>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <img src={FALLBACK_BEFORE} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0" style={{ top: "42%", background: color?.hex || "#777777", mixBlendMode: "multiply", opacity: 0.78 }} />
          <div className="absolute inset-x-0 bottom-0" style={{ top: "42%", background: "linear-gradient(to bottom, rgba(255,255,255,0.20), transparent 30%, rgba(255,255,255,0.10))", mixBlendMode: "overlay" }} />
          <div className="absolute inset-x-0" style={{ top: "42%", height: "14%", background: `linear-gradient(to bottom, transparent, ${color?.hex || "#777777"})`, opacity: 0.78, mixBlendMode: "multiply" }} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
        <p className="text-sm text-stone-500">Generating your {colorName} floor preview…</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-stone-500 mb-4">Drag the slider to see your garage transformed with {colorName}.</p>
      <div
        ref={compareRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-stone-100"
        onMouseDown={(e) => { dragging.current = true; moveCompare(e.clientX); }}
        onMouseMove={(e) => dragging.current && moveCompare(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => moveCompare(e.touches[0].clientX)}
        onTouchMove={(e) => moveCompare(e.touches[0].clientX)}
      >
        {/* AFTER (full container) */}
        <img src={afterUrl || photoUrl} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        {/* BEFORE (clipped to slider) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${comparePos}%` }}>
          <img
            src={photoUrl}
            alt="Before"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${comparePos > 0 ? 10000 / comparePos : 100}%` }}
          />
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest bg-stone-900/80 text-white px-2 py-1 rounded z-10">BEFORE</span>
        <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest bg-amber-500 text-stone-950 px-2 py-1 rounded z-10">AFTER</span>
        <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10" style={{ left: `${comparePos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <MoveHorizontal className="h-5 w-5 text-stone-900" />
          </div>
        </div>
        {colorName && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-stone-900/80 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
            <span className="inline-block w-3 h-3 rounded-full border border-white/40" style={{ background: color?.hex }} />
            {colorName}
          </div>
        )}
      </div>
    </div>
  );
}