// Branded garage-floor estimate email template. Shared so the send function
// and any admin preview use the exact same markup.

function money(n) {
  const v = Math.round(Number(n) || 0);
  return v.toLocaleString("en-US");
}

function esc(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

export function estimateSubject(lead) {
  return `Your Garage Floor Estimate — $${money(lead.estimate_low)}–$${money(lead.estimate_high)}`;
}

export function estimateEmailHtml(lead, settings, origin, hasImage) {
  const company = esc(settings.public_business_name || "EpoxyGarageFloorEstimate.com");
  const phone = esc(settings.phone || "");
  const phoneHref = `tel:${(settings.phone || "").replace(/[^\d]/g, "")}`;
  const firstName = esc(lead.first_name || "there");
  const low = money(lead.estimate_low);
  const high = money(lead.estimate_high);
  const mid = money(lead.estimate_mid);
  const bookUrl = `${origin}/book/${lead.id}`;
  const packages = Array.isArray(lead.package_options) ? lead.package_options : [];

  const pkgCards = packages
    .map(
      (p) => `
    <td style="width:33%;vertical-align:top;padding:0 6px;">
      <div style="border:1px solid #e7e5e4;border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:11px;letter-spacing:1px;color:#78716c;font-weight:700;">${esc(p.tier || "")}</div>
        <div style="font-size:15px;font-weight:700;color:#0c0a09;margin:4px 0;">${esc(p.name || "")}</div>
        <div style="font-size:18px;font-weight:800;color:#0c0a09;">$${money(p.low)}–$${money(p.high)}</div>
        <div style="font-size:11px;color:#78716c;margin-top:6px;">${esc(p.description || "")}</div>
      </div>
    </td>`
    )
    .join("");

  const imageBlock = hasImage
    ? `<div style="margin:20px 0;text-align:center;">
         <img src="cid:floor-image" alt="Your floor preview" style="width:100%;max-width:540px;border-radius:12px;border:1px solid #e7e5e4;"/>
         <div style="font-size:12px;color:#78716c;margin-top:8px;">A preview of how your floor could look.</div>
       </div>`
    : "";

  const pkgBlock = packages.length
    ? `<table style="width:100%;border-collapse:separate;border-spacing:0;margin:20px 0;"><tr>${pkgCards}</tr></table>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e5e4;">
    <div style="background:#0c0a09;padding:20px 24px;">
      <div style="color:#a3e635;font-weight:800;font-size:18px;">${company}</div>
      <div style="color:#a8a29e;font-size:11px;letter-spacing:1.5px;margin-top:4px;">INSTANT GARAGE FLOOR ESTIMATE</div>
    </div>
    <div style="padding:28px 24px;">
      <div style="font-size:22px;font-weight:800;color:#0c0a09;">Hi ${firstName}, your estimate is ready.</div>
      <p style="color:#44403c;font-size:14px;line-height:1.6;margin:10px 0 20px;">Based on the details you entered, here's your preliminary garage floor coating estimate. Final pricing is confirmed at your free in-home consultation.</p>
      <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;padding:20px;text-align:center;">
        <div style="font-size:12px;color:#78716c;font-weight:600;">ESTIMATE RANGE</div>
        <div style="font-size:30px;font-weight:800;color:#0c0a09;margin:6px 0;">$${low} &ndash; $${high}</div>
        <div style="font-size:13px;color:#44403c;">Most projects like yours land around <strong>$${mid}</strong></div>
      </div>
      ${imageBlock}
      ${pkgBlock}
      <div style="margin:24px 0;text-align:center;">
        <a href="${esc(bookUrl)}" style="display:inline-block;background:#a3e635;color:#0c0a09;font-weight:800;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:10px;">Book my free consultation</a>
        <div style="margin-top:12px;font-size:13px;color:#44403c;">or call <a href="${phoneHref}" style="color:#0c0a09;font-weight:700;">${phone}</a></div>
      </div>
      <div style="font-size:11px;color:#a8a29e;line-height:1.5;border-top:1px solid #e7e5e4;padding-top:16px;">${esc(settings.disclaimer || "")}</div>
    </div>
    <div style="background:#fafaf9;padding:18px 24px;border-top:1px solid #e7e5e4;">
      <div style="font-size:12px;color:#78716c;">
        <strong style="color:#0c0a09;">${company}</strong><br/>
        ${esc(settings.business_address || "")}<br/>
        ${phone ? `Phone: <a href="${phoneHref}" style="color:#78716c;">${phone}</a><br/>` : ""}
        ${settings.email ? `Email: <a href="mailto:${esc(settings.email)}" style="color:#78716c;">${esc(settings.email)}</a><br/>` : ""}
        Reply to this email anytime with questions.
      </div>
    </div>
  </div>
</body></html>`;
}