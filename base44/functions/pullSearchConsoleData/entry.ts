import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";
import { logStep } from "../../shared/sopLog.ts";

const SITE = "https://epoxygaragefloorestimate.com";
const PRIORITY_PATHS = [
  "/",
  "/epoxy-garage-floor-cost",
  "/2-car-garage-epoxy-cost",
  "/3-car-garage-epoxy-cost",
  "/garage-floor-coating-cost",
  "/how-it-works",
  "/gallery",
  "/fl/pompano-beach",
];

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_search_console");
    const headers = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    // 1. Find our Search Console property
    const sitesRes = await fetch("https://www.googleapis.com/webmasters/v3/sites", { headers });
    const sitesData = await sitesRes.json();
    if (!sitesRes.ok) return Response.json({ error: "Search Console sites list failed", detail: sitesData }, { status: 502 });
    const sites = sitesData.siteEntry || [];
    const match = sites.find((s) => s.siteUrl.toLowerCase().includes("epoxygaragefloorestimate")) || sites[0];
    if (!match) {
      return Response.json({
        error: "No Search Console property found for this domain. Add and verify the property at https://search.google.com/search-console first, then refresh.",
      }, { status: 404 });
    }
    const siteUrl = match.siteUrl;
    const enc = encodeURIComponent(siteUrl);

    // 2. Search analytics — last 28 days
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 27);
    const fmt = (d) => d.toISOString().slice(0, 10);

    const [pageRes, queryRes] = await Promise.all([
      fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/searchAnalytics/query`, {
        method: "POST", headers,
        body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions: ["page"], rowLimit: 100 }),
      }),
      fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/searchAnalytics/query`, {
        method: "POST", headers,
        body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions: ["query"], rowLimit: 50 }),
      }),
    ]);
    const pageData = await pageRes.json();
    const queryData = await queryRes.json();
    const pageRows = pageData.rows || [];
    const queryRows = queryData.rows || [];

    // 3. Sitemaps
    const smRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/sitemaps`, { headers });
    const smData = await smRes.json();
    const sitemaps = smData.sitemap || [];
    let sitemapSubmitted = false;
    const hasSitemap = sitemaps.some((s) => (s.path || "").includes("sitemap.xml"));
    if (!hasSitemap) {
      try {
        const subRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/sitemaps/${encodeURIComponent(SITE + "/sitemap.xml")}`, {
          method: "PUT", headers, body: JSON.stringify({ path: SITE + "/sitemap.xml" }),
        });
        sitemapSubmitted = subRes.ok;
      } catch {}
    }

    // 4. URL inspection for priority paths
    const inspections = [];
    for (const path of PRIORITY_PATHS) {
      const inspectionUrl = SITE + path;
      try {
        const ir = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
          method: "POST", headers,
          body: JSON.stringify({ inspectionUrl, siteUrl, languageCode: "en-US" }),
        });
        const idata = await ir.json();
        const insp = idata.inspectionResult || {};
        const isr = insp.indexStatusResult || {};
        inspections.push({
          path,
          coverage: isr.coverageState || "UNKNOWN",
          verdict: isr.verdict || "NONE",
          indexingState: isr.indexingState || "UNKNOWN",
          mobileUsability: (insp.mobileUsabilityResult || {}).verdict || "NONE",
          richResults: ((insp.richResultsResult || {}).detectedItems || []).length,
        });
      } catch (e) {
        inspections.push({ path, error: e.message });
      }
    }

    // 5. Persist per-page performance to SeoContent records
    const existing = await base44.asServiceRole.entities.SeoContent.list(200);
    const byRoute = new Map(existing.map((r) => [r.route, r]));
    const topQs = queryRows.slice(0, 10).map((q) => ({ query: q.keys[0], impressions: q.impressions, clicks: q.clicks, position: q.position }));

    for (const row of pageRows) {
      const raw = row.keys[0];
      let path = raw.replace(SITE, "");
      if (path && !path.startsWith("/")) path = "/" + path;
      if (!path) path = "/";
      const perf = {
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: row.ctr,
        avg_position: row.position,
        snapshot_at: new Date().toISOString(),
        top_queries: topQs,
      };
      const rec = byRoute.get(path);
      if (rec) {
        await base44.asServiceRole.entities.SeoContent.update(rec.id, { performance_snapshot: perf });
      } else {
        const created = await base44.asServiceRole.entities.SeoContent.create({ route: path, performance_snapshot: perf, version: 1 });
        byRoute.set(path, created);
      }
    }

    // 6. Totals
    const totals = pageRows.reduce((acc, r) => ({
      impressions: acc.impressions + r.impressions,
      clicks: acc.clicks + r.clicks,
      positionSum: acc.positionSum + r.position,
      n: acc.n + 1,
    }), { impressions: 0, clicks: 0, positionSum: 0, n: 0 });

    await logStep(base44, { category: "seo", action: "Pulled Search Console data", detail: `${totals.impressions} impressions, ${totals.clicks} clicks`, source: "pullSearchConsoleData" });

    return Response.json({
      ok: true,
      siteUrl,
      pulledAt: new Date().toISOString(),
      sitemaps: sitemaps.map((s) => ({ path: s.path, status: s.errors ? `${s.errors} errors` : "ok", lastDownload: s.lastDownload })),
      sitemapSubmitted,
      totals: {
        impressions: totals.impressions,
        clicks: totals.clicks,
        avg_position: totals.n ? +(totals.positionSum / totals.n).toFixed(1) : 0,
      },
      topQueries: queryRows.slice(0, 15).map((r) => ({ query: r.keys[0], impressions: r.impressions, clicks: r.clicks, position: +r.position.toFixed(1), ctr: +(r.ctr * 100).toFixed(1) })),
      pages: pageRows.map((r) => ({ path: r.keys[0].replace(SITE, "") || "/", impressions: r.impressions, clicks: r.clicks, position: +r.position.toFixed(1), ctr: +(r.ctr * 100).toFixed(1) })),
      inspections,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}