import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";

const SITE_URL = "https://epoxygaragefloorestimate.com";

// Mints a fresh access token from the stored refresh token.
async function getAccessToken(base44) {
  const list = await base44.asServiceRole.entities.AppSettings.list(1);
  const refreshToken = list[0]?.google_refresh_token;
  if (!refreshToken) throw new Error("Google refresh token not set — connect the verifier first");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Token refresh failed: " + JSON.stringify(data));
  return data.access_token;
}

// Fully automatic Search Console verification:
// 1. siteverification.getToken (META) -> verification token
// 2. persist token to AppSettings (Seo.jsx injects it into the rendered page)
// 3. siteverification.insert (META) -> Google fetches the rendered page and verifies
// 4. webmasters.sites.add -> registers the now-verified property in Search Console
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const accessToken = await getAccessToken(base44);

    // 1. Get the META verification token
    const tokenRes = await fetch("https://www.googleapis.com/siteVerification/v1/token?verificationMethod=META", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ site: { type: "SITE", identifier: SITE_URL } }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.token) return Response.json({ error: "getToken failed", detail: tokenData }, { status: 502 });
    const verifyToken = tokenData.token;

    // 2. Persist the token so Seo.jsx injects it site-wide
    const list = await base44.asServiceRole.entities.AppSettings.list(1);
    const s = list[0];
    if (s?.id) {
      await base44.asServiceRole.entities.AppSettings.update(s.id, { google_site_verification: verifyToken });
    } else {
      await base44.asServiceRole.entities.AppSettings.create({ google_site_verification: verifyToken });
    }

    // 3. Ask Google to verify (it fetches the rendered home page)
    const insRes = await fetch("https://www.googleapis.com/siteVerification/v1/webResource?verificationMethod=META", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ site: { type: "SITE", identifier: SITE_URL } }),
    });
    const insData = await insRes.json();
    const verified = insRes.ok && !!insData?.ownershipLevel;

    // 4. Add the property to Search Console once verified
    let added = null;
    if (verified) {
      const addRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ siteUrl: SITE_URL }),
      });
      added = addRes.ok;
    }

    return Response.json({ ok: true, verified, token: verifyToken, insertResponse: insData, added });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}