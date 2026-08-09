import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PopularStyles({ settings }) {
  const systems = (settings.systems || []).filter((s) => s.key !== "not_sure").slice(0, 4);
  return (
    <section className="bg-stone-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">Popular garage floor styles</h2>
        <p className="mt-3 text-stone-500">See the visual difference before you choose. All systems are available in multiple colors.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {systems.map((s) => (
            <div key={s.key} className="rounded-2xl overflow-hidden bg-white border border-stone-200">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.image_url} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-stone-900">{s.name}</h3>
                <p className="mt-1.5 text-sm text-stone-500 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/estimate" className="mt-10 inline-flex items-center gap-2 font-semibold text-stone-900 hover:gap-3 transition-all">
          See which finish fits your budget <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}