import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const CHART_URL = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/108afbd51_xps-top-flake-colors-approved.webp";

const SHOWCASE = [
  { url: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/37f839d5d_generated_image.png", name: "Gravel", code: "FB-414", desc: "Gray / Black / White" },
  { url: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/0df228a3a_generated_image.png", name: "Outback", code: "FB-517", desc: "Earth tones" },
  { url: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/daa85fba2_generated_image.png", name: "Rapids", code: "FB-506", desc: "Blue / Gray / White" }
];

export default function FlakeShowcase() {
  return (
    <section className="bg-stone-50 py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-amber-500">PREMIUM FLAKE FINISHES</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-stone-900">
            Garage flake floors
          </h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Choose from the top 12 market-popular flake blends, cross-checked against XPS/Torginol color availability. Here are three of our most popular finishes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SHOWCASE.map((s) => (
            <div key={s.code} className="group rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md transition">
              <div className="relative h-56 overflow-hidden">
                <Image src={s.url} alt={`${s.name} flake floor`} fittingType="fill" className="h-full w-full group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest bg-stone-950/80 text-white px-2 py-1 rounded">{s.code}</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-stone-900">{s.name}</h3>
                <p className="text-sm text-stone-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm">
          <Image src={CHART_URL} alt="XPS Top 12 Epoxy Flake Colors reference chart" fittingType="fit" className="w-full" />
        </div>

        <div className="mt-8 text-center">
          <Link to="/funnel" className="inline-flex h-12 px-8 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition">
            Use the floor visualizer <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}