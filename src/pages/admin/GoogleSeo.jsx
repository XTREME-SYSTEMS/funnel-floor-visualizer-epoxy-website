import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { SEO_ROUTES } from "@/lib/seoConfig";
import { RefreshCw, Sparkles, Rocket, CheckCircle2, AlertTriangle, Loader2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bustSeoOverrides } from "@/components/Seo";
import GoogleSetupWizard from "@/components/admin/GoogleSetupWizard";
import GoogleAutoVerifier from "@/components/admin/GoogleAutoVerifier";

export default function GoogleSeo() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState([]);
  const [busy, setBusy] = useState({ refresh: false, seed: false, opt: false, index: false });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const loadContent = async () => {
    try {
      const rows = await base44.entities.SeoContent.list(200);
      setContent(rows);
    } catch {}
  };
  useEffect(() => { loadContent(); }, []);

  const run = async (key, fnName, payload = {}) => {
    setBusy((b) => ({ ...b, [key]: true }));
    setError(""); setMsg("");
    try {
      const res = await base44.functions.invoke(fnName, payload);
      const d = res.data || res;
      if (d.error) throw new Error(d.error);
      if (key === "refresh") { setData(d); setMsg(d.siteUrl ? `Pulled data for ${d.siteUrl}` : "Done"); }
      if (key === "seed") setMsg("SEO content initialized from current config.");
      if (key === "opt") { setMsg(`AI optimized ${d.improved || 0} pages.`); bustSeoOverrides(); }
      if (key === "index") setMsg(`Submitted ${d.urls || 0} URLs to Bing, Yandex & IndexNow.`);
      await loadContent();
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
    setBusy((b) => ({ ...b, [key]: false }));
  };

  const seed = async () => {
    setBusy((b) => ({ ...b, seed: true }));
    setError(""); setMsg("");
    try {
      const existing = new Set(content.map((c) => c.route));
      const toCreate = [];
      for (const [route, cfg] of Object.entries(SEO_ROUTES)) {
        if (!existing.has(route)) {
          toCreate.push({ route, title: cfg.title, description: cfg.description, faq: cfg.faq || [], version: 1 });
        }
      }
      if (toCreate.length) await base44.entities.SeoContent.bulkCreate(toCreate);
      setMsg(`Initialized ${toCreate.length} pages (${existing.size} already existed).`);
      await loadContent();
    } catch (e) { setError(e.message); }
    setBusy((b) => ({ ...b, seed: false }));
  };

  const contentByRoute = Object.fromEntries(content.map((c) => [c.route, c]));
  const routesList = Object.keys(SEO_ROUTES);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-600" /> Google Search Console & AI SEO
        </h1>
        <p className="text-stone-500 mt-1 text-sm">
          Connect live Google data, let AI persistently optimize titles, descriptions & FAQ, and track your climb to page one.
        </p>
      </div>

      <GoogleAutoVerifier onVerified={() => run("refresh", "pullSearchConsoleData")} />
      <GoogleSetupWizard onVerified={() => run("refresh", "pullSearchConsoleData")} />

      {/* Action bar */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => run("refresh", "pullSearchConsoleData")} disabled={busy.refresh}>
          {busy.refresh ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Pull Google data
        </Button>
        <Button variant="outline" onClick={seed} disabled={busy.seed}>
          {busy.seed ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Rocket className="h-4 w-4 mr-2" />}
          Initialize SEO content
        </Button>
        <Button onClick={() => run("opt", "optimizeSeo")} disabled={busy.opt}>
          {busy.opt ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Run AI optimizer
        </Button>
        <Button variant="outline" onClick={() => run("index", "submitToIndexers")} disabled={busy.index}>
          {busy.index ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Rocket className="h-4 w-4 mr-2" />}
          Submit to indexers
        </Button>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {msg && !error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" /> {msg}
        </div>
      )}

      {/* Summary cards */}
      {data && data.totals && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Impressions (28d)" value={data.totals.impressions.toLocaleString()} />
          <Stat label="Clicks (28d)" value={data.totals.clicks.toLocaleString()} />
          <Stat label="Avg position" value={data.totals.avg_position || "—"} />
          <Stat label="Sitemap" value={data.sitemapSubmitted ? "submitted" : (data.sitemaps?.length ? "indexed" : "pending")} />
        </div>
      )}

      {/* Property / sitemap status */}
      {data && (
        <Card title="Search Console property">
          <Row label="Property" value={data.siteUrl} />
          <Row label="Sitemaps" value={data.sitemaps?.length ? data.sitemaps.map((s) => s.path).join(", ") : "none registered"} />
          <Row label="Last pull" value={new Date(data.pulledAt).toLocaleString()} />
        </Card>
      )}

      {/* Top queries */}
      {data?.topQueries?.length > 0 && (
        <Card title="Top queries (28 days)">
          <Table
            head={["Query", "Impressions", "Clicks", "Position", "CTR %"]}
            rows={data.topQueries.map((q) => [q.query, q.impressions, q.clicks, q.position, q.ctr])}
          />
        </Card>
      )}

      {/* URL inspection */}
      {data?.inspections?.length > 0 && (
        <Card title="URL inspection (priority pages)">
          <Table
            head={["Path", "Coverage", "Verdict", "Mobile", "Rich results"]}
            rows={data.inspections.map((i) => [i.path, i.coverage || i.error, i.verdict || "—", i.mobileUsability || "—", i.richResults ?? "—"])}
          />
        </Card>
      )}

      {/* SEO content + optimizer log */}
      <Card title={`SEO content & optimization log (${content.length})`}>
        <p className="text-xs text-stone-500 mb-3">
          AI-optimized overrides are applied live across the site. Pages with no record fall back to the static config.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-stone-500 border-b">
              <tr>
                <th className="py-2 pr-4">Route</th>
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Impr.</th>
                <th className="py-2 pr-4">Pos</th>
                <th className="py-2 pr-4">Ver</th>
                <th className="py-2 pr-4">Optimized</th>
              </tr>
            </thead>
            <tbody>
              {routesList.map((route) => {
                const c = contentByRoute[route];
                const perf = c?.performance_snapshot || {};
                return (
                  <tr key={route} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-mono text-xs">{route}</td>
                    <td className="py-2 pr-4 max-w-md truncate">{c?.title || SEO_ROUTES[route]?.title || "—"}</td>
                    <td className="py-2 pr-4">{perf.impressions ?? "—"}</td>
                    <td className="py-2 pr-4">{perf.avg_position ? perf.avg_position.toFixed(1) : "—"}</td>
                    <td className="py-2 pr-4">{c?.version ?? "—"}</td>
                    <td className="py-2 pr-4 text-xs text-stone-500">{c?.optimized_at ? new Date(c.optimized_at).toLocaleDateString() : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-stone-400">
        The optimizer runs automatically every Monday. First time? Click <b>Initialize SEO content</b>, then <b>Pull Google data</b>, then <b>Run AI optimizer</b>.
      </p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="text-xs text-stone-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h2 className="font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-1 text-sm border-b last:border-0">
      <span className="text-stone-500">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-stone-500 border-b">
          <tr>{head.map((h) => <th key={h} className="py-2 pr-4">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              {r.map((cell, j) => <td key={j} className="py-2 pr-4">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}