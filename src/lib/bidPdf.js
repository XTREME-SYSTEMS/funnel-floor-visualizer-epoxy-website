// Branded PDF proposal generator (runs in the browser via jsPDF). The output
// is a professional bid document with the XPS logo, company contact info,
// the homeowner's nearest XPS Xpress location (or HQ), the visualizer floor
// preview, estimate (range or precise), packages, scope, warranty, and FAQs.
import { jsPDF } from "jspdf";
import { scopeForLead, WARRANTY_TEXT, FAQS } from "@/lib/bidContent";
import { LOGO_URL } from "@/components/Logo";

const money = (n) => (Math.round(Number(n) || 0)).toLocaleString("en-US");

// Loads an image URL and returns a PNG data URL via canvas (jsPDF needs PNG/JPEG).
async function loadImageDataUrl(url) {
  if (!url) return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 256;
        canvas.height = img.naturalHeight || 256;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function wrap(doc, text, style, size, maxWidth) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  return doc.splitTextToSize(String(text || ""), maxWidth);
}

export async function generateBidPdf(lead, settings, origin, options = {}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = 0;

  const company = settings.public_business_name || "EpoxyGarageFloorEstimate.com";
  const phone = settings.phone || "";
  const email = settings.email || "";
  const address = settings.business_address || "";
  const firstName = lead.first_name || "there";
  const isPrecise = options.bidType === "precise";
  const location = options.location || null;

  // Load logo + floor preview images in parallel
  const [logoDataUrl, floorDataUrl] = await Promise.all([
    loadImageDataUrl(LOGO_URL),
    loadImageDataUrl(options.floorImageUrl),
  ]);

  // ---- Header band (dark with gold accent) ----
  doc.setFillColor(12, 10, 9);
  doc.rect(0, 0, W, 120, "F");
  doc.setFillColor(217, 184, 53);
  doc.rect(0, 120, W, 3, "F");

  if (logoDataUrl) {
    try { doc.addImage(logoDataUrl, "PNG", M, 25, 65, 65); } catch {}
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(company, M + 80, 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(168, 162, 158);
  doc.text("INSTANT GARAGE FLOOR ESTIMATE", M + 80, 60);
  if (phone) doc.text(`Phone: ${phone}`, M + 80, 74);
  if (email) doc.text(`Email: ${email}`, M + 80, 86);
  if (address) doc.text(address, M + 80, 98);

  y = 135 + 30;

  // ---- Title ----
  doc.setTextColor(12, 10, 9);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`Prepared for ${firstName}`, M, y);
  y += 20;
  const addr = [lead.address, lead.city, lead.state, lead.zip].filter(Boolean).join(", ");
  if (addr) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 113, 108);
    doc.text(addr, M, y);
    y += 16;
  }
  y += 12;

  const ensure = (need) => {
    if (y + need > H - 60) { doc.addPage(); y = 48; }
  };

  // ---- Home base location ----
  if (location) {
    ensure(70);
    doc.setDrawColor(217, 184, 53);
    doc.setFillColor(250, 250, 249);
    doc.roundedRect(M, y, W - M * 2, 60, 8, 8, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(120, 113, 108);
    doc.text("YOUR HOME BASE", M + 16, y + 18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(12, 10, 9);
    doc.text(`${location.city}, ${location.state}${location.hq ? " (Corporate HQ)" : ""}`, M + 16, y + 34);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 113, 108);
    doc.text(location.address || "", M + 16, y + 46);
    if (location.phone) doc.text(`Phone: ${location.phone}`, M + 16, y + 58);
    y += 60 + 16;
  }

  // ---- Floor preview (visualizer image) ----
  if (floorDataUrl) {
    ensure(170);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(120, 113, 108);
    doc.text("YOUR FLOOR PREVIEW", M, y + 12);
    y += 18;
    try {
      const imgW = W - M * 2;
      const imgH = 140;
      doc.addImage(floorDataUrl, "PNG", M, y, imgW, imgH);
      y += imgH + 12;
    } catch {}
  }

  // ---- Estimate box ----
  ensure(110);
  doc.setDrawColor(217, 184, 53);
  doc.setFillColor(250, 250, 249);
  doc.roundedRect(M, y, W - M * 2, 90, 8, 8, "FD");
  doc.setTextColor(120, 113, 108);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(isPrecise ? "PRECISE ESTIMATE" : "ESTIMATE RANGE", M + 20, y + 24);
  doc.setTextColor(12, 10, 9);
  doc.setFontSize(28);
  if (isPrecise) {
    doc.text(`$${money(lead.estimate_mid)}`, M + 20, y + 56);
  } else {
    doc.text(`$${money(lead.estimate_low)} - $${money(lead.estimate_high)}`, M + 20, y + 56);
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(68, 64, 60);
  if (!isPrecise) {
    doc.text(`Most projects like yours land around $${money(lead.estimate_mid)}`, M + 20, y + 74);
  } else {
    doc.text("Based on your garage size and selected finish", M + 20, y + 74);
  }
  y += 90 + 22;

  // ---- Packages ----
  const packages = Array.isArray(lead.package_options) ? lead.package_options : [];
  if (packages.length) {
    ensure(80);
    doc.setTextColor(12, 10, 9);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("CHOOSE YOUR LEVEL OF FINISH", M, y);
    y += 16;
    const colW = (W - M * 2 - 24) / 3;
    for (let i = 0; i < packages.length; i++) {
      const p = packages[i];
      const x = M + i * (colW + 12);
      ensure(70);
      doc.setDrawColor(231, 229, 228);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, colW, 60, 6, 6, "FD");
      doc.setFontSize(8);
      doc.setTextColor(120, 113, 108);
      doc.text(String(p.tier || "").toUpperCase(), x + 12, y + 16);
      doc.setFontSize(10);
      doc.setTextColor(12, 10, 9);
      doc.text(String(p.name || ""), x + 12, y + 30);
      doc.setFontSize(12);
      doc.text(`$${money(p.low)}-$${money(p.high)}`, x + 12, y + 48);
    }
    y += 78;
  }

  // ---- Scope of work ----
  const scope = scopeForLead(lead.floor_condition);
  if (scope.length) {
    ensure(30);
    doc.setTextColor(12, 10, 9);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("SCOPE OF WORK - WHAT'S INCLUDED", M, y);
    y += 18;
    for (const s of scope) {
      const labelLines = wrap(doc, s.label, "bold", 10, W - M * 2 - 20);
      const detailLines = wrap(doc, s.detail, "normal", 9, W - M * 2 - 20);
      const blockH = labelLines.length * 13 + detailLines.length * 12 + 12;
      ensure(blockH + 10);
      doc.setFillColor(217, 184, 53);
      doc.rect(M, y, 6, 6, "F");
      let ty = y + 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(12, 10, 9);
      for (const ln of labelLines) { doc.text(ln, M + 20, ty); ty += 13; }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(120, 113, 108);
      for (const ln of detailLines) { doc.text(ln, M + 20, ty); ty += 12; }
      y = ty + 4;
      doc.setDrawColor(245, 245, 244);
      doc.line(M, y, W - M, y);
      y += 10;
    }
  }

  // ---- Warranty ----
  ensure(96);
  doc.setDrawColor(231, 229, 228);
  doc.setFillColor(250, 250, 249);
  doc.roundedRect(M, y, W - M * 2, 80, 8, 8, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(12, 10, 9);
  doc.text("OUR WARRANTY", M + 16, y + 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(68, 64, 60);
  const wLines = wrap(doc, WARRANTY_TEXT, "normal", 9, W - M * 2 - 32);
  let wy = y + 34;
  for (const ln of wLines) { doc.text(ln, M + 16, wy); wy += 12; }
  y += 96;

  // ---- FAQ ----
  if (FAQS.length) {
    ensure(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(12, 10, 9);
    doc.text("FREQUENTLY ASKED QUESTIONS", M, y);
    y += 18;
    for (const f of FAQS) {
      const qLines = wrap(doc, f.q, "bold", 10, W - M * 2);
      const aLines = wrap(doc, f.a, "normal", 9, W - M * 2);
      const blockH = qLines.length * 13 + aLines.length * 12 + 14;
      ensure(blockH);
      let ty = y + 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(12, 10, 9);
      for (const ln of qLines) { doc.text(ln, M, ty); ty += 13; }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(120, 113, 108);
      for (const ln of aLines) { doc.text(ln, M, ty); ty += 12; }
      y = ty + 12;
    }
  }

  // ---- CTA ----
  ensure(60);
  const bookUrl = `${origin}/book/${lead.id || ""}`;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(12, 10, 9);
  doc.text("Book your free consultation:", M, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(68, 64, 60);
  doc.textWithLink(bookUrl, M, y, { url: bookUrl });
  y += 16;
  if (phone) { doc.text(`or call ${phone}`, M, y); y += 14; }

  // ---- Footer on every page ----
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(231, 229, 228);
    doc.line(M, 40, W - M, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(120, 113, 108);
    doc.text(company, M, 28);
    if (address) {
      doc.setFont("helvetica", "normal");
      doc.text(address, M, 16);
    }
    doc.text("Preliminary estimate - not a contract.", W - M, 28, { align: "right" });
  }

  return doc.output("arraybuffer");
}