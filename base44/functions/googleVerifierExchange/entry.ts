import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";

// Exchanges the OAuth authorization code (received at the /admin/google
// redirect) for a refresh token, and persists the refresh token in AppSettings
// so the auto-verifier can mint access tokens on demand.
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const code = body?.code;
    const redirectUri = body?.redirect_uri || "https://epoxygaragefloorestimate.com/admin/google";
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return Response.json({ error: "Google OAuth secrets not set" }, { status: 500 });
    if (!code) return Response.json({ error: "Missing authorization code" }, { status: 400 });

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const tokens = await tokenRes.json();
    if (!tokens.refresh_token) {
      return Response.json({ error: "No refresh token returned (revoke access and reconnect with prompt=consent)", detail: tokens }, { status: 502 });
    }

    const list = await base44.asServiceRole.entities.AppSettings.list(1);
    const s = list[0];
    if (s?.id) {
      await base44.asServiceRole.entities.AppSettings.update(s.id, { google_refresh_token: tokens.refresh_token });
    } else {
      await base44.asServiceRole.entities.AppSettings.create({ google_refresh_token: tokens.refresh_token });
    }
    return Response.json({ ok: true, has_refresh: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}