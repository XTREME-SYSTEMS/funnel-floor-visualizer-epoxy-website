// Branded PDF proposal generator (runs in the browser via jsPDF). The output
// is uploaded and attached to the estimate email. Mirrors the email layout:
// estimate range, packages, scope of work, warranty, FAQs, and a book CTA.
import { jsPDF } from "jspdf";
import { scopeForLead, WARRANTY_TEXT, FAQS } from "@/lib/bidContent";

const money = (n) => (Math.round(Number(n) || 0)).toLocaleString("en-US");

function wrap(doc, text, style, size, maxWidth) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  return doc.splitTextToSize(String(text || ""), maxWidth);
}

export function generateBidPdf(lead, settings, origin) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = 0;

  const company = settings.public_business_name || "EpoxyGarageFloorEstimate.com";
  const phone = settings.phone || "";
  const firstName = lead.first_name || "there";

  // Header band
  doc.setFillColor(12, 10, 9);
  doc.rect(0, 0, W, 90, "F");
  doc.setTextColor(163, 230, 53);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(company, M, 38);
  doc.setTextColor(168, 162, 158);
  doc.setFontSize(8);
  doc.text("INSTANT GARAGE FLOOR ESTIMATE", M, 56);
  y = 90 + 36;

  // Title
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

  // Estimate range box
  ensure(110);
  doc.setDrawColor(231, 229, 228);
  doc.setFillColor(250, 250, 249);
  doc.roundedRect(M, y, W - M * 2, 90, 8, 8, "FD");
  doc.setTextColor(120, 113, 108);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("ESTIMATE RANGE", M + 20, y + 24);
  doc.setTextColor(12, 10, 9);
  doc.setFontSize(28);
  doc.text(`$${money(lead.estimate_low)} - $${money(lead.estimate_high)}`, M + 20, y + 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(68, 64, 60);
  doc.text(`Most projects like yours land around $${money(lead.estimate_mid)}`, M + 20, y + 74);
  y += 90 + 22;

  // Packages
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

  // Scope of work
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
      doc.setFillColor(101, 163, 13);
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

  // Warranty
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

  // FAQ
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

  // CTA
  ensure(60);
  const bookUrl = `${origin}/book/${lead.id}`;
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

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(231, 229, 228);
    doc.line(M, 40, W - M, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(120, 113, 108);
    doc.text(company, M, 28);
    if (settings.business_address) {
      doc.setFont("helvetica", "normal");
      doc.text(settings.business_address, M, 16);
    }
    doc.text("Preliminary estimate - not a contract.", W - M, 28, { align: "right" });
  }

  return doc.output("arraybuffer");
}