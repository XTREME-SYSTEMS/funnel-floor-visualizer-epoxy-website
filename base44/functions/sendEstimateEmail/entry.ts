import { createClientFromRequest } from "npm:@base44/sdk@0.8.40";
import { buildMime, base64Url } from "../../shared/gmailMime.ts";
import { estimateEmailHtml, estimateSubject } from "../../shared/estimateEmail.ts";

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { lead_id, floor_image_url, origin, preview } = body;

    const settingsList = await base44.asServiceRole.entities.AppSettings.list(1);
    const settings = settingsList[0] || {};
    const appOrigin = origin || "https://epoxygaragefloorestimate.com";

    // ---- PREVIEW: return the rendered HTML without sending ----
    if (preview) {
      let lead = body.lead;
      if (!lead && lead_id) {
        try {
          lead = await base44.asServiceRole.entities.Lead.get(lead_id);
        } catch {}
      }
      if (!lead) {
        lead = {
          id: "preview",
          first_name: "Homeowner",
          estimate_low: 3080,
          estimate_mid: 3520,
          estimate_high: 4048,
          package_options: (settings.packages || []).map((p, i) => ({
            tier: p.tier,
            name: p.name,
            low: 3000 + i * 400,
            high: 3400 + i * 400,
            description: p.description,
          })),
        };
      }
      const html = estimateEmailHtml(lead, settings, appOrigin, !!floor_image_url);
      return Response.json({ subject: estimateSubject(lead), html });
    }

    // ---- SEND ----
    if (!lead_id) return Response.json({ error: "lead_id required" }, { status: 400 });
    const lead = await base44.asServiceRole.entities.Lead.get(lead_id);
    if (!lead) return Response.json({ error: "Lead not found" }, { status: 404 });
    if (!lead.email) return Response.json({ error: "Lead has no email address" }, { status: 400 });

    // Fetch the floor image (if provided) to embed inline
    let inline = [];
    if (floor_image_url) {
      try {
        const r = await fetch(floor_image_url);
        if (r.ok) {
          const bytes = new Uint8Array(await r.arrayBuffer());
          const type = r.headers.get("content-type") || "image/png";
          inline.push({ cid: "floor-image", type, bytes });
        }
      } catch {}
    }

    const html = estimateEmailHtml(lead, settings, appOrigin, inline.length > 0);
    const subject = estimateSubject(lead);

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

    // Use the connected Gmail account's address as the From
    let fromEmail = "jeremy@xtremepolishingsystems.com";
    try {
      const prof = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const pd = await prof.json();
      if (pd.emailAddress) fromEmail = pd.emailAddress;
    } catch {}
    const fromName = settings.public_business_name || "EpoxyGarageFloorEstimate.com";
    const from = `${fromName} <${fromEmail}>`;

    const mimeBytes = buildMime({ from, to: lead.email, subject, html, inline });
    const raw = base64Url(mimeBytes);
    const sendRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw }),
    });
    const result = await sendRes.json();
    if (!sendRes.ok) return Response.json({ error: "Gmail send failed", detail: result }, { status: 502 });

    return Response.json({ ok: true, messageId: result.id, to: lead.email, from: fromEmail });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}