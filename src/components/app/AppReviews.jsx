import React from "react";
import { Star, Quote } from "lucide-react";
import { useSettings } from "@/lib/useSettings";

export default function AppReviews() {
  const { settings } = useSettings();
  const rating = settings.google_rating || 4.4;
  const count = settings.google_review_count || 214;
  const testimonials = settings.testimonials || [];

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Google Reviews</h1>
      <p className="text-sm text-stone-500 mb-4">What our customers say about working with us.</p>

      {/* Rating summary */}
      <div className="rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 p-5 text-center mb-4">
        <div className="text-4xl font-extrabold text-white">{rating}★</div>
        <div className="flex items-center justify-center gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} className={`h-4 w-4 ${n <= Math.round(rating) ? "text-amber-500 fill-amber-500" : "text-stone-600"}`} />
          ))}
        </div>
        <div className="text-sm text-stone-400 mt-1">Based on {count} Google reviews</div>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {testimonials.map((t, i) => (
          <div key={i} className="rounded-2xl bg-white border border-stone-200 shadow-sm p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Quote className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-stone-900">{t.name}</div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`h-3 w-3 ${n <= (t.rating || 5) ? "text-amber-500 fill-amber-500" : "text-stone-300"}`} />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-stone-400">{t.location}</div>
                <p className="text-sm text-stone-700 mt-2 leading-relaxed">"{t.quote}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}