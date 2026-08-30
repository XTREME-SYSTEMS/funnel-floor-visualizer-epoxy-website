import React, { useState, useMemo } from "react";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { getSystemColorRecords } from "@/lib/floorColors";
import { FLOOR_SYSTEM_DATA } from "@/data/colorData";
import PhotoUpload from "@/components/visualizer/PhotoUpload";
import Disclosure from "@/components/vq/Disclosure";
import { AI_DISCLOSURE } from "@/lib/brand";

const SYSTEMS = FLOOR_SYSTEM_DATA.map((s) => ({ name: s.name, slug: s.slug }));

const SHEEN_OPTIONS = [
  { key: "matte", label: "Matte", desc: "Flat, no reflection — soft non-reflective finish" },
  { key: "satin", label: "Satin", desc: "Subtle soft sheen with low reflection" },
  { key: "gloss", label: "Gloss", desc: "High-gloss wet-look with sharp mirror-like reflections" },
];

// Build a plain-English color description from a hex so the image model
// applies the EXACT color rather than guessing what a color name looks like.
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

  let tone = lum > 0.75 ? "very light" : lum > 0.55 ? "light" : lum > 0.35 ? "medium" : lum > 0.15 ? "dark" : "very dark";
  let hue = "neutral gray";
  if (sat > 0.15) {
    if (r >= g && r >= b) hue = b > g ? "magenta/pink" : g > b * 0.8 ? "warm brown/tan" : "red/orange";
    else if (g >= r && g >= b) hue = r > b ? "yellow/gold" : "green";
    else if (b >= r && b >= g) hue = r > g ? "purple" : "blue";
  }
  return `${tone} ${hue} (hex ${hex.toUpperCase()})`;
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
      const colorName = selectedColor?.name || "";
      const colorHex = selectedColor?.hex || "";
      const colorDesc = hexToColorDesc(colorHex);
      const isFlake = systemName.toLowerCase().includes("flake");
      const flakeClause = isFlake
        ? ` The floor has a full-broadcast decorative vinyl flake/chip texture with multi-toned ${colorDesc} flakes scattered evenly across the surface, mimicking the manufacturer color chart named "${colorName}".`
        : ` The floor is a solid ${colorDesc} surface matching the manufacturer color chart named "${colorName}".`;
      const prompt = `Photorealistic interior design rendering of the EXACT same room shown in the reference photo — identical walls, geometry, lighting, and camera angle. ONLY the floor has changed: it is now a newly installed ${systemName} concrete floor.${flakeClause} The floor surface has ${sheenDesc(sheen)}. Seamless, professional epoxy/concrete coating installation. Preserve every detail of the room above the floor line. High-end real-estate photography, wide angle, natural light.`;
      const res = await base44.integrations.Core.GenerateImage({
        prompt,
        existing_image_urls: photoUrls,
      });
      if (res?.url) {
        setConceptUrl(res.url);
      } else {
        setError("Could not generate preview. Please try again.");
      }
    } catch (err) {
      setError("Generation failed. Please try again.");
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
              <span
                className="w-full h-8 rounded-lg"
                style={{
                  background: sheen === s.key
                    ? "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)"
                    : sheen === "matte"
                    ? "#9a9a9a"
                    : sheen === "satin"
                    ? "linear-gradient(180deg, #c0c0c0, #8a8a8a)"
                    : "linear-gradient(180deg, #f0f0f0, #6a6a6a)",
                }}
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