import React from "react";
import { cn } from "@/lib/utils";

// Renders a clean color swatch from the exact manufacturer hex value — no
// remote image, so there is no "IN STOCK" tag. A subtle gloss overlay gives
// it the look of a finish sample without changing the color.
export default function SwatchImg({ hex, alt, wrapperClassName = "" }) {
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