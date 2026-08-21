import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { COLOR_DATA } from "@/lib/colorData";
import { compositeFloorImage } from "@/lib/floorComposite";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const FALLBACK_BEFORE = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/2fa2f386d_generated_image.png";
const FALLBACK_AFTER = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/b2326e50a_generated_image.png";

// Renders the user's EXACT uploaded garage photo with their chosen color
// applied via canvas compositing. Uses the exact color chart hex + swatch
// image — no AI generation, so the original photo is preserved and the
// color matches the system's color chart exactly. The composite is
// uploaded so the email gets a real URL. Falls back to a generic
// before/when no photo was uploaded.
export default function ResultVisualizer({ photoUrl, color, onAfterReady }) {
  const [afterUrl, setAfterUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [failed, setFailed] = useState(false);

  const colorName = color?.name || color?.color_name || color?.code || "";

  useEffect(() => {
    if (!photoUrl) {
      onAfterReady?.(FALLBACK_AFTER);
      return;
    }
    let cancelled = false;
    const run = async () => {
      if (!color?.code) return;
      setGenerating(true);
      setFailed(false);
      try {
        // Look up the full color chart entry (includes hex + system for texture)
        const chartColor = COLOR_DATA.find((c) => c.code === color.code) || {};
        const fullColor = { ...chartColor, ...color };

        // Composite the exact uploaded photo with the exact color chart color
        const dataUrl = await compositeFloorImage(photoUrl, fullColor);
        if (cancelled) return;
        setAfterUrl(dataUrl);

        // Upload the composite so the email gets a real URL (not a data URL)
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const { file_url } = await base44.integrations.Core.UploadFile({
            file: new File([blob], "floor-preview.jpg", { type: "image/jpeg" }),
          });
          if (!cancelled) onAfterReady?.(file_url);
        } catch {
          // Upload failed — still show the composite, just without a URL for email
          if (!cancelled) onAfterReady?.(dataUrl);
        }
      } catch {
        if (!cancelled) {
          setFailed(true);
          onAfterReady?.("");
        }
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
        <p className="text-sm">Rendering your garage with {colorName}…</p>
      </div>
    );
  }

  if (failed || !afterUrl) {
    return (
      <div className="text-center py-8 text-sm text-stone-500">
        We couldn't generate your preview right now, but your <strong>{colorName}</strong> selection is saved with your estimate.
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-stone-500 mb-4">Drag the slider to see your garage transformed with {colorName}.</p>
      <BeforeAfter beforeUrl={photoUrl} afterUrl={afterUrl} />
    </div>
  );
}