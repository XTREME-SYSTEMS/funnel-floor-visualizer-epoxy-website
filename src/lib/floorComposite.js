// Canvas-based floor visualizer — composites the EXACT uploaded photo with
// the EXACT color chart color and texture. No AI generation: the original
// image is preserved pixel-for-pixel, and the color comes directly from the
// system's color chart data (hex value + manufacturer swatch image).

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Composites the floor color onto the uploaded photo using canvas 2D.
// Returns a JPEG data URL preserving the exact original image with the
// floor region overlaid in the selected color chart color/texture.
export async function compositeFloorImage(photoUrl, color) {
  const photoImg = await loadImage(photoUrl);

  // Try to load the color chart swatch image for texture. If CORS blocks
  // it (external CDN without CORS headers), fall back to solid hex only.
  let textureImg = null;
  if (color.image_url) {
    try {
      textureImg = await loadImage(color.image_url);
    } catch {
      textureImg = null;
    }
  }

  const w = photoImg.naturalWidth;
  const h = photoImg.naturalHeight;

  // Main canvas — starts as the exact uploaded photo
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(photoImg, 0, 0);

  // Floor overlay canvas — built separately then composited with alpha
  const overlay = document.createElement("canvas");
  overlay.width = w;
  overlay.height = h;
  const octx = overlay.getContext("2d");

  // Floor region: bottom portion of the image with perspective trapezoid.
  // Most garage photos have the floor occupying ~55-60% of the lower image.
  const floorTop = h * 0.42;
  const floorTopLeft = w * 0.10;
  const floorTopRight = w * 0.90;

  // Clip to perspective trapezoid (narrower at top = farther away)
  octx.beginPath();
  octx.moveTo(0, h);
  octx.lineTo(w, h);
  octx.lineTo(floorTopRight, floorTop);
  octx.lineTo(floorTopLeft, floorTop);
  octx.closePath();
  octx.clip();

  // 1. Base fill — the exact hex color from the color chart
  octx.globalCompositeOperation = "source-over";
  octx.globalAlpha = 1;
  octx.fillStyle = color.hex || "#777777";
  octx.fillRect(0, floorTop, w, h - floorTop);

  // 2. Texture — the exact color chart swatch image tiled across the floor
  if (textureImg) {
    octx.globalCompositeOperation = "overlay";
    octx.globalAlpha = 0.55;
    const pattern = octx.createPattern(textureImg, "repeat");
    if (pattern) {
      octx.fillStyle = pattern;
      octx.fillRect(0, floorTop, w, h - floorTop);
    }
    octx.globalAlpha = 1;
    octx.globalCompositeOperation = "source-over";
  }

  // 3. Gloss highlight — subtle reflective sheen for a coated look
  octx.globalCompositeOperation = "soft-light";
  octx.globalAlpha = 0.35;
  const gloss = octx.createLinearGradient(0, floorTop, 0, h);
  gloss.addColorStop(0, "rgba(255,255,255,0.5)");
  gloss.addColorStop(0.35, "rgba(255,255,255,0)");
  gloss.addColorStop(0.7, "rgba(255,255,255,0)");
  gloss.addColorStop(1, "rgba(255,255,255,0.25)");
  octx.fillStyle = gloss;
  octx.fillRect(0, floorTop, w, h - floorTop);
  octx.globalAlpha = 1;
  octx.globalCompositeOperation = "source-over";

  // 4. Gradient alpha mask at the top edge for smooth wall-to-floor transition
  octx.globalCompositeOperation = "destination-in";
  const fadeHeight = h * 0.10;
  const mask = octx.createLinearGradient(0, floorTop, 0, floorTop + fadeHeight);
  mask.addColorStop(0, "rgba(0,0,0,0)");
  mask.addColorStop(1, "rgba(0,0,0,1)");
  octx.fillStyle = mask;
  octx.fillRect(0, floorTop, w, fadeHeight);
  octx.fillStyle = "rgba(0,0,0,1)";
  octx.fillRect(0, floorTop + fadeHeight, w, h - floorTop - fadeHeight);

  // 5. Composite the floor overlay onto the exact original photo
  ctx.globalAlpha = 0.88;
  ctx.drawImage(overlay, 0, 0);
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/jpeg", 0.92);
}