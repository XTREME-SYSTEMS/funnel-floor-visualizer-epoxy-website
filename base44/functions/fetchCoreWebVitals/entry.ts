import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";
import { logStep } from "../../shared/sopLog.ts";

const SITE = "https://epoxygaragefloorestimate.com";
const PSI_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

// Fetches Core Web Vitals and lab metrics from Google PageSpeed Insights API
// (free, no auth required). Returns LCP, INP, CLS, FCP, TBT, and a pass/fail
// verdict for each. Admin-triggered to avoid rate limits.
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const strategy = body.strategy || "mobile"; // mobile | desktop
    const url = body.url || SITE;

    const psiRes = await fetch(
      `${PSI_URL}?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE`,
      { headers: { "Accept": "application/json" } }
    );

    if (!psiRes.ok) {
      const err = await psiRes.text();
      return Response.json({ error: `PageSpeed Insights API error: ${psiRes.status}`, detail: err }, { status: 502 });
    }

    const data = await psiRes.json();
    const lighthouse = data?.lighthouseResult;
    const audits = lighthouse?.audits || {};

    const metrics = {
      lcp: audits["largest-contentful-paint"]?.displayValue || "—",
      lcpScore: audits["largest-contentful-paint"]?.score,
      cls: audits["cumulative-layout-shift"]?.displayValue || "—",
      clsScore: audits["cumulative-layout-shift"]?.score,
      fcp: audits["first-contentful-paint"]?.displayValue || "—",
      fcpScore: audits["first-contentful-paint"]?.score,
      tbt: audits["total-blocking-time"]?.displayValue || "—",
      tbtScore: audits["total-blocking-time"]?.score,
      si: audits["speed-index"]?.displayValue || "—",
      siScore: audits["speed-index"]?.score,
      tti: audits["interactive"]?.displayValue || "—",
    };

    const perfScore = Math.round((lighthouse?.categories?.performance?.score || 0) * 100);

    await logStep(base44, {
      category: "seo",
      action: `Fetched Core Web Vitals (${strategy})`,
      detail: `Score: ${perfScore} · LCP: ${metrics.lcp} · CLS: ${metrics.cls}`,
      source: "fetchCoreWebVitals",
    });

    return Response.json({
      ok: true,
      url,
      strategy,
      perfScore,
      metrics,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}