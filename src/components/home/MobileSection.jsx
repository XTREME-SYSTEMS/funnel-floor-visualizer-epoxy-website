import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, Zap } from "lucide-react";

export default function MobileSection() {
  return (
    <section className="bg-stone-950 py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-bold tracking-[0.2em] text-amber-500">ROOFR ON MOBILE</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Don't wait to get back to your desk
          </h2>
          <p className="mt-4 text-stone-400 leading-relaxed">
            The estimator works perfectly from your phone, so homeowners can get their quote and you can qualify leads while you're out running jobs.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Send the link on-site or right after a call",
              "Strike while the iron's hot",
              "Qualify leads and win work faster"
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-stone-300">
                <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
          <Link to="/funnel" className="mt-8 inline-flex h-12 px-8 items-center rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold transition">
            Use it from your phone
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="relative w-64 h-[460px] rounded-[2.5rem] border-8 border-stone-800 bg-stone-900 overflow-hidden shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-6 bg-stone-900 flex items-center justify-center">
              <div className="h-1 w-12 rounded-full bg-stone-700" />
            </div>
            <div className="pt-10 px-4 pb-4 h-full flex flex-col">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 mb-3">
                  <Smartphone className="h-6 w-6 text-amber-500" />
                </div>
                <div className="text-white font-semibold text-sm">Get Your Estimate</div>
                <div className="text-stone-500 text-xs mt-1">Takes 60 seconds</div>
              </div>
              <div className="mt-5 space-y-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border border-stone-700 p-3">
                    <div className="h-2 w-20 bg-stone-600 rounded mb-2" />
                    <div className="h-2 w-28 bg-stone-700 rounded" />
                  </div>
                ))}
              </div>
              <div className="mt-auto h-12 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-sm">
                START
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}