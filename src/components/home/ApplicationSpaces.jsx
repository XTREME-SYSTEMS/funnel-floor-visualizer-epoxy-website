import React from "react";
import { Home, Trees, Building, Waves, Wrench, Warehouse, Footprints, Car } from "lucide-react";

const SPACES = [
  { icon: Car, title: "Garages", desc: "1, 2 & 3-car residential garages" },
  { icon: Trees, title: "Patios & Porches", desc: "Exterior concrete patios and porches" },
  { icon: Home, title: "Basements", desc: "Unfinished basements and workshops" },
  { icon: Warehouse, title: "Workshops", desc: "Home workshops and hobby spaces" },
  { icon: Building, title: "Commercial", desc: "Warehouses, retail, offices, medical" },
  { icon: Waves, title: "Pool Decks", desc: "UV-stable coatings for pool surrounds" },
  { icon: Footprints, title: "Walkways", desc: "Slip-resistant walkway coatings" },
  { icon: Wrench, title: "Storage Units", desc: "Self-storage and industrial facilities" },
];

export default function ApplicationSpaces() {
  return (
    <section className="bg-stone-50 py-20 px-6 border-y border-stone-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm font-bold tracking-[0.2em] text-amber-600 uppercase">More Than Just Garages</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">
            We Coat Every Concrete Surface
          </h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Our industrial-grade epoxy, polyaspartic, and polyurea coating systems aren't just for garage floors.
            We transform any concrete surface — inside or outside your home or business — with the same
            manufacturer-grade materials and lifetime-backed installation.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SPACES.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white border border-stone-200 p-6 text-center hover:border-amber-400 hover:shadow-md transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 mb-3">
                <s.icon className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">{s.title}</h3>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}