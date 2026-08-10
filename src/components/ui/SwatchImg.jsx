import React from "react";
import { cn } from "@/lib/utils";

// Renders the real manufacturer swatch image but zooms it ~38% and anchors to
// the top so the bottom edge (where the "IN STOCK" tag sits) is clipped out.
// Uses background-image (not an <img> transform) so the crop always renders
// and the image keeps its aspect ratio (no vertical stretch). For square
// swatch containers.
export default function SwatchImg({ src, alt, wrapperClassName = "" }) {
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