import React from "react";
import { Star } from "lucide-react";

export default function Reviews({ settings }) {
  const items = settings.testimonials || [];
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">What homeowners say</h2>
          <div className="flex items-center gap-2 text-stone-600">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-sm font-medium">{settings.google_rating} · {settings.google_review_count} reviews</span>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <blockquote key={i} className="rounded-2xl border border-stone-200 p-6">
              <div className="flex mb-3">
                {Array.from({ length: t.rating || 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-stone-700 leading-relaxed">"{t.quote}"</p>
              <footer className="mt-4 text-sm text-stone-500">{t.name} · {t.location}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}