import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, MapPin, Camera, Palette, FileText, Mail, Phone, ArrowRight, Sparkles, GraduationCap, ShieldCheck, Layers, HardHat, Home as HomeIcon, Image as ImageIcon, Grid, Calculator, MoreHorizontal } from "lucide-react";
import { LOGO_URL } from "@/components/Logo";

const benefits = [
  { icon: Palette, title: "Visualize Your Floor", text: "Upload a photo and preview real epoxy colors on your garage in seconds." },
  { icon: Calculator, title: "Instant Bid", text: "Get a price range immediately — no waiting for a salesperson to call." },
  { icon: MapPin, title: "Find a Store", text: "Locate the nearest XPS Xpress supply store from 70+ nationwide." },
  { icon: FileText, title: "Save & Share", text: "Save your designs and estimates, then share them with your contractor." },
  { icon: Sparkles, title: "Ask the AI", text: "Get instant answers about coatings, colors, and pricing right in the app." },
  { icon: ShieldCheck, title: "Trusted Pros", text: "Connect with XPS-trained installers and certified products." }
];

const TRUST_BADGES = [
  { label: "+70 Locations", icon: MapPin },
  { label: "Training Center", icon: GraduationCap },
  { label: "Commercial Grade", icon: ShieldCheck },
  { label: "Largest Selection", icon: Layers },
  { label: "XPS Installers", icon: HardHat }
];

const QUICK = [
  { icon: ImageIcon, label: "Visualizer" },
  { icon: Calculator, label: "Instant Bid" },
  { icon: Palette, label: "Colors" },
  { icon: MapPin, label: "Stores" },
  { icon: Sparkles, label: "Services" },
  { icon: Grid, label: "Gallery" },
  { icon: FileText, label: "Track" },
  { icon: Smartphone, label: "Ask AI" }
];

export default function MobileSection() {
  return (
    <section className="bg-stone-950 py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy + benefits */}
        <div>
          <div className="text-xs font-bold tracking-[0.2em] text-amber-500">DOWNLOAD THE APP</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Xtreme Project Tracker
          </h2>
          <p className="mt-4 text-stone-400 leading-relaxed">
            The only garage floor app that lets you visualize, estimate, and book — all from your phone. No waiting, no pressure, no home visit required to get your number.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <b.icon className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{b.title}</div>
                  <div className="text-xs text-stone-400 leading-relaxed mt-0.5">{b.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/epoxy-pro-guide" className="inline-flex h-12 px-8 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition animate-pop-bounce">
              <Smartphone className="h-5 w-5" /> Open the App
            </Link>
            <Link to="/funnel" className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition">
              Start my estimate
            </Link>
          </div>
        </div>

        {/* Right: lifelike phone mockup of the actual app */}
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[620px] rounded-[2.75rem] border-[10px] border-stone-800 bg-white overflow-hidden shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-white flex items-center justify-center z-20">
              <div className="h-1.5 w-16 rounded-full bg-stone-300" />
            </div>

            {/* Promo bar */}
            <div className="absolute top-7 inset-x-0 bg-white text-center py-0.5 border-b border-amber-500 z-10">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-stone-900">
                10% Off With This App Download
              </span>
            </div>

            {/* Header */}
            <div className="absolute top-[44px] inset-x-0 h-14 px-3 flex items-center justify-between border-b border-stone-200 bg-white z-10">
              <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center">
                <span className="text-stone-400 text-xs">✕</span>
              </div>
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <img src={LOGO_URL} alt="XPS" className="h-7 w-7 object-contain" />
                <span style={{ color: '#FFD700', WebkitTextStroke: '1px #000', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Xtreme Polishing Systems
                </span>
              </div>
              <div className="h-8 px-2.5 rounded-lg flex items-center gap-1 text-[10px] font-bold" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', color: '#1a1a1a' }}>
                <Phone className="h-3 w-3" /> Call
              </div>
            </div>

            {/* Scrollable app content */}
            <div className="absolute top-[100px] inset-x-0 bottom-[60px] overflow-hidden bg-gradient-to-b from-white to-stone-50">
              {/* Hero */}
              <div className="px-4 pt-5 pb-4 text-center">
                <img src={LOGO_URL} alt="XPS" className="w-20 h-20 object-contain mx-auto" style={{ filter: 'drop-shadow(0 6px 14px rgba(184,134,11,.25))' }} />
                <p className="text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: '#D9B835' }}>Xtreme Polishing Systems</p>
                <h3 className="text-lg font-black text-stone-900 leading-tight mt-1">Xtreme Project Tracker</h3>
                <p className="text-[10px] text-stone-500 mt-1">Visualize, estimate, and book — all in one place.</p>
                <button className="mt-3 w-full h-9 rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-extrabold" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', color: '#1a1a1a', boxShadow: '0 4px 12px rgba(255,215,0,.4), inset 0 1px rgba(255,255,255,.4)' }}>
                  <Sparkles className="h-3.5 w-3.5" /> Get My Free Estimate <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="px-3 space-y-1.5">
                {TRUST_BADGES.slice(0, 3).map((b) => (
                  <div key={b.label} className="flex items-center gap-2 p-1.5 rounded-xl bg-white border-2 border-black">
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000' }}>
                      <b.icon className="h-3.5 w-3.5 text-stone-900" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-bold text-stone-900 flex-1">{b.label}</span>
                    <ArrowRight className="h-3 w-3 text-stone-400" />
                  </div>
                ))}
              </div>

              {/* Quick tools */}
              <div className="px-3 pt-3">
                <div className="text-[11px] font-extrabold text-stone-900 mb-1.5">Quick Tools</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {QUICK.map((q) => (
                    <div key={q.label} className="flex flex-col items-center gap-0.5">
                      <div className="h-9 w-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center">
                        <q.icon className="h-4 w-4 text-stone-700" strokeWidth={1.8} />
                      </div>
                      <span className="text-[7px] font-medium text-stone-600 text-center leading-tight">{q.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="absolute bottom-0 inset-x-0 h-[60px] grid grid-cols-5 border-t border-stone-200 bg-white/96 backdrop-blur z-10 px-2 pb-1.5 pt-1">
              <div className="flex flex-col items-center gap-0.5">
                <HomeIcon className="h-4 w-4" style={{ color: '#D9B835' }} strokeWidth={2.2} />
                <span className="text-[8px] font-semibold" style={{ color: '#D9B835' }}>Home</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <ImageIcon className="h-4 w-4 text-stone-400" strokeWidth={1.8} />
                <span className="text-[8px] font-semibold text-stone-400">Visualizer</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center -mt-5" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #6e5408', boxShadow: '0 4px 12px rgba(255,215,0,.4), inset 0 1px rgba(255,255,255,.4)' }}>
                  <Calculator className="h-5 w-5 text-stone-900" strokeWidth={2.5} />
                </div>
                <span className="text-[8px] font-semibold mt-0.5" style={{ color: '#D9B835' }}>Bid</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <Grid className="h-4 w-4 text-stone-400" strokeWidth={1.8} />
                <span className="text-[8px] font-semibold text-stone-400">Gallery</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <MoreHorizontal className="h-4 w-4 text-stone-400" strokeWidth={1.8} />
                <span className="text-[8px] font-semibold text-stone-400">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}