import React, { useState } from "react";
import { ExternalLink, Layers, Wrench, Droplet, Palette, Package } from "lucide-react";
import { FLOOR_SYSTEM_DATA, COLOR_DATA } from "@/lib/colorData";

const XPS_URL = "https://xtremepolishingsystems.com";

const EQUIPMENT = [
  { name: "Concrete Genie Floor Grinder", price: "$7,995", url: `${XPS_URL}/products/concrete-floor-grinder-genie`, img: `${XPS_URL}/cdn/shop/files/ProductImage_Equipment_Grinder_ConcreteGenie_03-09-26_01e232a5-397c-416f-bdc3-6f828a44d215.jpg?v=1773082566&width=600` },
  { name: "Genie X550 Diamond Grinder", price: "$8,750", url: `${XPS_URL}/products/genie-550-concrete-floor-grinder`, img: `${XPS_URL}/cdn/shop/files/ProductImage_Equipment_Grinder_ConcreteGenie_WHT_SML_aac400a4-128e-40cd-9090-b966d0839ce2.jpg?v=1773070734&width=600` },
  { name: "Peanut Mammoth Floor Grinder", price: "$14,850", url: `${XPS_URL}/products/peanut-mammoth-floor-grinder`, img: `${XPS_URL}/cdn/shop/products/peanut-mammoth-floor-grinder-967327.png?v=1690003051&width=600` },
  { name: "Baby Mammoth 4-Head Grinder", price: "$23,500", url: `${XPS_URL}/products/baby-mammoth-concrete-floor-grinder`, img: `${XPS_URL}/cdn/shop/products/baby-mammoth-4-head-floor-grinder-945896.jpg?v=1757100780&width=600` },
];

const COATINGS = [
  { name: "Rockhard T200 Clear Coat", price: "$159", desc: "1 Gal. sealer for concrete", url: `${XPS_URL}/products/rockhard-clear-coat-t200` },
  { name: "Rockhard T2000 Epoxy Clear Coat", price: "$109", desc: "77 Oz. metallic epoxy topcoat", url: `${XPS_URL}/products/rockhard-t2000` },
  { name: "Xtreme Shield Penetrating Sealer", price: "From $50", desc: "Concrete penetrating sealer", url: `${XPS_URL}/products/xtreme-shield-concrete-sealer` },
  { name: "Kemiko Stone Tone Sealer II", price: "From $68", desc: "Matte/Gloss concrete sealer", url: `${XPS_URL}/products/kemiko-stone-tone-sealer-matte-1g` },
  { name: "Epic 100 Epoxy Kit (3 Gal)", price: "$100", desc: "Limited time sale — was $150", url: `${XPS_URL}/products/rockhard-epic100` },
];

const TOOLING = [
  { name: "XPS Magnetic Plates", price: "From $315", url: `${XPS_URL}/products/xps-concrete-genie-magnetic-plates` },
  { name: "3\" Puck Velcro Adapter", price: "$19.80", url: `${XPS_URL}/products/velcro-puck-adapter` },
  { name: "Substrate Technology Magnetic Plates", price: "From $315", url: `${XPS_URL}/products/substrate-technology-magnetic-plates-3030-2807` },
  { name: "Magnetic Trap Adapter", price: "$26.40", url: `${XPS_URL}/products/xps-magnetic-trap-adapter` },
  { name: "Green Giant Grinding Trapezoid", price: "$79.20", url: `${XPS_URL}/products/green-giant-floor-grinding-trapezoid` },
  { name: "2-Segment Grinding Trapezoid", price: "$79.20", url: `${XPS_URL}/products/xps-grinding-trapezoid` },
  { name: "Redi Lock Husqvarna Trapezoid", price: "$79.20", url: `${XPS_URL}/products/ready-lock-grinding-trapezoid` },
  { name: "Lavina X Grinding Trapezoid", price: "$79.20", url: `${XPS_URL}/products/floor-grinding-trapezoid-lavina-x` },
];

const CATEGORIES = [
  { key: "systems", label: "Floor Systems", icon: Layers },
  { key: "equipment", label: "Equipment", icon: Wrench },
  { key: "coatings", label: "Coatings & Sealers", icon: Droplet },
  { key: "tooling", label: "Tooling", icon: Package },
];

