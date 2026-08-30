import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useSettings } from "@/lib/useSettings";
import { trackEvent } from "@/lib/tracking";
import { ChevronRight } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";
import PageNotFound from "@/lib/PageNotFound";
import Footer from "@/components/home/Footer";

export default function GeneratedPageView() {
  const { slug } = useParams();
  const { settings } = useSettings();
  const [page, setPage] = useState(null);
  const [relatedPages, setRelatedPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    base44.entities.GeneratedPage.filter({ slug, status: "published" })
      .then((rows) => {
        setPage(rows[0] || null);
        if (rows[0]) trackEvent("page_view", { page: `/${slug}` });
      })
      .catch(() => setPage(null))
      .finally(() => setLoading(false));

    // Fetch related guides for internal linking (excludes current page, max 4)
    base44.entities.GeneratedPage.list(20)
      .then((rows) => {
        setRelatedPages(rows.filter((g) => g.slug !== slug && g.status !== "draft").slice(0, 4));
      })
      .catch(() => setRelatedPages([]));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
      </div>
    );
  }
  if (!page) return <PageNotFound />;

  return (
    <div className="bg-white">
      <header className="bg-stone-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton className="text-stone-300 hover:text-white" showLabel={false} />
            <Logo />
          </div>
          <a href={`tel:${settings.phone}`} className="text-sm text-stone-300">{settings.phone}</a>
        </div>
      </header>

      <nav className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/guides" className="hover:text-stone-900">Guides</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-stone-900 font-medium">{page.h1}</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-stone-900">{page.h1}</h1>
        {page.intro && <p className="mt-5 text-lg text-stone-600 leading-relaxed">{page.intro}</p>}

        <div className="mt-8 rounded-2xl bg-stone-950 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">GET MY FREE ESTIMATE</h2>
          <p className="mt-2 text-stone-400 text-sm">Get your personalized garage floor estimate in about 60 seconds.</p>
          <Link to="/funnel" className="mt-5 inline-flex h-14 px-8 items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 font-bold tracking-wide">
            GET MY FREE ESTIMATE
          </Link>
          <p className="mt-3 text-xs text-stone-500">Free estimate • No obligation • Takes about 60 seconds</p>
        </div>

        <div className="mt-12 space-y-10">
          {(page.sections || []).map((s, i) => (
            <section key={i}>
              {s.h2 && <h2 className="text-2xl font-semibold tracking-tight text-stone-900">{s.h2}</h2>}
              {s.body && (
                <div className="mt-3 text-stone-600 leading-relaxed space-y-3">
                  {s.body.map((p, k) => <p key={k}>{p}</p>)}
                </div>
              )}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((li, k) => (
                    <li key={k} className="flex gap-2 text-stone-600">
                      <span className="text-amber-500 shrink-0">•</span> <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {(page.faq && page.faq.length > 0) && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Frequently asked questions</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {page.faq.map((f, i) => (
                <div key={i} className="rounded-xl border border-stone-200 p-5">
                  <div className="font-semibold text-stone-900">{f.q}</div>
                  <div className="mt-1 text-sm text-stone-500 leading-relaxed">{f.a}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedPages.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Related guides</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedPages.map((g) => (
                <Link key={g.id} to={`/${g.slug}`} className="group rounded-xl border border-stone-200 p-5 hover:border-amber-300 hover:bg-amber-50/40 transition">
                  <div className="font-semibold text-stone-900 group-hover:text-amber-700">{g.title}</div>
                  {g.meta_description && <div className="mt-1 text-sm text-stone-500 line-clamp-2">{g.meta_description}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-2xl bg-amber-50 border border-amber-200 p-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">See your garage floor cost now</h2>
          <p className="mt-2 text-stone-600">No phone call required. Get your personalized range in about 60 seconds.</p>
          <Link to="/funnel" className="mt-5 inline-flex h-14 px-8 items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 font-bold tracking-wide">
            GET MY FREE ESTIMATE
          </Link>
        </div>

        <p className="mt-10 text-xs text-stone-500 leading-relaxed">{settings.disclaimer}</p>
      </article>

      <Footer />
    </div>
  );
}