import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Crosshair, TrendingUp, Bot, Image as ImageIcon, Zap, Film,
  Calculator, Palette, Award, ArrowRight, Download, Phone,
  Store, Video, Trophy, GraduationCap, Shirt, DollarSign,
  Sparkles, CheckCircle2, Menu as MenuIcon, Home as HomeIcon
} from "lucide-react";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";

const HOME_BUTTONS = [
  { icon: Crosshair, label: "Get Leads", desc: "Scrape & score high-intent leads" },
  { icon: TrendingUp, label: "Daily Discounts", desc: "Today's bulk contractor deals" },
  { icon: Bot, label: "AI Tools", desc: "AI Commercial Bidding System" },
  { icon: ImageIcon, label: "Visualizer", desc: "Show clients the finished floor" },
  { icon: Zap, label: "Bid Generator", desc: "BidFast™ — bids in seconds" },
  { icon: Film, label: "Gallery", desc: "Your project portfolio" },
  { icon: Calculator, label: "Epoxy Calculator", desc: "Material & coverage math" },
  { icon: Palette, label: "Media Maker", desc: "Create social content fast" },
];

const LOYALTY_PERKS = [
  { icon: Video, text: "Earn points when you post videos using our products and tag us on social media" },
  { icon: DollarSign, text: "Redeem points for exclusive contractor discounts on bulk orders" },
  { icon: Bot, text: "First access to our AI Commercial Bidding System" },
  { icon: GraduationCap, text: "Access to a 1-hour advanced AI training course" },
  { icon: Shirt, text: "Earn XPS-branded t-shirts, gifts, and swag" },
  { icon: Trophy, text: "Qualify for the Friday Epoxy Rockstar Showcase — top loyal customers with the best floors get featured to hundreds of thousands of viewers nationwide" },
  { icon: Sparkles, text: "Plus so much more — new rewards added regularly" },
];

const FEATURES = [
  { icon: Crosshair, title: "Lead Scraping + Intelligent CRM", text: "Automatically scrapes and scores residential & commercial leads in your service area. No more cold-calling — just hot prospects." },
  { icon: Zap, title: "BidFast™ System", text: "Generate professional, accurate bids in seconds. Send branded proposals from the field and close deals before you leave the driveway." },
  { icon: Store, title: "Contractor Pricing & Live Stock", text: "Real-time stock levels across 70+ XPS locations plus bulk contractor pricing on the full catalog." },
  { icon: ImageIcon, title: "Floor Visualizer", text: "Upload a photo and show clients exactly what their finished floor will look like — before you start." },
];

