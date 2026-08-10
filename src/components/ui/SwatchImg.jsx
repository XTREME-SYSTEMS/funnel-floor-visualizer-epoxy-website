import React from "react";
import { cn } from "@/lib/utils";

// Renders a manufacturer color swatch with the bottom edge cropped to hide
// the "IN STOCK" tag baked into the source images. Uses a vertical scale
// transform (not percentage height) so the crop always renders, regardless
// of how the parent's height is resolved. The color itself is unchanged.
//
// wrapperClassName: sizes the visible box (set height / aspect-ratio here);
//                   hover zoom can go here (it scales the clipped wrapper).
// imgClassName:     applied to the inner <img> — do NOT add scale utilities
//                   here (they conflict with the crop transform).
export default function SwatchImg({ src, alt, wrapperClassName = "", imgClassName = "" }) {
  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("block h-full w-full object-cover object-top scale-y-[1.33] origin-top", imgClassName)}
      />
    </div>
  );
}