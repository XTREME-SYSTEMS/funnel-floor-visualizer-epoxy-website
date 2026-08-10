import React from "react";
import { cn } from "@/lib/utils";

// Renders a manufacturer swatch. When `src` (image URL) is provided, the real
// swatch photo is shown zoomed + top-anchored so the bottom "IN STOCK" tag is
// clipped out (no distortion). When there is no photo (e.g. joint filler,
// which only ships as named variants), it falls back to a clean color block
// built from the exact `hex` value with a subtle gloss highlight.
export default function SwatchImg({ src, hex, alt, wrapperClassName = "" }) {
  if (src) {
    return (
      <div
        className={cn("overflow-hidden bg-stone-100", wrapperClassName)}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "auto 138%",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label={alt}
      />
    );
  }
  return (
    <div
      className={cn("relative", wrapperClassName)}
      style={{ backgroundColor: hex }}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.20), transparent 60%)" }}
      />
    </div>
  );
}