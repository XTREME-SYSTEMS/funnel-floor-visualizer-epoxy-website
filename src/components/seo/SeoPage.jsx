import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "@/lib/useSettings";
import { trackEvent } from "@/lib/tracking";
import { ChevronRight } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function SeoPage({ slug, title, metaDescription, h1, breadcrumbs, intro, sections, estimatorLabel = "GET MY FREE ESTIMATE", prefillSize }) {
  const { settings } = useSettings();

  useEffect(() => {
    trackEvent("page_view", { page: `/${slug}/` });
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", metaDescription);
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', `https://epoxygaragefloorestimate.com/${slug}/`);
  }, [slug, title, metaDescription]);

  const estimateLink = prefillSize ? `/funnel` : `/funnel`;

  return (
    <div className="bg-white">
      <header className="bg-stone-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton className="text-stone-300 hover:text-white" showLabel={false} />
            <Link to="/" className="font-semibold tracking-tight text-sm">{settings.company_name}</Link>
          </div>
          <a href={`tel:${settings.phone}`} className="text-sm text-stone-300">{settings.phone}</a>
        </div>
      </header>

      <nav className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          {breadcrumbs.map((b) => (
            <span key={b.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {b.href ? <Link to={b.href} className="hover:text-stone-900">{b.label}</Link> : <span className="text-stone-900 font-medium">{b.label}</span>}
            </span>
          ))}
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-stone-900">{h1}</h1>
        {intro && <p className="mt-5 text-lg text-stone-600 leading-relaxed">{intro}</p>}

        <div className="mt-8 rounded-2xl bg-stone-950 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">{estimatorLabel}</h2>
          <p className="mt-2 text-stone-400 text-sm">Get your personalized garage floor estimate in about 60 seconds.</p>
          <Link to={estimateLink} className="mt-5 inline-flex h-14 px-8 items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 font-bold tracking-wide">
            GET MY FREE ESTIMATE
          </Link>
          <p className="mt-3 text-xs text-stone-500">Free estimate • No obligation • Takes about 60 seconds</p>
        </div>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={i}>
              {s.h2 && <h2 className="text-2xl font-semibold tracking-tight text-stone-900">{s.h2}</h2>}
              {s.body && <div className="mt-3 text-stone-600 leading-relaxed space-y-3">{s.body}</div>}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((li, k) => (
                    <li key={k} className="flex gap-2 text-stone-600">
                      <span className="text-amber-500 shrink-0">•</span> <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.cards && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {s.cards.map((c, k) => (
                    <div key={k} className="rounded-xl border border-stone-200 p-5">
                      <div className="font-semibold text-stone-900">{c.t}</div>
                      <div className="mt-1 text-sm text-stone-500">{c.d}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-amber-50 border border-amber-200 p-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">See your garage floor cost now</h2>
          <p className="mt-2 text-stone-600">No phone call required. Get your personalized range in about 60 seconds.</p>
          <Link to={estimateLink} className="mt-5 inline-flex h-14 px-8 items-center justify-center rounded-xl bg-stone-950 hover:bg-stone-800 transition text-white font-bold tracking-wide">
            GET MY FREE ESTIMATE
          </Link>
        </div>

        <p className="mt-10 text-xs text-stone-500 leading-relaxed">{settings.disclaimer}</p>
      </article>

      <footer className="bg-stone-950 text-stone-400 py-10 px-6 text-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <div className="text-white font-semibold">{settings.company_name}</div>
            <div className="mt-1">{settings.phone} · {settings.email}</div>
            <div className="mt-1">{settings.service_area}</div>
          </div>
          <div className="flex flex-col gap-1 sm:items-end">
            <Link to="/epoxy-garage-floor-cost/" className="hover:text-white">Epoxy Garage Floor Cost</Link>
            <Link to="/2-car-garage-epoxy-cost/" className="hover:text-white">2-Car Garage Epoxy Cost</Link>
            <Link to="/3-car-garage-epoxy-cost/" className="hover:text-white">3-Car Garage Epoxy Cost</Link>
            <Link to="/garage-floor-coating-cost/" className="hover:text-white">Garage Floor Coating Cost</Link>
            <Link to="/fl/pompano-beach/" className="hover:text-white">Pompano Beach, FL</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}