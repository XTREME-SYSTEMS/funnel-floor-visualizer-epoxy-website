import React, { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { compositeFloorImage } from "@/lib/floorComposite";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const FALLBACK_BEFORE = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/2fa2f386d_generated_image.png";
const FALLBACK_AFTER = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/b2326e50a_generated_image.png";

// Renders the user's uploaded garage photo with their chosen floor color
// applied via deterministic canvas compositing. The exact color chart hex
// value is used to generate a procedural flake/metallic/solid texture that
// is overlaid on the floor region of the original photo. This guarantees
// the floor visibly changes to the selected color every time.
export default function ResultVisualizer({ photoUrl, color, onAfterReady }) {
  const [afterUrl, setAfterUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [failed, setFailed] = useState(false);

  const colorName = color?.name || color?.color_name || color?.code || "";

  useEffect(() => {
    if (!photoUrl) {
      onAfterReady?.(FALLBACK_AFTER);
      return;
    }
    let cancelled = false;
    const run = async () => {
      if (!color?.hex) return;
      setProcessing(true);
      setFailed(false);
      setAfterUrl("");
      try {
        const dataUrl = await compositeFloorImage(photoUrl, color);
        if (cancelled) return;
        setAfterUrl(dataUrl);
        onAfterReady?.(dataUrl);
      } catch {
        if (!cancelled) {
          setFailed(true);
          onAfterReady?.("");
        }
      } finally {
        if (!cancelled) setProcessing(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [photoUrl, color?.hex]);

  // No uploaded photo — show the generic showcase transformation.
  if (!photoUrl) {
    return <BeforeAfter beforeUrl={FALLBACK_BEFORE} afterUrl={FALLBACK_AFTER} />;
  }

  if (processing) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-stone-500">
        <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
        <p className="text-sm font-medium">Applying {colorName} to your garage floor…</p>
      </div>
    );
  }

  if (failed || !afterUrl) {
    return (
      <div className="text-center py-8 px-4">
        <AlertCircle className="h-8 w-8 text-stone-400 mx-auto mb-2" />
        <p className="text-sm text-stone-500">
          We couldn't generate your preview right now, but your <strong>{colorName}</strong> selection is saved with your estimate.
        </p>
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