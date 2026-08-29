import React from "react";
import { Palette, Calendar, MapPin, Star, MessageSquare, Wrench, Image as ImageIcon, ArrowRight, Sparkles, Download } from "lucide-react";
import TimelineSteps from "@/components/app/TimelineSteps";
import { useSettings } from "@/lib/useSettings";
import { usePwaInstall } from "@/lib/usePwaInstall";
import { Image } from "@/components/ui/image";
import { LOGO_URL } from "@/components/Logo";

const QUICK_ACTIONS = [
  { key: "visualizer", label: "Floor Visualizer", icon: ImageIcon, tab: "visualizer" },
  { key: "estimate", label: "Instant Bid", icon: Wrench, tab: "estimate" },
  { key: "colors", label: "Color Charts", icon: Palette, sub: "colors" },
  { key: "locations", label: "Find a Store", icon: MapPin, sub: "locations" },
  { key: "services", label: "Our Services", icon: Sparkles, sub: "services" },
  { key: "reviews", label: "Reviews", icon: Star, sub: "reviews" },
  { key: "schedule", label: "Track Proposal", icon: Calendar, sub: "schedule" },
  { key: "chat", label: "Ask AI", icon: MessageSquare, sub: "chat" }
];

export default function AppHome({ appData, onNavigate }) {
  const { settings } = useSettings();
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const { savedFloors, estimate, appointment, timeline } = appData;

  return (
    <div className="pb-6">
      {/* Hero — clean white with confetti, matching reference aesthetic */}
      <div className="relative overflow-hidden bg-white px-5 pt-10 pb-8">
        {/* Confetti decoration */}
        <div className="absolute top-3 left-8 h-3 w-3 rounded-sm bg-amber-400 rotate-12 opacity-80" />
        <div className="absolute top-7 left-20 h-2 w-2 rounded-full bg-blue-300 opacity-70" />
        <div className="absolute top-5 right-10 h-3 w-3 rounded-sm bg-pink-300 rotate-45 opacity-80" />
        <div className="absolute top-10 right-24 h-2 w-2 rounded-full bg-amber-400 opacity-70" />
        <div className="absolute top-14 left-12 h-2 w-2 rounded-sm bg-blue-300 rotate-12 opacity-60" />
        <div className="absolute top-2 right-16 h-2.5 w-2.5 rounded-full bg-pink-200 opacity-70" />

        {/* Logo centered */}
        <div className="relative flex justify-center mb-4">
          <img src={LOGO_URL} alt="Xtreme Polishing Systems" className="h-20 w-20 object-contain" />
        </div>

        {/* Headline */}
        <div className="relative text-center">
          <h1 className="text-2xl font-display font-extrabold text-stone-900 tracking-tight leading-tight">
            Your Garage Floor <span className="text-amber-500">Toolkit</span>
          </h1>
          <p className="text-sm text-stone-500 mt-2">Visualize, estimate, and book — all in one place.</p>
        </div>

        {/* CTA — black pill like reference */}
        <button
          onClick={() => onNavigate({ tab: "estimate" })}
          className="relative mt-5 w-full py-3.5 rounded-full bg-stone-950 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-800 transition"
        >
          Get My Free Estimate <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* PWA install button */}
      {canInstall && !isInstalled && (
        <div className="px-5 pt-4">
          <button
            onClick={promptInstall}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/30"
          >
            <Download className="h-5 w-5" /> Add to Home Screen
          </button>
        </div>
      )}

      {/* Quick action grid */}
      <div className="px-5 pt-5">
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.key}
              onClick={() => onNavigate(a.tab ? { tab: a.tab } : { sub: a.sub })}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="h-14 w-14 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-amber-400 transition">
                <a.icon className="h-6 w-6 text-stone-700 group-hover:text-amber-600 transition" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-medium text-stone-600 text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Saved floors */}
      {savedFloors.length > 0 && (
        <div className="px-5 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4 text-amber-500" /> My Saved Floors
            </h2>
            <button onClick={() => onNavigate({ tab: "visualizer" })} className="text-xs font-semibold text-amber-600 flex items-center gap-0.5">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
            {savedFloors.slice(0, 6).map((f) => (
              <div key={f.id} className="shrink-0 w-28 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <div className="h-20 relative">
                  <Image src={f.photoUrl} alt={f.colorName} fittingType="fill" className="h-full w-full" />
                  <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white shadow" style={{ background: f.colorHex }} />
                </div>
                <div className="p-1.5">
                  <div className="text-[10px] font-semibold text-stone-800 truncate">{f.colorName}</div>
                  <div className="text-[9px] text-stone-400">{f.colorCode}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project status / timeline */}
      <div className="px-5 pt-6">
        <button onClick={() => onNavigate({ sub: "schedule" })} className="w-full text-left">
          <TimelineSteps timeline={timeline} />
        </button>
        {appointment ? (
          <p className="text-xs text-stone-500 mt-2 text-center">In-home visit: {appointment.date} at {appointment.time} — tap for details</p>
        ) : (
          <p className="text-xs text-stone-500 mt-2 text-center">Schedule your in-home estimate to unlock live updates.</p>
        )}
      </div>

      {/* Instant bid preview */}
      {estimate && (
        <div className="px-5 pt-4">
          <button onClick={() => onNavigate({ tab: "estimate" })} className="w-full text-left rounded-2xl bg-amber-50 border border-amber-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-amber-700 uppercase">Your Instant Bid</div>
                <div className="text-xl font-extrabold text-stone-900 mt-0.5">${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</div>
                <div className="text-xs text-stone-500">{estimate.system_name} · {estimate.square_footage} sq ft</div>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-600" />
            </div>
          </button>
        </div>
      )}

      {/* Trust strip */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-center gap-4 text-center">
          <div>
            <div className="text-lg font-extrabold text-stone-900">{settings.google_rating || 4.4}★</div>
            <div className="text-[10px] text-stone-500">{settings.google_review_count || 214} reviews</div>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <div className="text-lg font-extrabold text-stone-900">30+</div>
            <div className="text-[10px] text-stone-500">Years</div>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <div className="text-lg font-extrabold text-stone-900">70+</div>
            <div className="text-[10px] text-stone-500">Locations</div>
          </div>
        </div>
      </div>
    </div>
  );
}