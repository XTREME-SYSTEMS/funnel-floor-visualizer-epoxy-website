import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageNav from "@/components/PageNav";
import BeforeAfter from "@/components/funnel/BeforeAfter";
import { FLOOR_SYSTEM_DATA } from "@/lib/colorData";

const BEFORE_AFTER = {
  "metallic-epoxy": [
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/31fc093d0_generated_image.png",
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/e72a48cd4_generated_image.png",
  ],
  "flake-epoxy": [
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/185de6337_generated_image.png",
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/7530bb8a0_generated_image.png",
  ],
  "solid-color-epoxy": [
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/99cb1d987_generated_image.png",
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/0b7879fa4_generated_image.png",
  ],
  "quartz-system": [
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/a0c2cff48_generated_image.png",
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/50cbce092_generated_image.png",
  ],
  "stained-concrete": [
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/40324643e_generated_image.png",
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/e2d970b3a_generated_image.png",
  ],
  "polished-concrete": [
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/a49ee4e7a_generated_image.png",
    "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/e3a6ff7cf_generated_image.png",
  ],
};

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
        subtitle="Every floor system we install — from classic flake to luxury metallic to polished concrete. Compare finishes, colors, and price ranges, then start your estimate."
      />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {FLOOR_SYSTEM_DATA.map((sys, i) => {
            const ba = BEFORE_AFTER[sys.slug];
            const reversed = i % 2 === 1;
            return (
              <div key={sys.slug} className="grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
                <div className={reversed ? "md:order-2" : ""}>
                  {ba ? (
                    <BeforeAfter beforeUrl={ba[0]} afterUrl={ba[1]} />
                  ) : (
                    <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white p-6">
                      <div className="grid grid-cols-5 gap-2">
                        {sys.colors.slice(0, 10).map((c) => (
                          <div
                            key={c.code}
                            className="aspect-square rounded-lg border border-stone-200"
                            style={{ background: c.hex }}
                            title={`${c.name} (${c.code})`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className={reversed ? "md:order-1" : ""}>
                  <span className="inline-block text-xs font-bold tracking-widest text-amber-500 uppercase">
                    {CATEGORY_LABEL[sys.category] || sys.category}
                  </span>
                  <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold tracking-tight text-stone-950">
                    {sys.name}
                  </h2>
                  <p className="mt-3 text-stone-600 leading-relaxed">{sys.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sys.finishes.map((f) => (
                      <span
                        key={f}
                        className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <div className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-2">
                      Available colors
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sys.colors.map((c) => (
                        <div
                          key={c.code}
                          className="flex items-center gap-2 bg-white border border-stone-200 rounded-full pl-1 pr-3 py-1"
                        >
                          <span
                            className="h-5 w-5 rounded-full border border-stone-200"
                            style={{ background: c.hex }}
                          />
                          <span className="text-xs font-medium text-stone-700">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 text-sm text-stone-500">
                    Typical range:{" "}
                    <span className="font-bold text-stone-900">
                      ${sys.base_rate_low.toFixed(2)}–${sys.base_rate_high.toFixed(2)}/sq ft
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center pt-8">
            <Link
              to="/funnel"
              className="inline-flex h-12 px-7 items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
            >
              Start my estimate <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}