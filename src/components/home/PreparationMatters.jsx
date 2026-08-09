import React from "react";
import { Link } from "react-router-dom";

const steps = [
  { n: 1, t: "Surface preparation", d: "Concrete is mechanically ground or shot-blasted to open the surface and remove contamination." },
  { n: 2, t: "Crack and joint repair", d: "Cracks, spalling, and control joints are addressed before any coating goes down." },
  { n: 3, t: "Primer and base coat", d: "A primer bonds to the concrete, followed by the base coat that carries the color or flake." },
  { n: 4, t: "Flake or finish application", d: "Decorative flake, metallic pigment, or solid color is applied for the chosen look." },
  { n: 5, t: "Topcoat", d: "A clear or pigmented topcoat seals the system and provides the final wear surface." }
];

export default function PreparationMatters() {
  return (
    <section className="bg-stone-950 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Why floor preparation matters</h2>
        <p className="mt-3 text-stone-400 max-w-2xl">A garage floor coating is only as good as the preparation underneath it. Skipping prep is the most common reason coatings fail.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-stone-900 border border-stone-800 p-6">
              <div className="h-8 w-8 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-sm">{s.n}</div>
              <h3 className="mt-4 font-semibold text-white">{s.t}</h3>
              <p className="mt-1.5 text-sm text-stone-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <Link to="/estimate" className="mt-10 inline-flex h-14 px-8 items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 font-bold tracking-wide">
          GET MY FREE ESTIMATE
        </Link>
      </div>
    </section>
  );
}