const SYSTEM_CATEGORIES = [...new Set(FLOOR_SYSTEM_DATA.map((s) => s.category))];

export default function TrustProducts() {
  const [cat, setCat] = useState("systems");

  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="bg-stone-950 px-4 py-8 text-center">
        <h1 className="text-2xl font-display font-extrabold text-white mb-2">Commercial Grade Products</h1>
        <p className="text-sm text-stone-400 max-w-xs mx-auto">
          Professional-grade equipment, industrial coatings, and decorative concrete supplies — trusted by contractors nationwide for nearly 30 years.
        </p>
        <a href={XPS_URL} target="_blank" rel="noopener noreferrer" className="xa-cta-gold mt-4" style={{ maxWidth: 260, margin: "16px auto 0" }}>
          Shop All Products <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Category tabs */}
      <div className="px-4 mt-4 flex gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`flex-1 min-w-max py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${cat === c.key ? "bg-white shadow text-stone-900" : "text-stone-500"}`}
          >
            <c.icon className="h-3.5 w-3.5" />
            {c.label}
          </button>
        ))}
      </div>

      {/* Floor Systems */}
      {cat === "systems" && (
        <div className="px-4 mt-4 space-y-4">
          {SYSTEM_CATEGORIES.map((sysCat) => (
            <div key={sysCat}>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-2 capitalize">
                {sysCat.replace(/_/g, " ")} Systems
              </h3>
              <div className="space-y-2">
                {FLOOR_SYSTEM_DATA.filter((s) => s.category === sysCat).map((s) => (
                  <div key={s.slug} className="rounded-xl border-2 border-stone-200 p-3 bg-white">
                    <div className="text-sm font-bold text-stone-900">{s.name}</div>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{s.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {s.finishes.map((f) => (
                        <span key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{f}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-stone-500">{s.colors.length} colors available</span>
                      <a href={`${XPS_URL}/collections/${s.category === "epoxy" ? "epoxy-floor-coatings" : "decorative-concrete-dyes-stains"}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        Shop <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Equipment */}
      {cat === "equipment" && (
        <div className="px-4 mt-4 space-y-3">
          {EQUIPMENT.map((e) => (
            <a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border-2 border-stone-200 overflow-hidden bg-white hover:border-amber-400 transition">
              <div className="h-40 bg-stone-100">
                <img src={e.img} alt={e.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-stone-900">{e.name}</div>
                  <div className="text-sm font-extrabold text-amber-600">{e.price}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-stone-400" />
              </div>
            </a>
          ))}
          <a href={`${XPS_URL}/collections/grinding-polishing-machines`} target="_blank" rel="noopener noreferrer" className="xa-cta-gold">
            Shop All Machines <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {/* Coatings */}
      {cat === "coatings" && (
        <div className="px-4 mt-4 space-y-2">
          {COATINGS.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border-2 border-stone-200 p-3 bg-white hover:border-amber-400 transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-bold text-stone-900">{c.name}</div>
                  <div className="text-xs text-stone-500">{c.desc}</div>
                </div>
                <div className="text-sm font-extrabold text-amber-600 ml-2">{c.price}</div>
              </div>
            </a>
          ))}
          <a href={`${XPS_URL}/collections/epoxy-floor-coatings`} target="_blank" rel="noopener noreferrer" className="xa-cta-gold mt-2">
            Shop All Coatings <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {/* Tooling */}
      {cat === "tooling" && (
        <div className="px-4 mt-4 space-y-2">
          {TOOLING.map((t) => (
            <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border-2 border-stone-200 p-3 bg-white hover:border-amber-400 transition">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-stone-900 flex-1">{t.name}</div>
                <div className="text-sm font-extrabold text-amber-600 ml-2">{t.price}</div>
              </div>
            </a>
          ))}
          <a href={`${XPS_URL}/collections/decorative-concrete-dyes-stains`} target="_blank" rel="noopener noreferrer" className="xa-cta-gold mt-2">
            Shop All Tooling <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}