import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";

// Returns the Google OAuth consent URL for the Site Verifier client.
// The user must create a Google Cloud OAuth client (Web) with the Site
// Verification API enabled, the siteverification + webmasters scopes allowed,
// and this app's /admin/google route registered as an authorized redirect URI.
export default async function (req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const redirectUri = body?.redirect_uri || "https://epoxygaragefloorestimate.com/admin/google";
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) return Response.json({ error: "GOOGLE_CLIENT_ID secret not set" }, { status: 500 });
    const scopes = [
      "https://www.googleapis.com/auth/siteverification",
      "https://www.googleapis.com/auth/webmasters",
      "openid",
      "email",
    ];
    const url = "https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      prompt: "consent",
    });
    return Response.json({ url, redirect_uri: redirectUri });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}