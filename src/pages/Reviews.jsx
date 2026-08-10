import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useSettings } from "@/lib/useSettings";

export default function Reviews() {
  const { settings, isLoading } = useSettings();
  const rating = settings.google_rating ? Number(settings.google_rating).toFixed(1) : null;
  const count = settings.google_review_count || null;
  const testimonials = settings.testimonials || [];
  const reviewUrl =
    settings.seo?.review_url || "https://xtremepolishingsystems.com/pages/customer-testimonials";

  return (
    <div className="min-h-screen bg-stone-50">
      <PageHero
        eyebrow="Real Homeowners, Real Floors"
        title="Reviews"
        subtitle="See what homeowners say about working with us — then start your own estimate."
      >
        {rating && (
          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 px-6 py-4">
            <div className="text-5xl font-extrabold text-white">{rating}</div>
            <div className="text-left">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div className="mt-1 text-sm text-stone-300">
                {count ? `${count}+ Google reviews` : "Google reviews"}
              </div>
            </div>
          </div>
        )}
      </PageHero>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {testimonials.length === 0 && !isLoading ? (
            <p className="text-center text-stone-500">Reviews loading…</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="rounded-2xl bg-white border border-stone-200 p-6 flex flex-col"
                >
                  <div className="flex mb-3">
                    {Array.from({ length: t.rating || 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-stone-700 leading-relaxed flex-1">"{t.quote}"</p>
                  <footer className="mt-4 text-sm text-stone-500">
                    {t.name}
                    {t.location ? ` · ${t.location}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}

          <div className="mt-12 text-center space-y-4">
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 px-6 items-center gap-2 rounded-xl border border-stone-300 text-stone-900 font-semibold hover:border-stone-900 transition"
            >
              Read more reviews <ExternalLink className="h-4 w-4" />
            </a>
            <div>
              <Link
                to="/funnel"
                className="inline-flex h-12 px-7 items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
              >
                Start my estimate <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}