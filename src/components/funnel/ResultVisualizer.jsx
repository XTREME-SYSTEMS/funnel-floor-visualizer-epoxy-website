import React, { useEffect } from "react";
import TintedBeforeAfter from "@/components/funnel/TintedBeforeAfter";
import { compositeFloorImage } from "@/lib/floorComposite";

const FALLBACK_BEFORE = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/2fa2f386d_generated_image.png";

// Renders the user's uploaded garage photo with their chosen floor color
// applied via a CSS color overlay (always works — no canvas/CORS/tainting).
// A canvas-composited image is generated in the background for the estimate
// email; if canvas fails (CORS), the original photo is used as the email image.
export default function ResultVisualizer({ photoUrl, color, onAfterReady }) {
  const colorName = color?.name || color?.color_name || color?.code || "";

  // Best-effort canvas composite for the email image (non-blocking)
  useEffect(() => {
    if (!photoUrl || !color?.hex) {
      onAfterReady?.(photoUrl || "");
      return;
    }
    let cancelled = false;
    const run = async () => {
      try {
        const dataUrl = await compositeFloorImage(photoUrl, color);
        if (!cancelled) onAfterReady?.(dataUrl);
      } catch {
        if (!cancelled) onAfterReady?.(photoUrl);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [photoUrl, color?.hex]);

  // No uploaded photo — show the generic showcase with the chosen color
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

  return (
    <div>
      <p className="text-sm text-stone-500 mb-4">Drag the slider to see your garage transformed with {colorName}.</p>
      <TintedBeforeAfter photoUrl={photoUrl} color={color} />
    </div>
  );
}