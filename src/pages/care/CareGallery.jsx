import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Palette, Share2, Heart, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import { COLOR_DATA } from "@/lib/colorData";

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function CareGallery() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("beforeafter");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        const projects = await base44.entities.ClientProject.filter({ client_email: me.email });
        setProject(projects[0]);
      } catch (err) {
        console.error("Gallery load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  const toggleFav = (code) => {
    setFavorites((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const colors = (COLOR_DATA || []).slice(0, 30);

  return (
    <div className="p-3 space-y-4">
      <div>
        <h1 className="text-lg font-black text-stone-900">Gallery</h1>
        <p className="text-xs text-stone-500">Your project photos & color chart</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: "beforeafter", label: "Before & After" },
          { key: "colors", label: "Color Chart" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 h-9 rounded-xl text-xs font-bold transition"
            style={
              tab === t.key
                ? { background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }
                : { background: "white", border: "1px solid #e5e5e5", color: "#71717a" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "beforeafter" && (
        <>
          {project?.after_photos?.length > 0 || project?.before_photos?.length > 0 ? (
            <div className="space-y-3">
              {project.after_photos?.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold text-stone-900 mb-2">After Photos</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {project.after_photos.map((photo, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-stone-200 relative h-32">
                        <Image src={photo} alt="After" className="w-full h-full" fittingType="fill" />
                        <span
                          className="absolute top-1 left-1 text-[8px] font-bold text-stone-900 px-1.5 py-0.5 rounded"
                          style={{ background: GOLD_GRADIENT }}
                        >
                          AFTER
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {project.before_photos?.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold text-stone-900 mb-2">Before Photos</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {project.before_photos.map((photo, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-stone-200 relative h-32">
                        <Image src={photo} alt="Before" className="w-full h-full" fittingType="fill" />
                        <span className="absolute top-1 left-1 text-[8px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                          BEFORE
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="h-12 w-12 text-stone-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-700">No photos yet</p>
              <p className="text-xs text-stone-500 mt-1">
                Your before & after photos will appear here once the project begins.
              </p>
            </div>
          )}

          {/* Approved color */}
          {project?.flake_color_hex && (
            <div className="rounded-2xl bg-white border border-stone-200 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Palette className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-stone-900">Your Approved Color</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-xl border-2 border-stone-300"
                  style={{ background: project.flake_color_hex }}
                />
                <div>
                  <div className="text-sm font-bold text-stone-900">
                    {project.flake_color_name || "Custom Color"}
                  </div>
                  <div className="text-xs text-stone-500">
                    {project.flake_color || "—"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "colors" && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Palette className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-bold text-stone-900">XPS Color Chart</span>
          </div>
          <p className="text-xs text-stone-500 mb-3">
            Browse all available colors. Tap the heart to save favorites.
          </p>
          {colors.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {colors.map((c) => {
                const isFav = favorites.includes(c.code);
                const isApproved = project?.flake_color === c.code;
                return (
                  <div
                    key={c.code}
                    className="rounded-xl bg-white border border-stone-200 p-2 relative"
                    style={isApproved ? { borderColor: "#D4AF37", borderWidth: 2 } : {}}
                  >
                    {isApproved && (
                      <span
                        className="absolute -top-1.5 -right-1.5 text-[7px] font-bold text-stone-900 px-1.5 py-0.5 rounded-full"
                        style={{ background: GOLD_GRADIENT, border: "1px solid #000" }}
                      >
                        YOURS
                      </span>
                    )}
                    <div
                      className="w-full aspect-square rounded-lg mb-1"
                      style={{ background: c.hex || "#ccc" }}
                    />
                    <div className="text-[9px] font-bold text-stone-900">{c.color_name}</div>
                    <div className="text-[8px] text-stone-400">{c.code}</div>
                    <button
                      onClick={() => toggleFav(c.code)}
                      className="absolute bottom-1.5 right-1.5"
                    >
                      <Heart
                        className="h-3.5 w-3.5"
                        style={{ color: isFav ? "#D4AF37" : "#d4d4d8" }}
                        fill={isFav ? "#D4AF37" : "none"}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-stone-500">Color chart coming soon.</p>
          )}
        </div>
      )}
    </div>
  );
}