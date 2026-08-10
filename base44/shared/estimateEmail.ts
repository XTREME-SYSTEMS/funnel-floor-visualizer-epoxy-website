// Branded garage-floor estimate email template. Shared so the send function
// and any admin preview use the exact same markup.

import { scopeForLead, WARRANTY_TEXT, FAQS } from "./companyContent.ts";

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

export function estimateEmailHtml(lead, settings, origin, hasImage, gallery = []) {
  const company = esc(settings.public_business_name || "EpoxyGarageFloorEstimate.com");
  const phone = esc(settings.phone || "");
  const phoneHref = `tel:${(settings.phone || "").replace(/[^\d]/g, "")}`;
  const firstName = esc(lead.first_name || "there");
  const rating = settings.google_rating ? Number(settings.google_rating).toFixed(1) : null;
  const reviewCount = settings.google_review_count || null;
  const locationsUrl = `${origin}/locations`;
  const low = money(lead.estimate_low);
  const high = money(lead.estimate_high);
  const mid = money(lead.estimate_mid);
  const bookUrl = `${origin}/book/${lead.id}`;
  const packages = Array.isArray(lead.package_options) ? lead.package_options : [];
  const scope = scopeForLead(lead.floor_condition);

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

  const galleryBlock = gallery.length
    ? `<div style="margin:24px 0;">
         <div style="font-size:13px;font-weight:800;color:#0c0a09;letter-spacing:1px;text-align:center;margin-bottom:12px;">REAL XPS TRANSFORMATIONS</div>
         <table style="width:100%;border-collapse:separate;border-spacing:6px;"><tr>
           ${gallery.map((g) => `<td style="width:33%;vertical-align:top;"><img src="cid:${g.cid}" alt="${esc(g.alt)}" style="width:100%;border-radius:10px;border:1px solid #e7e5e4;display:block;"/><div style="font-size:10px;color:#78716c;margin-top:4px;text-align:center;">${esc(g.caption)}</div></td>`).join("")}
         </tr></table>
       </div>`
    : "";

  const pkgBlock = packages.length
    ? `<table style="width:100%;border-collapse:separate;border-spacing:0;margin:20px 0;"><tr>${pkgCards}</tr></table>`
    : "";

  const scopeBlock = scope.length
    ? `<div style="margin:24px 0;">
         <div style="font-size:15px;font-weight:800;color:#0c0a09;letter-spacing:0.5px;margin-bottom:12px;">SCOPE OF WORK &mdash; WHAT'S INCLUDED</div>
         <table style="width:100%;font-size:13px;color:#44403c;line-height:1.5;">
           ${scope.map((s) => `<tr><td style="padding:8px 0;border-bottom:1px solid #f5f5f4;vertical-align:top;width:24px;"><span style="color:#65a30d;font-weight:800;">&#10003;</span></td><td style="padding:8px 0;border-bottom:1px solid #f5f5f4;"><strong style="color:#0c0a09;">${esc(s.label)}</strong><br/><span style="color:#78716c;">${esc(s.detail)}</span></td></tr>`).join("")}
         </table>
       </div>`
    : "";

  const warrantyBlock = `<div style="margin:24px 0;background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;padding:18px;">
    <div style="font-size:13px;font-weight:800;color:#0c0a09;letter-spacing:1px;margin-bottom:8px;">OUR WARRANTY</div>
    <p style="font-size:13px;color:#44403c;line-height:1.6;margin:0;">${esc(WARRANTY_TEXT)}</p>
  </div>`;

  const faqBlock = FAQS.length
    ? `<div style="margin:24px 0;">
         <div style="font-size:15px;font-weight:800;color:#0c0a09;letter-spacing:0.5px;margin-bottom:12px;">FREQUENTLY ASKED QUESTIONS</div>
         ${FAQS.map((f) => `<div style="margin-bottom:12px;"><div style="font-weight:700;color:#0c0a09;font-size:13px;">${esc(f.q)}</div><div style="color:#78716c;font-size:13px;line-height:1.5;margin-top:2px;">${esc(f.a)}</div></div>`).join("")}
       </div>`
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
      ${galleryBlock}
      ${pkgBlock}
      ${scopeBlock}
      <div style="margin:24px 0;text-align:center;">
        <a href="${esc(bookUrl)}" style="display:inline-block;background:#a3e635;color:#0c0a09;font-weight:800;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:10px;">Book my free consultation</a>
        <div style="margin-top:12px;font-size:13px;color:#44403c;">or call <a href="${phoneHref}" style="color:#0c0a09;font-weight:700;">${phone}</a></div>
      </div>
      ${warrantyBlock}
      ${faqBlock}
      <div style="margin:28px 0 8px;">
        <div style="font-size:13px;font-weight:800;color:#0c0a09;letter-spacing:1px;text-align:center;margin-bottom:14px;">WHY HOMEOWNERS CHOOSE US</div>
        <table style="width:100%;border-collapse:separate;border-spacing:6px;"><tr>
          <td style="width:25%;background:#fafaf9;border:1px solid #e7e5e4;border-radius:10px;padding:14px 6px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#0c0a09;">15+</div><div style="font-size:10px;color:#78716c;">Years in business</div></td>
          <td style="width:25%;background:#fafaf9;border:1px solid #e7e5e4;border-radius:10px;padding:14px 6px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#0c0a09;">2,400+</div><div style="font-size:10px;color:#78716c;">Projects completed</div></td>
          <td style="width:25%;background:#fafaf9;border:1px solid #e7e5e4;border-radius:10px;padding:14px 6px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#0c0a09;">47</div><div style="font-size:10px;color:#78716c;">States served</div></td>
          <td style="width:25%;background:#fafaf9;border:1px solid #e7e5e4;border-radius:10px;padding:14px 6px;text-align:center;"><div style="font-size:18px;font-weight:800;color:#0c0a09;">98%</div><div style="font-size:10px;color:#78716c;">Client retention</div></td>
        </tr></table>
        ${rating ? `<div style="text-align:center;margin-top:10px;font-size:13px;color:#44403c;">Rated <strong style="color:#0c0a09;">${rating}&starf;</strong>${reviewCount ? ` by ${reviewCount}+ homeowners` : ""}</div>` : ""}
      </div>
      <div style="margin:20px 0;background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;padding:18px;">
        <div style="font-size:13px;font-weight:800;color:#0c0a09;letter-spacing:1px;margin-bottom:10px;">OUR QUALIFICATIONS</div>
        <table style="width:100%;font-size:13px;color:#44403c;line-height:1.6;">
          <tr><td style="padding:2px 0;">&#10003;&nbsp; Certified, factory-trained installation crews</td></tr>
          <tr><td style="padding:2px 0;">&#10003;&nbsp; Premium industrial-grade epoxy &amp; polyaspartic systems</td></tr>
          <tr><td style="padding:2px 0;">&#10003;&nbsp; Backed by a nationwide workmanship warranty</td></tr>
          <tr><td style="padding:2px 0;">&#10003;&nbsp; Part of the Xtreme Polishing Systems family &mdash; the industry's #1 source for epoxy &amp; polished concrete</td></tr>
        </table>
      </div>
      <div style="margin:20px 0;border:1px solid #e7e5e4;border-radius:12px;overflow:hidden;">
        <div style="background:#0c0a09;color:#ffffff;padding:16px 18px;">
          <div style="font-size:11px;letter-spacing:1.5px;color:#a3e635;font-weight:700;">POLISHED CONCRETE UNIVERSITY</div>
          <div style="font-size:15px;font-weight:700;margin-top:4px;">Train with the best in the business</div>
        </div>
        <div style="padding:16px 18px;font-size:13px;color:#44403c;line-height:1.5;">
          The world's #1 hands-on trade school for epoxy &amp; polished concrete. 5-day certification classes run every month at our Pompano Beach HQ and select XPS Xpress locations.
          <a href="${esc(locationsUrl)}" style="display:inline-block;margin-top:10px;color:#0c0a09;font-weight:700;text-decoration:none;">Learn about training &rarr;</a>
        </div>
      </div>
      <div style="margin:20px 0;text-align:center;background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;padding:18px;">
        <div style="font-size:13px;font-weight:800;color:#0c0a09;letter-spacing:1px;">FIND US NEAR YOU</div>
        <div style="font-size:13px;color:#44403c;margin:6px 0 12px;">XPS Xpress stores across the U.S. &amp; Canada, plus residential crews and commercial teams serving 47 states.</div>
        <a href="${esc(locationsUrl)}" style="display:inline-block;border:1px solid #0c0a09;color:#0c0a09;font-weight:700;font-size:13px;text-decoration:none;padding:10px 20px;border-radius:8px;">View all locations</a>
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