import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/galleryImages";

const CATEGORIES = [
  { key: "flake-epoxy", label: "Epoxy Garages" },
  { key: "metallic-epoxy", label: "Metallic Showrooms" },
  { key: "solid-color-epoxy", label: "Commercial Coatings" },
  { key: "quartz-system", label: "Warehouses" },
  { key: "polished-concrete", label: "Polished Concrete" },
  { key: "stained-concrete", label: "Stained Concrete" }
];

export default function AppGallery() {
  const [active, setActive] = useState("flake-epoxy");
  const [lightbox, setLightbox] = useState(null);

  const current = GALLERY_IMAGES.find((g) => g.slug === active) || GALLERY_IMAGES[0];

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Project Gallery</h1>
      <p className="text-sm text-stone-500 mb-4">Real epoxy, metallic, and polished concrete work from our portfolio.</p>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition ${active === c.key ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="grid grid-cols-2 gap-3">
        {current.images.map((img, i) => (
          <button key={i} onClick={() => setLightbox(img)} className="rounded-xl overflow-hidden bg-stone-100 border border-stone-200 group">
            <div className="aspect-square relative">
              <Image src={img.url} alt={img.caption} fittingType="fill" className="h-full w-full group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-2">
              <div className="text-[11px] font-medium text-stone-700 truncate">{img.caption}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="max-w-lg w-full">
            <Image src={lightbox.url} alt={lightbox.caption} className="w-full rounded-xl" />
            <p className="text-sm text-white text-center mt-3">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}