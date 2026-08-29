import React from "react";
import { Palette, Calendar, MapPin, Star, MessageSquare, Wrench, Image as ImageIcon, ArrowRight, Sparkles, Download, GraduationCap, ShieldCheck, Layers, HardHat } from "lucide-react";
import TimelineSteps from "@/components/app/TimelineSteps";
import { usePwaInstall } from "@/lib/usePwaInstall";
import { Image } from "@/components/ui/image";
import { LOGO_URL } from "@/components/Logo";

const TRUST_BADGES = [
  { label: "+70 Locations Nationwide", icon: MapPin, sub: "trust-locations" },
  { label: "Training Center Near You", icon: GraduationCap, sub: "trust-training" },
  { label: "Commercial Grade Products", icon: ShieldCheck, sub: "trust-products" },
  { label: "Largest Selection in the Industry", icon: Layers, sub: "trust-selection" },
  { label: "XPS Trained Installers", icon: HardHat, sub: "trust-installers" },
];

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
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const { savedFloors, estimate, appointment, timeline } = appData;

  return (
    <div>
      {/* Hero — crest with confetti, gold CTA */}
      <section className="xa-band-light">
        <div className="xa-band-inner" style={{ paddingTop: 28, paddingBottom: 28 }}>
          <div className="relative">
            <img src={LOGO_URL} alt="Xtreme Polishing Systems" className="xa-crest" />
            <p className="xa-crest-sub">Xtreme Polishing Systems</p>
            <h1 className="xa-crest-title">Epoxy Pro App</h1>
            <p style={{ margin: "4px 0 18px", fontSize: 14, color: "#555", lineHeight: 1.45, textAlign: "center" }}>
              Visualize, estimate, and book — all in one place.
            </p>
            <button className="xa-cta-gold" onClick={() => onNavigate({ tab: "estimate" })}>
              <Sparkles className="w-4 h-4" /> Get My Free Estimate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <div className="xa-band-inner" style={{ paddingTop: 20, paddingBottom: 8 }}>
        <div className="space-y-2.5">
          {TRUST_BADGES.map((b) => (
            <button
              key={b.label}
              onClick={() => onNavigate({ sub: b.sub })}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border-2 border-black transition text-left"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)",
                  border: "2px solid #000",
                  boxShadow: "0 4px 10px rgba(255,215,0,0.4), inset 0 1px rgba(255,255,255,0.4)",
                }}
              >
                <b.icon className="h-5 w-5 text-stone-900" strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-stone-900 flex-1 text-left">{b.label}</span>
              <ArrowRight className="h-4 w-4 text-stone-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

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
              <div className="h-14 w-14 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:border-amber-400 group-hover:bg-amber-50 transition">
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

    </div>
  );
}