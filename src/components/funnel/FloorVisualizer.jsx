import React, { useState, useMemo, useEffect } from "react";
import { Upload, Loader2, Wand2, ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { COLOR_DATA } from "@/lib/colorData";
import { compositeFloorImage } from "@/lib/floorComposite";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const SYSTEMS = [
  { key: "flake", label: "Flake" },
  { key: "metallic", label: "Metallic" },
  { key: "solid", label: "Solid" },
  { key: "quartz", label: "Quartz" },
  { key: "glitter", label: "Glitter" },
  { key: "dye_stain", label: "Stain" }
];

export default function FloorVisualizer({ onPhotoChange, onColorSelected, initialPhoto, initialColor }) {
  const [system, setSystem] = useState(initialColor?.system || "flake");
  const [photoUrl, setPhotoUrl] = useState(initialPhoto || "");
  const [uploading, setUploading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor || null);
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
      onPhotoChange?.(file_url);
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const pickColor = (c) => {
    setSelectedColor(c);
    onColorSelected?.(c);
    setAfterUrl("");
  };

  // Auto-visualize as soon as both a photo and a color are selected
  useEffect(() => {
    if (!photoUrl || !selectedColor?.hex) return;
    let cancelled = false;
    const run = async () => {
      setGenerating(true);
      setAfterUrl("");
      try {
        const dataUrl = await compositeFloorImage(photoUrl, selectedColor);
        if (!cancelled) setAfterUrl(dataUrl);
      } catch (err) {
        console.error(err);
      }
      if (!cancelled) setGenerating(false);
    };
    run();
    return () => { cancelled = true; };
  }, [photoUrl, selectedColor?.code]);

  return (
    <div className="space-y-6">
      {/* Upload */}
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
              onClick={() => { setPhotoUrl(""); setAfterUrl(""); onPhotoChange?.(""); }}
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
                <img src={c.image_url} alt={c.color_name} loading="lazy" className="h-12 w-full object-cover object-top rounded-lg" />
                <span className="text-[11px] font-medium text-stone-700 truncate w-full text-center">{c.color_name}</span>
                <span className="text-[10px] text-stone-400">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {generating && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-stone-500">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-sm font-medium flex items-center gap-1.5">
            <Wand2 className="h-4 w-4 text-amber-500" />
            Applying {selectedColor?.color_name} to your floor…
          </p>
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