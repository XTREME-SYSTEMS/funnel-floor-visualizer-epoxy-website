import React, { useState, useMemo } from "react";
import { Upload, Loader2, Wand2, ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { COLOR_DATA } from "@/lib/colorData";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const SYSTEMS = [
  { key: "flake", label: "Flake" },
  { key: "metallic", label: "Metallic" },
  { key: "solid", label: "Solid" },
  { key: "quartz", label: "Quartz" },
  { key: "glitter", label: "Glitter" },
  { key: "dye_stain", label: "Stain" }
];

export default function FloorVisualizer({ onColorSelected }) {
  const [system, setSystem] = useState("flake");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [afterUrl, setAfterUrl] = useState("");

  const colors = useMemo(
    () => COLOR_DATA.filter((c) => c.system === system).sort((a, b) => a.rank - b.rank),
    [system]
  );

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setAfterUrl("");
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setPhotoUrl(file_url);
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const pickColor = (c) => {
    setSelectedColor(c);
    setAfterUrl("");
  };

  const visualize = async () => {
    if (!photoUrl || !selectedColor) return;
    setGenerating(true);
    setAfterUrl("");
    try {
      const prompt = `Photorealistic transformation of this residential garage floor. Apply a professional ${selectedColor.system} epoxy coating in the color "${selectedColor.color_name}" (${selectedColor.code}, hex ${selectedColor.hex}). Keep the same garage walls, doors, lighting, and camera angle as the original photo. Only the floor surface changes — it now has a clean, glossy, professionally installed ${selectedColor.system} finish in ${selectedColor.color_name}. Ultra-lifelike, high detail, natural lighting.`;
      const { url } = await base44.integrations.Core.GenerateImage({
        prompt,
        existing_image_urls: [photoUrl]
      });
      setAfterUrl(url);
      onColorSelected?.(selectedColor);
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div>
        <h3 className="text-xl font-semibold text-stone-900">Visualize your floor</h3>
        <p className="text-sm text-stone-500 mt-1">
          Upload a photo of your garage floor, pick a color, and see the transformation.
        </p>

        {!photoUrl ? (
          <label className="mt-4 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-stone-300 rounded-2xl p-8 cursor-pointer hover:border-amber-500 hover:bg-amber-50/40 transition">
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
          <div className="mt-4 relative rounded-2xl overflow-hidden border border-stone-200">
            <img src={photoUrl} alt="Your garage floor" className="w-full h-48 object-cover" />
            <button
              onClick={() => { setPhotoUrl(""); setAfterUrl(""); }}
              className="absolute top-2 right-2 text-xs font-semibold bg-stone-950/80 text-white px-3 py-1.5 rounded-lg hover:bg-stone-950"
            >
              Change photo
            </button>
          </div>
        )}
      </div>

      {/* Color picker */}
      {photoUrl && (
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {SYSTEMS.map((s) => (
              <button
                key={s.key}
                onClick={() => { setSystem(s.key); setSelectedColor(null); setAfterUrl(""); }}
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
                <img src={c.image_url} alt={c.color_name} loading="lazy" className="h-12 w-full object-cover rounded-lg" />
                <span className="text-[11px] font-medium text-stone-700 truncate w-full text-center">{c.color_name}</span>
                <span className="text-[10px] text-stone-400">{c.code}</span>
              </button>
            ))}
          </div>

          <button
            onClick={visualize}
            disabled={!selectedColor || generating}
            className="mt-4 w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-bold transition"
          >
            {generating ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Visualizing…</>
            ) : (
              <><Wand2 className="h-5 w-5" /> {selectedColor ? `Visualize "${selectedColor.color_name}"` : "Pick a color to visualize"}</>
            )}
          </button>
        </div>
      )}

      {/* Result */}
      {generating && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-stone-500">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-sm">Generating your new floor…</p>
        </div>
      )}

      {!generating && afterUrl && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="h-5 w-5 text-amber-500" />
            <h4 className="font-semibold text-stone-900">Your transformation</h4>
          </div>
          <p className="text-sm text-stone-500 mb-4">Drag the slider to compare your current floor with the {selectedColor?.color_name} finish.</p>
          <BeforeAfter beforeUrl={photoUrl} afterUrl={afterUrl} />
        </div>
      )}
    </div>
  );
}