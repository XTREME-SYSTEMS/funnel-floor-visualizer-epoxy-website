import React from "react";
import { Star, MapPin, ShieldCheck } from "lucide-react";

export default function TrustStrip({ settings }) {
  return (
    <section className="bg-stone-950 border-y border-stone-800 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-stone-300">
        <span className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="font-semibold text-white">{settings.google_rating}</span>
          <span>Google rating</span>
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-amber-400" />
          Serving {settings.primary_city}, {settings.primary_state}
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-amber-400" />
          Professional installation
        </span>
      </div>
    </section>
  );
}