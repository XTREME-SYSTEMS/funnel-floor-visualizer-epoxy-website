import React from "react";
import { Link } from "react-router-dom";

export default function FinalCta({ settings }) {
  return (
    <section className="bg-amber-500 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-950">Ready to see your garage floor cost?</h2>
        <p className="mt-3 text-stone-900/80">It takes about 60 seconds. No obligation, no phone call required.</p>
        <Link to="/estimate" className="mt-8 inline-flex h-16 px-10 items-center justify-center rounded-xl bg-stone-950 hover:bg-stone-800 transition text-white text-base font-bold tracking-wide">
          GET MY FREE ESTIMATE
        </Link>
        <p className="mt-3 text-sm text-stone-900/70">Free estimate • No obligation • Takes about 60 seconds</p>
      </div>
    </section>
  );
}