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
    <div>
      {/* Hero — crest with confetti, gold CTA */}
      <section className="xa-band-light">
        <div className="xa-band-inner" style={{ paddingTop: 28, paddingBottom: 28 }}>
          {/* Confetti decoration */}
          <div className="relative">
            <div className="absolute -top-2 left-6 h-3 w-3 rounded-sm bg-amber-400 rotate-12 opacity-80" />
            <div className="absolute top-2 left-20 h-2 w-2 rounded-full bg-blue-300 opacity-70" />
            <div className="absolute -top-1 right-10 h-3 w-3 rounded-sm bg-pink-300 rotate-45 opacity-80" />
            <div className="absolute top-4 right-24 h-2 w-2 rounded-full bg-amber-400 opacity-70" />
            <div className="absolute top-8 left-12 h-2 w-2 rounded-sm bg-blue-300 rotate-12 opacity-60" />
            <div className="absolute -top-3 right-16 h-2.5 w-2.5 rounded-full bg-pink-200 opacity-70" />

            <img src={LOGO_URL} alt="Xtreme Polishing Systems" className="xa-crest" />
            <p className="xa-crest-sub">Xtreme Polishing Systems</p>
            <h1 className="xa-crest-title">
              Your Garage Floor <span style={{ color: "#C8A300" }}>Toolkit</span>
            </h1>
            <p style={{ margin: "4px 0 18px", fontSize: 14, color: "#555", lineHeight: 1.45 }}>
              Visualize, estimate, and book — all in one place.
            </p>
            <button className="xa-cta-gold" onClick={() => onNavigate({ tab: "estimate" })}>
              <Sparkles className="w-4 h-4" /> Get My Free Estimate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PWA install */}
      {canInstall && !isInstalled && (
        <div className="xa-band-inner" style={{ paddingTop: 16 }}>
          <button onClick={promptInstall} className="xa-cta-black">
            <Download className="w-5 h-5" /> Add to Home Screen
          </button>
        </div>
      )}

      {/* Quick action grid */}
      <div className="xa-band-inner" style={{ paddingTop: 20 }}>
        <div className="xa-section-head">
          <h2>Quick Tools</h2>
        </div>
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
        <div className="xa-band-inner" style={{ paddingTop: 20 }}>
          <div className="xa-section-head">
            <h2>My Saved Floors</h2>
            <button onClick={() => onNavigate({ tab: "visualizer" })} className="xa-see-all">View all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
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

      {/* Project timeline */}
      <div className="xa-band-inner" style={{ paddingTop: 20 }}>
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
        <div className="xa-band-inner" style={{ paddingTop: 16 }}>
          <button onClick={() => onNavigate({ tab: "estimate" })} className="w-full text-left xa-card-dark">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">Your Instant Bid</div>
                <div className="text-xl font-extrabold text-stone-900 mt-0.5">${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</div>
                <div className="text-xs text-stone-500">{estimate.system_name} · {estimate.square_footage} sq ft</div>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-600" />
            </div>
          </button>
        </div>
      )}

      {/* Trust strip */}
      <div className="xa-band-inner" style={{ paddingTop: 20, paddingBottom: 24 }}>
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