export default function EpoxyProElite() {
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const [showLoyalty, setShowLoyalty] = useState(false);

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur border-b border-amber-500/20">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="XPS" className="h-8 w-8 object-contain" />
            <span className="text-white font-bold text-sm">Xtreme AI Contractor</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 px-2.5 rounded-lg flex items-center gap-1 text-[11px] font-bold" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', color: '#1a1a1a' }}>
              <Award className="h-3.5 w-3.5" /> 1,250 pts
            </div>
            <a href="tel:+18555555555" className="h-8 px-2.5 rounded-lg flex items-center gap-1 text-[11px] font-bold bg-stone-800 text-white">
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto overflow-hidden">
            <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI Systems" className="w-full h-full" fittingType="fit" />
          </div>
          <p className="text-xs tracking-[0.2em] uppercase font-bold text-amber-500 mt-2">Xtreme AI Systems</p>
          <h1 className="text-2xl font-black text-white mt-1">Xtreme AI Contractor Edition</h1>
          <p className="text-sm text-stone-400 mt-1">Your contractor command center — leads, bids, pricing, and rewards in one app.</p>
          <Link to="/download?edition=contractor" className="mt-4 inline-flex h-11 px-6 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition">
            <Download className="h-4 w-4" /> Download App
          </Link>
          {isInstalled && (
            <p className="mt-3 text-xs text-amber-500 font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> App installed
            </p>
          )}
        </div>

        {/* Home buttons grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {HOME_BUTTONS.map((b) => (
            <button
              key={b.label}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center transition group-hover:scale-105" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', boxShadow: '0 4px 12px rgba(255,215,0,.3), inset 0 1px rgba(255,255,255,.4)' }}>
                <b.icon className="h-6 w-6 text-stone-900" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold text-white text-center leading-tight">{b.label}</span>
            </button>
          ))}
        </div>

        {/* Lead scraper card */}
        <div className="rounded-2xl bg-stone-900 border border-amber-500/30 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Crosshair className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Lead Scraper · Today</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-black text-white">14</div>
              <div className="text-xs text-stone-400">new leads scraped</div>
            </div>
            <div className="text-right text-xs text-stone-400">
              <div className="text-amber-400 font-bold">3 hot</div>
              <div>6 warm · 5 cold</div>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-stone-800 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, #FFE25A, #FFD700)' }} />
          </div>
        </div>

        {/* BidFast card */}
        <div className="rounded-2xl bg-white p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-bold text-stone-900">BidFast™</span>
            </div>
            <span className="text-xs text-stone-400">3 bids sent this week</span>
          </div>
          <div className="text-xs text-stone-500">2,400 sqft · 3-car garage · Metallic system</div>
          <div className="text-lg font-extrabold text-stone-900 mt-1">$8,400 – $9,600</div>
          <button className="mt-3 w-full h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', color: '#1a1a1a' }}>
            <Zap className="h-4 w-4" /> Generate New Bid <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Contractor pricing */}
        <div className="rounded-2xl bg-stone-900 border border-stone-700 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Store className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-bold text-white">Contractor Pricing & Live Stock</span>
          </div>
          <p className="text-xs text-stone-400 mb-3">Real-time inventory across 70+ XPS locations. Bulk contractor pricing on the full catalog.</p>
          <div className="space-y-2">
            {[
              { name: "Epoxy 100% Solids · 3 gal kit", stock: "In stock · 42 kits", price: "$189/kit" },
              { name: "Polyaspartic Topcoat · 2 gal kit", stock: "In stock · 18 kits", price: "$145/kit" },
              { name: "Decorative Flakes · 50 lb box", stock: "Low stock · 6 boxes", price: "$112/box" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="text-stone-500">{p.stock}</div>
                </div>
                <div className="font-bold text-amber-400">{p.price}</div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold transition flex items-center justify-center gap-2">
            <Store className="h-4 w-4" /> View Full Catalog
          </button>
        </div>

        {/* Feature highlights */}
        <div className="space-y-3 mb-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl bg-stone-900 border border-stone-700 p-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{f.title}</div>
                <div className="text-xs text-stone-400 leading-relaxed mt-0.5">{f.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Loyalty program */}
        <div className="rounded-2xl border-2 border-amber-500 bg-amber-500/10 p-5 mb-6">
          <button
            onClick={() => setShowLoyalty(!showLoyalty)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-bold text-amber-400 tracking-wide uppercase">Contractor Loyalty & Rewards</span>
            </div>
            <ArrowRight className={`h-4 w-4 text-amber-500 transition-transform ${showLoyalty ? 'rotate-90' : ''}`} />
          </button>
          {showLoyalty && (
            <ul className="mt-4 space-y-2.5">
              {LOYALTY_PERKS.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-200 leading-relaxed">
                  <p.icon className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          )}
          {!showLoyalty && (
            <p className="mt-2 text-xs text-stone-400">Tap to expand full rewards details</p>
          )}
          <p className="mt-3 text-xs text-stone-500 italic">
            Details and point values subject to change — full terms available in-app. We'll be
            refining these rewards as the program grows.
          </p>
        </div>

        {/* CTA */}
        <Link to="/download?edition=contractor" className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold mb-6" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', color: '#1a1a1a', boxShadow: '0 4px 12px rgba(255,215,0,.4), inset 0 1px rgba(255,255,255,.4)' }}>
          <Sparkles className="h-4 w-4" /> Activate My Elite Account <ArrowRight className="h-4 w-4" />
        </Link>

        <Link to="/" className="block text-center text-xs text-stone-500 hover:text-amber-500 transition pb-8">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}