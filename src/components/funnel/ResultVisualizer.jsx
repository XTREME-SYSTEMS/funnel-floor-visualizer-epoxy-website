import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const FALLBACK_BEFORE = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/2fa2f386d_generated_image.png";
const FALLBACK_AFTER = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/b2326e50a_generated_image.png";

// Renders the user's own garage with their chosen color applied. Auto-
// generates the "after" image from the uploaded photo + selected color on
// mount. Falls back to a generic before/after when no photo was uploaded.
export default function ResultVisualizer({ photoUrl, color, onAfterReady }) {
  const [afterUrl, setAfterUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!photoUrl) {
      onAfterReady?.(FALLBACK_AFTER);
      return;
    }
    let cancelled = false;
    const run = async () => {
      if (!color?.code) return;
      setGenerating(true);
      try {
        const prompt = `Photorealistic transformation of this residential garage floor. Apply a professional ${color.system || "flake"} epoxy coating in the color "${color.name}" (${color.code}${color.hex ? `, hex ${color.hex}` : ""}). Keep the same garage walls, doors, lighting, and camera angle as the original photo. Only the floor surface changes — it now has a clean, glossy, professionally installed ${color.system || "flake"} finish in ${color.name}. Ultra-lifelike, high detail, natural lighting.`;
        const { url } = await base44.integrations.Core.GenerateImage({
          prompt,
          existing_image_urls: [photoUrl]
        });
        if (!cancelled) { setAfterUrl(url); onAfterReady?.(url); }
      } catch {
        if (!cancelled) { setFailed(true); onAfterReady?.(""); }
      } finally {
        if (!cancelled) setGenerating(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [photoUrl, color?.code]);

  // No uploaded photo — show the generic showcase transformation.
  if (!photoUrl) {
    return <BeforeAfter beforeUrl={FALLBACK_BEFORE} afterUrl={FALLBACK_AFTER} />;
  }

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-stone-500">
        <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
        <p className="text-sm">Rendering your garage with {color?.name}…</p>
      </div>
    );
  }

  if (failed || !afterUrl) {
    return (
      <div className="text-center py-8 text-sm text-stone-500">
        We couldn't generate your preview right now, but your <strong>{color?.name}</strong> selection is saved with your estimate.
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-stone-500 mb-4">Drag the slider to see your garage transformed with {color?.name}.</p>
      <BeforeAfter beforeUrl={photoUrl} afterUrl={afterUrl} />
    </div>
  );
}