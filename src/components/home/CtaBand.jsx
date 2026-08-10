import React from "react";
import { Link } from "react-router-dom";

export default function CtaBand({ settings }) {
  return (
    <section className="bg-amber-500 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-950">
          See your garage floor price range in about 60 seconds
        </h2>
        <p className="mt-3 text-stone-900/70">Free · No obligation · Final pricing confirmed after inspection</p>
        <Link to="/estimate" className="mt-8 inline-flex h-16 px-10 items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 font-bold tracking-wide">
          GET MY FREE ESTIMATE
        </Link>
        <p className="mt-6 text-sm text-stone-900/70">
          Serving {settings.service_area} · {settings.phone}
        </p>
      </div>
    </section>
  );
}