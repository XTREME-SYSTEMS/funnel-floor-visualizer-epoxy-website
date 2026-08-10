import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";

// Bridge: auto-add the site as a property in Google Search Console via the
// webmasters API. This removes the manual "Add property" step. The property
// is added in an UNVERIFIED state — Google still requires a one-time ownership
// proof (meta tag / DNS / GA) that must be confirmed in the Search Console UI,
// because the Site Verification API needs a scope no platform connector grants.
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const siteUrl = body?.siteUrl || "https://epoxygaragefloorestimate.com";
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_search_console");
    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ siteUrl }),
    });
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }
    return Response.json({ ok: res.ok, status: res.status, siteUrl, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}