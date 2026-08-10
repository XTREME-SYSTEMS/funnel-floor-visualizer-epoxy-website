import React from "react";
import { cn } from "@/lib/utils";

// Renders a manufacturer color swatch with the bottom edge cropped to hide
// the "IN STOCK" tag baked into the source images. The crop is purely visual
// (overflow clip) — the color itself is unchanged.
//
// wrapperClassName: sizes the visible box (set height / aspect-ratio here)
// imgClassName:    applied to the inner <img> (e.g. hover scale)
export default function SwatchImg({ src, alt, wrapperClassName = "", imgClassName = "" }) {
  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("block w-full h-[118%] object-cover object-top", imgClassName)}
      />
    </div>
  );
}