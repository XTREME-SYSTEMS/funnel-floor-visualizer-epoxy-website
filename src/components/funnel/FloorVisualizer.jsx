import React, { useState, useMemo, useRef } from "react";
import { Upload, Loader2, ImageIcon, Sparkles, MoveHorizontal, Wand2, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { COLOR_DATA } from "@/lib/colorData";
import MaskEditor from "@/components/visualizer/MaskEditor";

const SYSTEMS = [
  { key: "flake", label: "Flake" },
  { key: "metallic", label: "Metallic" },
  { key: "solid", label: "Solid" },
  { key: "quartz", label: "Quartz" },
  { key: "glitter", label: "Glitter" },
  { key: "dye_stain", label: "Stain" }
];

const FINISHES = [
  { key: "matte", label: "Matte" },
  { key: "satin", label: "Satin" },
  { key: "gloss", label: "High Gloss" },
];

// New visualizer — mask the floor area, then AI-generate a realistic preview
// using the exact uploaded photo + selected color. Replaces the old CSS-tint
// approach with a proper mask-based AI concept render.
export default function FloorVisualizer({ onPhotoChange, onColorSelected, initialPhoto, initialColor }) {
  const [system, setSystem] = useState(initialColor?.system || "flake");
  const [photoUrl, setPhotoUrl] = useState(initialPhoto || "");
  const [uploading, setUploading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor || null);
  const [finish, setFinish] = useState("gloss");
  const [mask, setMask] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [conceptUrl, setConceptUrl] = useState("");
  const [comparePos, setComparePos] = useState(50);
  const [error, setError] = useState("");
  const compareRef = useRef(null);
  const dragging = useRef(false);

  const colors = useMemo(
    () => COLOR_DATA.filter((c) => c.system === system).sort((a, b) => a.rank - b.rank),
    [system]
  );

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setPhotoUrl(file_url);
      setConceptUrl("");
      setMask(null);
      onPhotoChange?.(file_url);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    }
    setUploading(false);
  };

  const pickColor = (c) => {
    setSelectedColor(c);
    setConceptUrl("");
    onColorSelected?.(c);
  };

  const generateConcept = async () => {
    if (!photoUrl || !selectedColor) return;
    setGenerating(true);
    setError("");
    try {
      const finishLabel = FINISHES.find((f) => f.key === finish)?.label || "High Gloss";
      const prompt = `Photorealistic interior of the same garage, but the floor has been resurfaced with a ${selectedColor.color_name} ${system} epoxy floor coating. The floor color is ${selectedColor.hex} (${selectedColor.color_name}, color code ${selectedColor.code}). The finish is ${finishLabel.toLowerCase()}. Keep the walls, ceiling, garage door, and all objects identical to the original photo. Only the concrete floor surface changes — it now has a smooth, professional ${system} epoxy coating in ${selectedColor.color_name}. Realistic lighting and reflections consistent with a ${finishLabel.toLowerCase()} floor finish.`;

      const res = await base44.integrations.Core.GenerateImage({
        prompt,
        existing_image_urls: [photoUrl],
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

  const moveCompare = (clientX) => {
    const el = compareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setComparePos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Upload */}
      <div>
        {!photoUrl ? (
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-stone-300 rounded-2xl p-8 cursor-pointer hover:border-amber-500 hover:bg-amber-50/40 transition">
            {uploading ? (
              <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
            ) : (
              <Upload className="h-8 w-8 text-stone-400" />
            )}
            <span className="text-sm font-medium text-stone-600">
              {uploading ? "Uploading…" : "Tap to upload a photo of your garage floor"}
            </span>
            <span className="text-xs text-stone-400">JPG or PNG</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-stone-200">
            <img src={photoUrl} alt="Your garage floor" className="w-full h-48 object-cover" />
            <button
              onClick={() => {
                setPhotoUrl("");
                setConceptUrl("");
                setMask(null);
                onPhotoChange?.("");
              }}
              className="absolute top-2 right-2 text-xs font-semibold bg-stone-950/80 text-white px-3 py-1.5 rounded-lg hover:bg-stone-950"
            >
              Change photo
            </button>
          </div>
        )}
      </div>

      {/* Step 2: Mask the floor area */}
      {photoUrl && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wand2 className="h-5 w-5 text-amber-500" />
            <h4 className="font-semibold text-stone-900">Mask the floor area</h4>
          </div>
          <p className="text-sm text-stone-500 mb-3">
            Paint over the floor so the AI knows exactly where to apply your new coating.
            Tap <span className="font-semibold text-amber-600">Auto-Detect</span> for a quick start.
          </p>
          <MaskEditor photoUrl={photoUrl} onMaskChange={setMask} />
        </div>
      )}

      {/* Step 3: Pick system + color */}
      {photoUrl && (
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {SYSTEMS.map((s) => (
              <button
                key={s.key}
                onClick={() => { setSystem(s.key); setSelectedColor(null); setConceptUrl(""); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  system === s.key ? "bg-stone-950 text-white" : "bg-white text-stone-600 border border-stone-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
            {colors.map((c) => (
              <button
                key={c.code}
                onClick={() => pickColor(c)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition ${
                  selectedColor?.code === c.code
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <img src={c.image_url} alt={c.color_name} loading="lazy" className="h-12 w-full object-cover object-top rounded-lg" />
                <span className="text-[11px] font-medium text-stone-700 truncate w-full text-center">{c.color_name}</span>
                <span className="text-[10px] text-stone-400">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Finish selector */}
      {photoUrl && selectedColor && (
        <div>
          <p className="text-sm font-semibold text-stone-700 mb-2">Finish</p>
          <div className="flex gap-2">
            {FINISHES.map((f) => (
              <button
                key={f.key}
                onClick={() => { setFinish(f.key); setConceptUrl(""); }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                  finish === f.key ? "bg-stone-950 text-white border-stone-950" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Generate */}
      {photoUrl && selectedColor && (
        <div>
          <button
            onClick={generateConcept}
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
                <Sparkles className="h-5 w-5" /> Generate Floor Preview
              </>
            )}
          </button>
          <p className="mt-2 text-xs text-stone-400 text-center">
            AI-generated concept — actual results may vary. {mask ? `Mask coverage: ${mask.coverage}%` : ""}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* Step 6: Result — before/after compare */}
      {conceptUrl && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="h-5 w-5 text-amber-500" />
            <h4 className="font-semibold text-stone-900">Your transformation</h4>
          </div>
          <p className="text-sm text-stone-500 mb-4">Drag the slider to compare your current floor with the {selectedColor?.color_name} finish.</p>

          <div
            ref={compareRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-stone-100"
            onMouseDown={(e) => { dragging.current = true; moveCompare(e.clientX); }}
            onMouseMove={(e) => dragging.current && moveCompare(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchStart={(e) => moveCompare(e.touches[0].clientX)}
            onTouchMove={(e) => moveCompare(e.touches[0].clientX)}
          >
            {/* AFTER (full container) */}
            <img src={conceptUrl} alt="After" className="absolute inset-0 w-full h-full object-cover" />
            {/* BEFORE (clipped to slider) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${comparePos}%` }}>
              <img
                src={photoUrl}
                alt="Before"
                className="absolute inset-0 h-full object-cover"
                style={{ width: `${comparePos > 0 ? 10000 / comparePos : 100}%` }}
              />
            </div>
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest bg-stone-900/80 text-white px-2 py-1 rounded z-10">BEFORE</span>
            <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest bg-amber-500 text-stone-950 px-2 py-1 rounded z-10">AFTER</span>
            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10" style={{ left: `${comparePos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <MoveHorizontal className="h-5 w-5 text-stone-900" />
              </div>
            </div>
            {selectedColor && (
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-stone-900/80 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="inline-block w-3 h-3 rounded-full border border-white/40" style={{ background: selectedColor.hex }} />
                {selectedColor.color_name}
              </div>
            )}
          </div>

          <button
            onClick={generateConcept}
            disabled={generating}
            className="mt-3 w-full h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold bg-stone-100 text-stone-700 hover:bg-stone-200 transition disabled:opacity-60"
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generating ? "Regenerating…" : "Regenerate"}
          </button>
        </div>
      )}
    </div>
  );
}