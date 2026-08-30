import React from "react";
import { Star, MapPin, Award, Wallet, Building2 } from "lucide-react";

export default function TrustStrip({ settings }) {
  const reviewCount = settings.google_review_count || 5000;
  const formattedCount = reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1).replace(".0", "")}K+` : `${reviewCount}+`;
  return (
    <section className="bg-stone-950 border-y border-stone-800 py-5">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-stone-300">
        <span className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="font-bold text-white">{settings.google_rating}</span>
          <span>· {formattedCount} Google reviews</span>
        </span>
        <span className="hidden md:inline text-stone-700">|</span>
        <span className="flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-400" />
          <span className="font-semibold text-white">Lifetime Warranty</span>
          <span className="hidden sm:inline">against hot-tire pickup</span>
        </span>
        <span className="hidden md:inline text-stone-700">|</span>
        <span className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-amber-400" />
          <span className="font-semibold text-white">No Up-Front Deposit</span>
        </span>
        <span className="hidden md:inline text-stone-700">|</span>
        <span className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-amber-400" />
          <span className="font-semibold text-white">70+</span>
          <span>Locations Nationwide</span>
        </span>
        <span className="hidden md:inline text-stone-700">|</span>
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-amber-400" />
          Serving {settings.primary_city}, {settings.primary_state}
        </span>
      </div>
    </section>
  );
}