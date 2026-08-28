import React, { useEffect, useState } from "react";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { COLOR_DATA } from "@/lib/colorData";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const FALLBACK_BEFORE = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/2fa2f386d_generated_image.png";
const FALLBACK_AFTER = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/b2326e50a_generated_image.png";

// Maps the internal system key to a descriptive floor-system name for the
// AI prompt so the generated image matches the real product.
const SYSTEM_LABELS = {
  flake: "decorative vinyl-flake epoxy",
  metallic: "metallic epoxy",
  solid: "solid-color epoxy",
  quartz: "quartz epoxy",
  glitter: "metallic-glitter epoxy",
  dye_stain: "polished and dyed concrete",
  joint_filler: "joint-filled epoxy",
};

// Renders the user's uploaded garage photo with their chosen floor color
// applied via AI image generation. The original photo is passed as a
// reference image so the room geometry, walls, and lighting are preserved.
// The generated image URL is passed back via onAfterReady for email.
export default function ResultVisualizer({ photoUrl, color, onAfterReady }) {
  const [afterUrl, setAfterUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [failed, setFailed] = useState(false);

  const colorName = color?.name || color?.color_name || color?.code || "";
  const systemKey = color?.system || "flake";
  const systemLabel = SYSTEM_LABELS[systemKey] || "decorative epoxy";

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
      setAfterUrl("");
      try {
        // Look up the full color chart entry for the exact color name
        const chartColor = COLOR_DATA.find((c) => c.code === color.code) || {};
        const fullColorName = chartColor.color_name || colorName;

        const prompt =
          `Photorealistic rendering of this garage interior with a newly installed ${systemLabel} floor ` +
          `in the color "${fullColorName}". The floor has a seamless, professional concrete coating finish ` +
          `with a high-gloss wet-look sheen. Same garage geometry, walls, garage door, and lighting as the ` +
          `original photo. High-end real-estate photography, wide angle, natural light. The floor surface ` +
          `is the only change — walls and ceiling remain identical to the original.`;

        const res = await base44.integrations.Core.GenerateImage({
          prompt,
          existing_image_urls: [photoUrl],
        });

        if (cancelled) return;
        const generatedUrl = res?.url || "";
        setAfterUrl(generatedUrl);
        onAfterReady?.(generatedUrl || "");
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
        <div className="relative">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
        </div>
        <p className="text-sm font-medium flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Rendering your garage with {colorName}…
        </p>
        <p className="text-xs text-stone-400">This takes about 10 seconds</p>
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