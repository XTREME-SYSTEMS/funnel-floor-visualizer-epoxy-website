import React, { useState, useMemo } from "react";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { getSystemColorRecords } from "@/lib/floorColors";
import { FLOOR_SYSTEM_DATA } from "@/data/colorData";
import { compositeFloorImage } from "@/lib/floorComposite";
import PhotoUpload from "@/components/visualizer/PhotoUpload";
import Disclosure from "@/components/vq/Disclosure";
import { AI_DISCLOSURE } from "@/lib/brand";

const SYSTEMS = FLOOR_SYSTEM_DATA.map((s) => ({ name: s.name, slug: s.slug }));

const SHEEN_OPTIONS = [
  { key: "matte", label: "Matte", desc: "Flat, no reflection — soft non-reflective finish", img: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/a17c942a3_generated_image.png" },
  { key: "satin", label: "Satin", desc: "Subtle soft sheen with low reflection", img: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/382c09329_generated_image.png" },
  { key: "gloss", label: "Gloss", desc: "High-gloss wet-look with sharp mirror-like reflections", img: "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/e6eb3dffc_generated_image.png" },
];

// Build a VIVID color description from a hex so the image model applies the
// EXACT color. Uses real-world object comparisons the AI can reliably reproduce.
function hexToColorDesc(hex) {
  if (!hex) return "";
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const sat = max === 0 ? 0 : (max - min) / max;

  // Determine hue family with vivid real-world comparisons
  let hueName = "";
  let vividDesc = "";

  if (sat < 0.12) {
    // Grayscale
    if (lum > 0.85) { hueName = "white"; vividDesc = "pure white, like fresh snow"; }
    else if (lum > 0.65) { hueName = "light gray"; vividDesc = "light gray, like concrete sidewalk"; }
    else if (lum > 0.35) { hueName = "medium gray"; vividDesc = "medium gray, like pebbles"; }
    else if (lum > 0.15) { hueName = "dark gray"; vividDesc = "dark gray, like asphalt"; }
    else { hueName = "black"; vividDesc = "black, like coal"; }
  } else if (b >= r && b >= g) {
    // Blue family
    if (r > g) { hueName = "purple"; vividDesc = lum > 0.5 ? "light purple, like lavender" : "deep purple, like eggplant"; }
    else if (lum > 0.6) { hueName = "light blue"; vividDesc = "light blue, like a clear sky"; }
    else if (lum > 0.35) { hueName = "blue"; vividDesc = "ocean blue, like deep ocean water"; }
    else { hueName = "dark blue"; vividDesc = "navy blue, like a dark navy suit"; }
  } else if (g >= r && g >= b) {
    // Green family
    if (r > b) { hueName = "yellow-green"; vividDesc = lum > 0.6 ? "lime green, like a lime" : "olive green, like olive oil"; }
    else if (lum > 0.5) { hueName = "light green"; vividDesc = "light green, like fresh grass"; }
    else { hueName = "dark green"; vividDesc = "forest green, like pine trees"; }
  } else if (r >= g && r >= b) {
    // Red/orange/brown family
    if (b > g) { hueName = "magenta"; vividDesc = "pink/magenta, like a pink flower"; }
    else if (lum > 0.6 && g > b * 0.8) { hueName = "tan"; vividDesc = "tan/beige, like sand"; }
    else if (lum > 0.5 && g > b * 0.7) { hueName = "brown"; vividDesc = "warm brown, like chocolate"; }
    else if (lum > 0.45) { hueName = "orange"; vividDesc = "orange, like a traffic cone"; }
    else if (lum > 0.3) { hueName = "red-brown"; vividDesc = "dark red-brown, like rust"; }
    else { hueName = "dark red"; vividDesc = "deep red, like wine"; }
  }

  return `${vividDesc} (${hueName}, hex ${hex.toUpperCase()}, RGB ${r},${g},${b})`;
}

function sheenDesc(key) {
  if (key === "matte") return "a flat matte finish with no reflections and a soft, non-reflective surface";
  if (key === "satin") return "a satin finish with a subtle soft sheen and low, diffuse reflection";
  return "a high-gloss wet-look finish with sharp mirror-like reflections and deep clarity";
}

// Visualizer flow from the xtremevisualizer4 package:
// 1. Pick a color from the color chart
// 2. Upload a photo of your floor
// 3. Press the button
// 4. See your floor with that color applied
export default function FloorVisualizer({ onPhotoChange, onColorSelected, initialPhoto, initialColor }) {
  const [systemName, setSystemName] = useState(initialColor?.system || "Flake Epoxy");
  const [photoUrls, setPhotoUrls] = useState(initialPhoto ? [initialPhoto] : []);
  const [selectedColor, setSelectedColor] = useState(initialColor || null);
  const [sheen, setSheen] = useState("gloss");
  const [generating, setGenerating] = useState(false);
  const [conceptUrl, setConceptUrl] = useState("");
  const [error, setError] = useState("");

  const colorRecords = useMemo(() => getSystemColorRecords(systemName), [systemName]);

  const pickColor = (c) => {
    setSelectedColor(c);
    setConceptUrl("");
    onColorSelected?.({ code: c.code, color_name: c.name, hex: c.hex, system: systemName });
  };

  const handleUploaded = (urls) => {
    setPhotoUrls(urls);
    setConceptUrl("");
    onPhotoChange?.(urls[0] || "");
  };

  const generate = async () => {
    if (!photoUrls.length || !selectedColor) return;
    setGenerating(true);
    setError("");
    setConceptUrl("");
    try {
      const systemKey = FLOOR_SYSTEM_DATA.find((s) => s.name === systemName)?.slug || "flake";
      const dataUrl = await compositeFloorImage(photoUrls[0], {
        hex: selectedColor.hex,
        system: systemKey,
      }, sheen);
      setConceptUrl(dataUrl);
    } catch (err) {
      setError("Could not generate preview. Please try again.");
      console.error(err);
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Pick a color from the color chart */}
      <div>
        <h4 className="font-semibold text-stone-900 mb-3">1. Choose your color</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {SYSTEMS.map((s) => (
            <button
              key={s.slug}
              onClick={() => { setSystemName(s.name); setSelectedColor(null); setConceptUrl(""); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                systemName === s.name ? "bg-stone-950 text-white" : "bg-white text-stone-600 border border-stone-200"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
          {colorRecords.map((c) => (
            <button
              key={c.code}
              onClick={() => pickColor(c)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition ${
                selectedColor?.code === c.code
                  ? "border-amber-500 bg-amber-50"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              {c.image_url ? (
                <img src={c.image_url} alt={c.name} loading="lazy" className="h-12 w-full object-cover object-top rounded-lg" />
              ) : (
                <span className="h-12 w-full rounded-lg" style={{ background: c.hex }} />
              )}
              <span className="text-[11px] font-medium text-stone-700 truncate w-full text-center">{c.name}</span>
              <span className="text-[10px] text-stone-400">{c.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Choose your sheen */}
      <div>
        <h4 className="font-semibold text-stone-900 mb-3">2. Choose your sheen</h4>
        <div className="grid grid-cols-3 gap-2">
          {SHEEN_OPTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => { setSheen(s.key); setConceptUrl(""); }}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition ${
                sheen === s.key
                  ? "border-amber-500 bg-amber-50"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              <img
                src={s.img}
                alt={s.label}
                loading="lazy"
                className={`w-full h-14 object-cover rounded-lg ${sheen === s.key ? "ring-2 ring-amber-500" : ""}`}
              />
              <span className="text-xs font-bold text-stone-800">{s.label}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-stone-500">{SHEEN_OPTIONS.find((s) => s.key === sheen)?.desc}</p>
      </div>

      {/* Step 3: Upload your floor photo */}
      <div>
        <h4 className="font-semibold text-stone-900 mb-3">3. Upload a photo of your floor</h4>
        <PhotoUpload photoUrls={photoUrls} onUploaded={handleUploaded} />
      </div>

      {/* Step 4: Press the button */}
      {photoUrls.length > 0 && selectedColor && (
        <div>
          <button
            onClick={generate}
            disabled={generating}
            className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-base font-bold disabled:opacity-60 transition"
            style={{
              background: "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)",
              border: "2px solid #000",
              color: "#1a1a1a",
              boxShadow: "0 4px 12px rgba(212,175,55,.4), inset 0 1px rgba(255,255,255,.4)",
            }}
          >
            {generating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Generating your preview…
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" /> Visualize My Floor
              </>
            )}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* Step 4: Result — before/after */}
      {conceptUrl && (
        <div>
          <h4 className="font-semibold text-stone-900 mb-3">Your transformation</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl overflow-hidden border border-stone-200">
              <img src={photoUrls[0]} alt="Before" className="w-full h-48 object-cover" />
              <p className="text-[10px] tracking-[0.16em] text-stone-400 p-2">BEFORE</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-amber-300">
              <img src={conceptUrl} alt="After" className="w-full h-48 object-cover" />
              <p className="text-[10px] tracking-[0.16em] text-amber-600 p-2">AFTER — {selectedColor?.name} · {sheen}</p>
            </div>
          </div>
          <button
            onClick={generate}
            disabled={generating}
            className="mt-3 w-full h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold bg-stone-100 text-stone-700 hover:bg-stone-200 transition disabled:opacity-60"
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generating ? "Regenerating…" : "Regenerate"}
          </button>
          <div className="mt-3">
            <Disclosure text={AI_DISCLOSURE} />
          </div>
        </div>
      )}
    </div>
  );
}