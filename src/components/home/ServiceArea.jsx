import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const cities = ["Pompano Beach", "Deerfield Beach", "Lighthouse Point", "Coconut Creek", "Coral Springs", "Parkland", "Boca Raton", "Fort Lauderdale"];

export default function ServiceArea({ settings }) {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">Serving Pompano Beach & South Florida</h2>
        <p className="mt-3 text-stone-500 max-w-2xl">
          We provide garage floor coating estimates across South Florida. If you're researching epoxy flooring in the Pompano Beach area, our instant estimator gives you a personalized price range before you talk to anyone.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {cities.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 text-sm bg-stone-100 text-stone-700 px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5 text-amber-500" /> {c}, FL
            </span>
          ))}
        </div>
        <Link to="/fl/pompano-beach/" className="mt-8 inline-block font-semibold text-stone-900 underline">
          Learn more about epoxy garage floors in Pompano Beach
        </Link>
      </div>
    </section>
  );
}