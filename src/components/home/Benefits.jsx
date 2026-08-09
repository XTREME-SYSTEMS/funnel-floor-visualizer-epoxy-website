import React from "react";
import { Sparkles, Brush, Palette, Timer } from "lucide-react";

const items = [
  { icon: Sparkles, t: "A finished-looking space", d: "A coated floor makes the garage feel like part of the home instead of storage." },
  { icon: Brush, t: "Easier to clean", d: "A sealed surface wipes down far more easily than bare concrete." },
  { icon: Palette, t: "Design choices", d: "Choose flake blends, metallics or solid colors to match your home." },
  { icon: Timer, t: "Professional installation", d: "Proper preparation and installation handled by an experienced crew." }
];

export default function Benefits() {
  return (
    <section className="bg-stone-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Why homeowners coat their garage</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((b) => (
            <div key={b.t}>
              <b.icon className="h-6 w-6 text-amber-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">{b.t}</h3>
              <p className="mt-2 text-sm text-stone-400 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}