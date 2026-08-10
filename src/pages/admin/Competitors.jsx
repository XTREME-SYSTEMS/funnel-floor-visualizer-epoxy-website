import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, RefreshCw, ExternalLink, TrendingUp, Link2, DollarSign } from "lucide-react";

export default function Competitors() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.CompetitorInsight.list("-created_date", 200);
      setInsights(Array.isArray(data) ? data : []);
    } catch {
      setInsights([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const runScan = async () => {
    setRunning(true);
    try {
      await base44.functions.invoke("scanCompetitors", { mode: "full" });
      await load();
    } catch {}
    setRunning(false);
  };

  const competitors = insights.filter((i) => i.type === "competitor");
  const backlinks = insights.filter((i) => i.type === "backlink_opportunity");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Competitor &amp; Backlink Intel</h1>
          <p className="text-stone-500 mt-1 text-sm">
            Auto-scanned weekly. Competitor pricing, USPs, content gaps, and backlink opportunities for our parent companies.
          </p>
        </div>
        <button
          onClick={runScan}
          disabled={running}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-stone-950 text-sm font-bold"
        >
          {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {running ? "Scanning…" : "Run scan now"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <Stat icon={TrendingUp} label="Competitors tracked" value={competitors.length} />
        <Stat icon={Link2} label="Backlink opportunities" value={backlinks.length} />
        <Stat icon={DollarSign} label="Last scan" value={insights[0] ? new Date(insights[0].created_date).toLocaleDateString() : "—"} />
        <Stat icon={RefreshCw} label="Cadence" value="Weekly" />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-stone-900 mb-4">Competitors</h2>
        {loading ? (
          <div className="p-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-stone-400" /></div>
        ) : competitors.length === 0 ? (
          <div className="p-8 rounded-2xl border border-stone-200 bg-white text-center text-stone-500 text-sm">
            No competitor scans yet. Click <strong>Run scan now</strong> to populate.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {competitors.map((c) => (
              <div key={c.id} className="rounded-2xl border border-stone-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-stone-900">{c.competitor_name}</h3>
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-600 hover:underline mt-0.5">
                        {c.url} <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {(c.price_per_sqft_low || c.price_per_sqft_high) ? (
                    <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-full bg-stone-100 text-stone-700">
                      ${c.price_per_sqft_low ?? "?"}–${c.price_per_sqft_high ?? "?"}/sq ft
                    </span>
                  ) : null}
                </div>
                {c.summary && <p className="mt-3 text-sm text-stone-600 leading-relaxed">{c.summary}</p>}
                {c.services?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.services.map((s, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">{s}</span>
                    ))}
                  </div>
                )}
                <Detail label="Strengths" value={c.strengths} />
                <Detail label="Weaknesses" value={c.weaknesses} />
                <Detail label="Content gaps" value={c.content_gaps} />
                {c.backlink_targets?.length > 0 && (
                  <div className="mt-3">
                    <div className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">Backlink targets</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {c.backlink_targets.map((b, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{b}</span>
                      ))}
                    </div>
                  </div>
                )}
                <Detail label="Recommendation" value={c.recommendation} accent />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-stone-900 mb-4">Backlink Opportunities (Parent Companies)</h2>
        {loading ? (
          <div className="p-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-stone-400" /></div>
        ) : backlinks.length === 0 ? (
          <div className="p-8 rounded-2xl border border-stone-200 bg-white text-center text-stone-500 text-sm">
            No backlink research yet. Click <strong>Run scan now</strong> to populate.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {backlinks.map((b) => (
              <div key={b.id} className="rounded-2xl border border-stone-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-stone-900">{b.competitor_name}</h3>
                  {b.strengths && <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-800">{b.strengths}</span>}
                </div>
                {b.url && (
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-600 hover:underline mt-0.5">
                    {b.url} <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {b.summary && <p className="mt-3 text-sm text-stone-600 leading-relaxed">{b.summary}</p>}
                <Detail label="Recommended action" value={b.recommendation} accent />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5">
      <Icon className="h-5 w-5 text-amber-500" />
      <div className="mt-2 text-xl font-bold text-stone-900">{value}</div>
      <div className="text-xs text-stone-500">{label}</div>
    </div>
  );
}

function Detail({ label, value, accent }) {
  if (!value) return null;
  return (
    <div className="mt-3">
      <div className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">{label}</div>
      <p className={`mt-0.5 text-sm leading-relaxed ${accent ? "text-stone-900 font-medium" : "text-stone-600"}`}>{value}</p>
    </div>
  );
}