import React from "react";
import { ExternalLink, Layers, Wrench, Palette, Award, Boxes, Building2 } from "lucide-react";
import { FLOOR_SYSTEM_DATA, COLOR_DATA } from "@/lib/colorData";

const XPS_URL = "https://xtremepolishingsystems.com";

const BRANDS = [
  { name: "Rockhard", desc: "Industrial-grade epoxy, polyaspartic, and clear coat systems. The backbone of XPS floor coatings — Epic 100, USA, POLY, T200, T2000.", url: `${XPS_URL}/collections/epoxy-floor-coatings` },
  { name: "Torginol", desc: "Premium polymer flakes and quartz sand for broadcast floor systems. 150+ colors in In-Stock and Signature collections.", url: `${XPS_URL}/collections/epoxy-floor-coatings` },
  { name: "Kemiko", desc: "Stone Tone sealers and acid stain products for decorative concrete finishes.", url: `${XPS_URL}/products/kemiko-stone-tone-sealer-matte-1g` },
  { name: "Ameripolish", desc: "Concrete dyes and stains in 16+ colors for polished and stained concrete finishes.", url: `${XPS_URL}/collections/decorative-concrete-dyes-stains` },
  { name: "Xtreme Shield", desc: "Penetrating concrete sealers that protect against moisture, salts, and stains.", url: `${XPS_URL}/products/xtreme-shield-concrete-sealer` },
  { name: "Spal-Pro", desc: "Semi-rigid polyurea joint fillers for expansion joints and crack repair. 50+ color matches.", url: `${XPS_URL}/collections/decorative-concrete-dyes-stains` },
];

const EQUIPMENT_LINES = [
  { name: "Concrete Genie", desc: "Entry-level floor grinder — $7,995", url: `${XPS_URL}/products/concrete-floor-grinder-genie` },
  { name: "Genie X550", desc: "Diamond grinder with upgraded motor — $8,750", url: `${XPS_URL}/products/genie-550-concrete-floor-grinder` },
  { name: "Peanut Mammoth", desc: "Mid-size production grinder — $14,850", url: `${XPS_URL}/products/peanut-mammoth-floor-grinder` },
  { name: "Baby Mammoth 4-Head", desc: "Heavy-duty 4-head production machine — $23,500", url: `${XPS_URL}/products/baby-mammoth-concrete-floor-grinder` },
];

const COLOR_COLLECTIONS = [
  { name: "Liquid Metallic", system: "metallic", count: COLOR_DATA.filter((c) => c.collection === "Liquid Metallic").length },
  { name: "Powder Metallic", system: "metallic", count: COLOR_DATA.filter((c) => c.collection === "Powder Metallic").length },
  { name: "Flake — In-Stock", system: "flake", count: COLOR_DATA.filter((c) => c.collection === "In-Stock Collection").length },
  { name: "Flake — Signature", system: "flake", count: COLOR_DATA.filter((c) => c.collection === "Signature Collection").length },
  { name: "Quartz", system: "quartz", count: COLOR_DATA.filter((c) => c.system === "quartz").length },
  { name: "Glitter", system: "glitter", count: COLOR_DATA.filter((c) => c.system === "glitter").length },
  { name: "Dye Stain", system: "dye_stain", count: COLOR_DATA.filter((c) => c.system === "dye_stain").length },
  { name: "Joint Filler", system: "joint_filler", count: COLOR_DATA.filter((c) => c.system === "joint_filler").length },
];

export default function TrustSelection() {
  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="bg-stone-950 px-4 py-8 text-center">
        <Boxes className="h-10 w-10 text-amber-400 mx-auto mb-2" />
        <h1 className="text-2xl font-display font-extrabold text-white mb-2">Largest Selection in the Industry</h1>
        <p className="text-sm text-stone-400 max-w-xs mx-auto">
          11 floor systems, 6 brand families, 4 equipment lines, and 150+ colors — all from one trusted source.
        </p>
      </div>

      {/* Stats */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border-2 border-black p-3 text-center bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div className="text-2xl font-extrabold text-amber-600">{FLOOR_SYSTEM_DATA.length}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Floor Systems</div>
        </div>
        <div className="rounded-xl border-2 border-black p-3 text-center bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div className="text-2xl font-extrabold text-amber-600">{COLOR_DATA.length}+</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Colors</div>
        </div>
        <div className="rounded-xl border-2 border-black p-3 text-center bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div className="text-2xl font-extrabold text-amber-600">{BRANDS.length}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Brand Families</div>
        </div>
        <div className="rounded-xl border-2 border-black p-3 text-center bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div className="text-2xl font-extrabold text-amber-600">70+</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Locations</div>
        </div>
      </div>

      {/* Brand families */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-600" /> Brand Families
        </h2>
        <div className="space-y-2">
          {BRANDS.map((b) => (
            <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border-2 border-stone-200 p-3 bg-white hover:border-amber-400 transition">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-extrabold text-stone-900">{b.name}</div>
                <ExternalLink className="h-4 w-4 text-stone-400" />
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">{b.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* All floor systems */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
          <Layers className="h-5 w-5 text-amber-600" /> All Floor Systems
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {FLOOR_SYSTEM_DATA.map((s) => (
            <div key={s.slug} className="rounded-xl border-2 border-stone-200 p-3 bg-white">
              <div className="text-sm font-bold text-stone-900">{s.name}</div>
              <div className="text-[10px] text-stone-500 mt-0.5">{s.colors.length} colors</div>
              <div className="flex flex-wrap gap-0.5 mt-2">
                {s.colors.slice(0, 6).map((c) => (
                  <div key={c.code} className="h-4 w-4 rounded-full border border-stone-300" style={{ background: c.hex }} title={c.name} />
                ))}
                {s.colors.length > 6 && <span className="text-[10px] text-stone-400 ml-0.5">+{s.colors.length - 6}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment lines */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-amber-600" /> Equipment Lines
        </h2>
        <div className="space-y-2">
          {EQUIPMENT_LINES.map((e) => (
            <a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border-2 border-stone-200 p-3 bg-white hover:border-amber-400 transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-stone-900">{e.name}</div>
                  <div className="text-xs text-stone-500">{e.desc}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-stone-400" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Color collections */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
          <Palette className="h-5 w-5 text-amber-600" /> Color Collections
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_COLLECTIONS.map((c) => (
            <div key={c.name} className="rounded-xl border-2 border-stone-200 p-3 bg-white">
              <div className="text-sm font-bold text-stone-900">{c.name}</div>
              <div className="text-xs text-amber-600 font-semibold">{c.count} colors</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 mt-6">
        <a href={XPS_URL} target="_blank" rel="noopener noreferrer" className="xa-cta-gold">
          <Building2 className="h-4 w-4" /> Visit xtremepolishingsystems.com <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}