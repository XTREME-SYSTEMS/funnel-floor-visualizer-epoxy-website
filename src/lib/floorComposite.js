// Canvas-based floor visualizer — composites the EXACT uploaded photo with
// a procedural texture generated from the exact color chart hex value.
// No external image loading (avoids CORS failures), no AI generation.
// The original photo is preserved pixel-for-pixel; the floor region is
// overlaid with a realistic flake/metallic/solid texture derived from
// the selected color chart entry's hex code.

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function hexToRgb(hex) {
  const m = hex?.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 120, g: 120, b: 120 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgba(r, g, b, a) {
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
}

function mix(a, b, t) {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t };
}
function lighten(c, t) { return mix(c, { r: 255, g: 255, b: 255 }, t); }
function darken(c, t) { return mix(c, { r: 0, g: 0, b: 0 }, t); }

// ── Procedural flake texture ──────────────────────────────────────────────
// Draws hundreds of small colored flakes in variations of the base hex,
// simulating a vinyl-chip epoxy flake floor. The flake palette is derived
// from the exact color chart hex: base, lightened, very light, darkened,
// white, and dark gray — matching how real flake blends look.
function drawFlakes(ctx, x, y, w, h, baseHex) {
  const base = hexToRgb(baseHex);
  const palette = [
    base,
    lighten(base, 0.3),
    lighten(base, 0.6),
    darken(base, 0.2),
    { r: 240, g: 240, b: 240 },
    { r: 65, g: 65, b: 65 },
  ];

  // Base epoxy fill — slightly darkened for depth under the flakes
  const db = darken(base, 0.06);
  ctx.fillStyle = rgba(db.r, db.g, db.b, 0.93);
  ctx.fillRect(x, y, w, h);

  // Scale flake size to image resolution so flakes look consistent
  const scale = Math.max(w / 1200, 0.8);
  const flakeCount = Math.min(Math.floor((w * h) / (45 * scale * scale)), 7000);

  for (let i = 0; i < flakeCount; i++) {
    const fx = x + Math.random() * w;
    const fy = y + Math.random() * h;
    const fs = (2 + Math.random() * 5) * scale;
    const c = palette[Math.floor(Math.random() * palette.length)];
    const a = 0.5 + Math.random() * 0.5;
    ctx.fillStyle = rgba(c.r, c.g, c.b, a);
    ctx.fillRect(fx, fy, fs, fs);
  }
}

// ── Procedural metallic texture ───────────────────────────────────────────
// Smooth radial gradients in lighter/darker variations create the swirled,
// reflective look of a metallic epoxy floor.
function drawMetallic(ctx, x, y, w, h, baseHex) {
  const base = hexToRgb(baseHex);

  ctx.fillStyle = rgba(base.r, base.g, base.b, 0.93);
  ctx.fillRect(x, y, w, h);

  const scale = Math.max(w / 1200, 0.8);

  // Light swirls — highlights
  for (let i = 0; i < 12; i++) {
    const cx = x + Math.random() * w;
    const cy = y + Math.random() * h;
    const radius = (40 + Math.random() * 140) * scale;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    const light = lighten(base, 0.25 + Math.random() * 0.45);
    grad.addColorStop(0, rgba(light.r, light.g, light.b, 0.35));
    grad.addColorStop(0.6, rgba(base.r, base.g, base.b, 0));
    grad.addColorStop(1, rgba(base.r, base.g, base.b, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);
  }

  // Dark swirls — depth
  for (let i = 0; i < 7; i++) {
    const cx = x + Math.random() * w;
    const cy = y + Math.random() * h;
    const radius = (30 + Math.random() * 90) * scale;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    const dark = darken(base, 0.15 + Math.random() * 0.3);
    grad.addColorStop(0, rgba(dark.r, dark.g, dark.b, 0.3));
    grad.addColorStop(1, rgba(base.r, base.g, base.b, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);
  }
}

// ── Solid color ───────────────────────────────────────────────────────────
function drawSolid(ctx, x, y, w, h, baseHex) {
  const base = hexToRgb(baseHex);
  ctx.fillStyle = rgba(base.r, base.g, base.b, 0.93);
  ctx.fillRect(x, y, w, h);
}

// ── Main compositing function ──────────────────────────────────────────────
export async function compositeFloorImage(photoUrl, color) {
  const photoImg = await loadImage(photoUrl);

  const w = photoImg.naturalWidth;
  const h = photoImg.naturalHeight;

  // Main canvas — the exact uploaded photo
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(photoImg, 0, 0);

  // Floor overlay canvas — texture built here, then composited with alpha
  const overlay = document.createElement("canvas");
  overlay.width = w;
  overlay.height = h;
  const octx = overlay.getContext("2d");

  // Floor region: perspective trapezoid in the bottom portion of the image
  const floorTop = h * 0.42;
  const floorTopLeft = w * 0.10;
  const floorTopRight = w * 0.90;
  const floorH = h - floorTop;

  // Clip to the perspective trapezoid (narrower at top = farther away)
  octx.save();
  octx.beginPath();
  octx.moveTo(0, h);
  octx.lineTo(w, h);
  octx.lineTo(floorTopRight, floorTop);
  octx.lineTo(floorTopLeft, floorTop);
  octx.closePath();
  octx.clip();

  // Draw the procedural texture based on the finish system
  const system = color.system || "flake";
  const baseHex = color.hex || "#777777";

  if (system === "metallic") {
    drawMetallic(octx, 0, floorTop, w, floorH, baseHex);
  } else if (system === "flake" || system === "quartz" || system === "glitter") {
    drawFlakes(octx, 0, floorTop, w, floorH, baseHex);
  } else {
    drawSolid(octx, 0, floorTop, w, floorH, baseHex);
  }

  // Gloss clear-coat highlight for a coated, reflective look
  octx.globalCompositeOperation = "soft-light";
  octx.globalAlpha = 0.3;
  const gloss = octx.createLinearGradient(0, floorTop, 0, h);
  gloss.addColorStop(0, "rgba(255,255,255,0.5)");
  gloss.addColorStop(0.35, "rgba(255,255,255,0)");
  gloss.addColorStop(0.7, "rgba(255,255,255,0)");
  gloss.addColorStop(1, "rgba(255,255,255,0.25)");
  octx.fillStyle = gloss;
  octx.fillRect(0, floorTop, w, floorH);
  octx.globalAlpha = 1;
  octx.globalCompositeOperation = "source-over";

  octx.restore();

  // Gradient alpha mask at the top edge for a smooth wall-to-floor transition
  octx.globalCompositeOperation = "destination-in";
  const fadeH = h * 0.10;
  const mask = octx.createLinearGradient(0, floorTop, 0, floorTop + fadeH);
  mask.addColorStop(0, "rgba(0,0,0,0)");
  mask.addColorStop(1, "rgba(0,0,0,1)");
  octx.fillStyle = mask;
  octx.fillRect(0, floorTop, w, fadeH);
  octx.fillStyle = "rgba(0,0,0,1)";
  octx.fillRect(0, floorTop + fadeH, w, floorH - fadeH);

  // Composite the textured floor onto the exact original photo
  ctx.globalAlpha = 0.88;
  ctx.drawImage(overlay, 0, 0);
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/jpeg", 0.92);
}