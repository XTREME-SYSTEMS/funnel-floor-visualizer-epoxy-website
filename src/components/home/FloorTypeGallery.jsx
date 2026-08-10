import React from "react";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const FLOOR_TYPES = [
  {
    name: "Flake Epoxy Floors",
    description: "Decorative vinyl flakes broadcast over epoxy for a textured, speckled finish that hides imperfections and adds grip.",
    before: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/185de6337_generated_image.png",
    after: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/7530bb8a0_generated_image.png"
  },
  {
    name: "Metallic Epoxy Floors",
    description: "Metallic pigments create swirling, three-dimensional depth for a one-of-a-kind luxury showroom finish.",
    before: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/31fc093d0_generated_image.png",
    after: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/e72a48cd4_generated_image.png"
  },
  {
    name: "Solid Color Epoxy Floors",
    description: "A clean, uniform coat in a single bold color for a sleek, modern and seamless garage surface.",
    before: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/99cb1d987_generated_image.png",
    after: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/0b7879fa4_generated_image.png"
  },
  {
    name: "Quartz Epoxy Floors",
    description: "Colored quartz granules fused with epoxy for a durable, slip-resistant and highly textured surface.",
    before: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/a0c2cff48_generated_image.png",
    after: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/50cbce092_generated_image.png"
  },
  {
    name: "Stained Concrete Floors",
    description: "Acid or water-based stains penetrate concrete for rich, mottled, natural stone-like tonal variation.",
    before: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/40324643e_generated_image.png",
    after: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/e2d970b3a_generated_image.png"
  },
  {
    name: "Polished Concrete Floors",
    description: "Mechanically ground and polished to a high-gloss mirror finish, revealing the natural aggregate within.",
    before: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/a49ee4e7a_generated_image.png",
    after: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/e3a6ff7cf_generated_image.png"
  }
];

export default function FloorTypeGallery() {
  return (
    <section id="floor-types" className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-amber-500 text-xs font-bold tracking-[0.25em] uppercase">Explore Your Options</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold tracking-tight text-stone-950">
            Garage Floor Finishes, Compared
          </h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            From flake to metallic to polished concrete — drag each slider to see the before and after transformation.
          </p>
        </div>
        <div className="grid gap-10 md:gap-14">
          {FLOOR_TYPES.map((f, i) => (
            <div key={f.name} className={`grid gap-6 md:gap-10 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}>
              <BeforeAfter beforeUrl={f.before} afterUrl={f.after} />
              <div>
                <span className="inline-block text-xs font-bold tracking-widest text-amber-500 uppercase">
                  {String(i + 1).padStart(2, "0")} / {String(FLOOR_TYPES.length).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-display font-bold tracking-tight text-stone-950">
                  {f.name}
                </h3>
                <p className="mt-3 text-stone-600 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}