import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageNav from "@/components/PageNav";
import PageHero from "@/components/PageHero";
import { Image } from "@/components/ui/image";
import { FLOOR_SYSTEM_DATA } from "@/lib/colorData";
import { GALLERY_IMAGES } from "@/lib/galleryImages";
import Footer from "@/components/home/Footer";

const CATEGORY_LABEL = {
  epoxy: "Epoxy Coatings",
  specialty: "Specialty Systems",
  polished_concrete: "Polished Concrete",
  decorative_concrete: "Decorative Concrete",
  coating: "Protective Coatings",
};

export default function Gallery() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageNav />
      <PageHero
        eyebrow="Explore Our Floor Systems"
        title="Gallery"
        subtitle="Real, ultra-lifelike finishes for every system we install — from classic flake to luxury metallic to polished concrete. Compare looks, then start your estimate."
      />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {GALLERY_IMAGES.map((g) => {
            const sys = FLOOR_SYSTEM_DATA.find((s) => s.slug === g.slug) || {};
            return (
              <div key={g.slug}>
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                  <div className="max-w-2xl">
                    <span className="inline-block text-xs font-bold tracking-widest text-amber-500 uppercase">
                      {CATEGORY_LABEL[sys.category] || sys.category || ""}
                    </span>
                    <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold tracking-tight text-stone-950">
                      {sys.name || g.slug}
                    </h2>
                    {sys.description && (
                      <p className="mt-2 text-stone-600 leading-relaxed">{sys.description}</p>
                    )}
                  </div>
                  <div className="text-sm text-stone-500">
                    Typical range:{" "}
                    <span className="font-bold text-stone-900">
                      ${Number(sys.base_rate_low || 0).toFixed(2)}–$
                      {Number(sys.base_rate_high || 0).toFixed(2)}/sq ft
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {g.images.map((img, i) => (
                    <figure key={i} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                        <Image
                          src={img.url}
                          alt={`${sys.name || g.slug} — ${img.caption}`}
                          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                          fittingType="fill"
                        />
                      </div>
                      <figcaption className="mt-1.5 text-xs font-medium text-stone-500">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {sys.finishes && sys.finishes.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {sys.finishes.map((f) => (
                      <span
                        key={f}
                        className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="text-center pt-4">
            <Link
              to="/funnel"
              className="inline-flex h-12 px-7 items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
            >
              Start my estimate <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}