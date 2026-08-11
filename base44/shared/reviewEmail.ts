// Review request email template for the post-job review drip.
// Sends a branded email asking the customer to leave a Google review.

function esc(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

export function reviewSubject(stage, lead) {
  if (stage === "followup") {
    return `Quick favor, ${lead.first_name || "there"}?`;
  }
  return `How's your new garage floor, ${lead.first_name || "there"}?`;
}

export function buildReviewEmail(stage, lead, settings) {
  const company = esc(settings.public_business_name || "EpoxyGarageFloorEstimate.com");
  const phone = esc(settings.phone || "");
  const phoneHref = `tel:${(settings.phone || "").replace(/[^\d]/g, "")}`;
  const firstName = esc(lead.first_name || "there");
  const reviewUrl = esc(
    (settings.seo && settings.seo.review_url) ||
    "https://www.google.com/search?q=epoxy+garage+floor+estimate"
  );

  const heading = stage === "followup"
    ? "Just checking in on your new floor"
    : "Love your new garage floor?";

  const intro = stage === "followup"
    ? `Hi ${firstName}, just following up to make sure you're loving your new garage floor. If everything looks great, would you take 60 seconds to leave us a Google review? It helps other homeowners find quality flooring work in your area.`
    : `Hi ${firstName}, we hope you're enjoying your new garage floor! If you're happy with the work, we'd be incredibly grateful if you could leave a quick review on Google. It takes less than a minute and helps other homeowners discover quality garage floor coating services.`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e5e4;">
    <div style="background:#0c0a09;padding:20px 24px;">
      <div style="color:#a3e635;font-weight:800;font-size:18px;">${company}</div>
      <div style="color:#a8a29e;font-size:11px;letter-spacing:1.5px;margin-top:4px;">CUSTOMER REVIEW REQUEST</div>
    </div>
    <div style="padding:28px 24px;">
      <div style="font-size:21px;font-weight:800;color:#0c0a09;">${esc(heading)}</div>
      <p style="color:#44403c;font-size:14px;line-height:1.6;margin:12px 0 8px;">${intro}</p>
      <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:12px;padding:18px;margin:20px 0;text-align:center;">
        <div style="font-size:13px;color:#78716c;font-weight:600;margin-bottom:4px;">YOUR FEEDBACK MATTERS</div>
        <div style="font-size:15px;color:#0c0a09;font-weight:600;">Help other homeowners find quality work</div>
      </div>
      <div style="margin:24px 0;text-align:center;">
        <a href="${reviewUrl}" style="display:inline-block;background:#a3e635;color:#0c0a09;font-weight:800;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:10px;">Leave a Google Review</a>
        <div style="margin-top:12px;font-size:13px;color:#44403c;">or call us with feedback <a href="${phoneHref}" style="color:#0c0a09;font-weight:700;">${phone}</a></div>
      </div>
      <div style="font-size:11px;color:#a8a29e;line-height:1.5;border-top:1px solid #e7e5e4;padding-top:16px;">${esc(settings.disclaimer || "")}</div>
    </div>
    <div style="background:#fafaf9;padding:18px 24px;border-top:1px solid #e7e5e4;">
      <div style="font-size:12px;color:#78716c;">
        <strong style="color:#0c0a09;">${company}</strong><br/>
        ${esc(settings.business_address || "")}<br/>
        ${phone ? `Phone: <a href="${phoneHref}" style="color:#78716c;">${phone}</a><br/>` : ""}
        Reply to this email anytime with questions.
      </div>
    </div>
  </div>
</body></html>`;
}