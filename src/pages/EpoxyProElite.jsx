import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Crosshair, TrendingUp, Bot, Image as ImageIcon, Zap, Film,
  Calculator, Palette, Award, ArrowRight, Download, Phone,
  Store, Video, Trophy, GraduationCap, Shirt, DollarSign,
  Sparkles, CheckCircle2, Star, MessageSquare,
} from "lucide-react";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";
import AppShell from "@/components/app/AppShell";
import RatingPopup from "@/components/app/RatingPopup";
import { base44 } from "@/api/base44Client";

const ICON_MAP = {
  Crosshair, TrendingUp, Bot, Image: ImageIcon, Zap, Film,
  Calculator, Palette, Award, ArrowRight, Download, Phone,
  Store, Video, Trophy, GraduationCap, Shirt, DollarSign,
  Sparkles, CheckCircle2, Star, MessageSquare,
};
const getIcon = (name) => ICON_MAP[name] || Zap;

const LOYALTY_PERKS = [
  { icon: "Video", text: "Earn points when you post videos using our products and tag us on social media" },
  { icon: "DollarSign", text: "Redeem points for exclusive contractor discounts on bulk orders" },
  { icon: "Bot", text: "First access to our AI Commercial Bidding System" },
  { icon: "GraduationCap", text: "Access to a 1-hour advanced AI training course" },
  { icon: "Shirt", text: "Earn XPS-branded t-shirts, gifts, and swag" },
  { icon: "Trophy", text: "Qualify for the Friday Epoxy Rockstar Showcase — top loyal customers with the best floors get featured nationwide" },
  { icon: "Sparkles", text: "Plus so much more — new rewards added regularly" },
];

const FEATURES = [
  { icon: "Crosshair", title: "Lead Scraping + Intelligent CRM", text: "Automatically scrapes and scores residential & commercial leads in your service area. No more cold-calling — just hot prospects." },
  { icon: "Zap", title: "BidFast™ System", text: "Generate professional, accurate bids in seconds. Send branded proposals from the field and close deals before you leave the driveway." },
  { icon: "Store", title: "Contractor Pricing & Live Stock", text: "Real-time stock levels across 70+ XPS locations plus bulk contractor pricing on the full catalog." },
  { icon: "Image", title: "Floor Visualizer", text: "Upload a photo and show clients exactly what their finished floor will look like — before you start." },
];

export default function EpoxyProElite() {
  const { isInstalled } = usePwaInstall();
  const [showLoyalty, setShowLoyalty] = useState(false);
  const [tools, setTools] = useState([]);
  const [ratingPopup, setRatingPopup] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.entities.Tool.filter({ edition: "contractor", active: true })
      .then(setTools)
      .catch(() => {});
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleToolClick = (tool) => {
    if (!user?.plan) {
      setRatingPopup({ tool });
    }
  };

  return (
    <AppShell title="Xtreme AI Contractor">
      {/* Hero */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto overflow-hidden">
          <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI Systems" className="w-full h-full" fittingType="fit" />
        </div>
        <p className="text-xs tracking-[0.2em] uppercase font-bold text-amber-600 mt-2">Xtreme AI Systems</p>
        <h1 className="text-2xl font-black text-stone-900 mt-1">Xtreme AI Contractor Edition</h1>
        <p className="text-sm text-stone-500 mt-1">Your contractor command center — leads, bids, pricing, and rewards in one app.</p>
        {!user?.plan && (
          <Link to="/download?edition=contractor" className="mt-4 inline-flex h-11 px-6 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition">
            <Download className="h-4 w-4" /> Download App
          </Link>
        )}
        {isInstalled && (
          <p className="mt-3 text-xs text-amber-600 font-semibold flex items-center justify-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> App installed
          </p>
        )}
      </div>

      {/* Tools grid (admin-managed) */}
      {tools.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {tools.map((tool) => {
            const Icon = getIcon(tool.icon);
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center transition group-hover:scale-105" style={{ background: "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)", border: "2px solid #000", boxShadow: "0 4px 12px rgba(212,175,55,.3), inset 0 1px rgba(255,255,255,.4)" }}>
                  <Icon className="h-6 w-6 text-stone-900" strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold text-stone-700 text-center leading-tight">{tool.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Lead scraper card */}
      <div className="rounded-2xl bg-stone-900 border border-stone-700 p-4 mb-4">
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
          <div className="h-full rounded-full" style={{ width: "68%", background: "linear-gradient(90deg, #FFF6D5, #D4AF37)" }} />
        </div>
      </div>

      {/* BidFast card */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-bold text-stone-900">BidFast™</span>
          </div>
          <span className="text-xs text-stone-400">3 bids sent this week</span>
        </div>
        <div className="text-xs text-stone-500">2,400 sqft · 3-car garage · Metallic system</div>
        <div className="text-lg font-extrabold text-stone-900 mt-1">$8,400 – $9,600</div>
        <button className="mt-3 w-full h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold" style={{ background: "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)", border: "2px solid #000", color: "#1a1a1a" }}>
          <Zap className="h-4 w-4" /> Generate New Bid <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Contractor pricing */}
      <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Store className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-bold text-stone-900">Contractor Pricing & Live Stock</span>
        </div>
        <p className="text-xs text-stone-500 mb-3">Real-time inventory across 70+ XPS locations. Bulk contractor pricing on the full catalog.</p>
        <div className="space-y-2">
          {[
            { name: "Epoxy 100% Solids · 3 gal kit", stock: "In stock · 42 kits", price: "$189/kit" },
            { name: "Polyaspartic Topcoat · 2 gal kit", stock: "In stock · 18 kits", price: "$145/kit" },
            { name: "Decorative Flakes · 50 lb box", stock: "Low stock · 6 boxes", price: "$112/box" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-stone-900">{p.name}</div>
                <div className="text-stone-400">{p.stock}</div>
              </div>
              <div className="font-bold text-amber-600">{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature highlights */}
      <div className="space-y-3 mb-6">
        {FEATURES.map((f, i) => {
          const Icon = getIcon(f.icon);
          return (
            <div key={i} className="flex items-start gap-3 rounded-2xl bg-white border border-stone-200 p-4">
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">{f.title}</div>
                <div className="text-xs text-stone-500 leading-relaxed mt-0.5">{f.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loyalty program */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 mb-6">
        <button
          onClick={() => setShowLoyalty(!showLoyalty)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-bold text-amber-800 tracking-wide uppercase">Contractor Loyalty & Rewards</span>
          </div>
          <ArrowRight className={`h-4 w-4 text-amber-600 transition-transform ${showLoyalty ? "rotate-90" : ""}`} />
        </button>
        {showLoyalty && (
          <ul className="mt-4 space-y-2.5">
            {LOYALTY_PERKS.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-700 leading-relaxed">
                  <Icon className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{p.text}</span>
                </li>
              );
            })}
          </ul>
        )}
        {!showLoyalty && (
          <p className="mt-2 text-xs text-stone-500">Tap to expand full rewards details</p>
        )}
        <p className="mt-3 text-xs text-stone-400 italic">
          Details and point values subject to change — full terms available in-app.
        </p>
      </div>

      {/* CTA */}
      {!user?.plan && (
        <Link to="/download?edition=contractor" className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold mb-6" style={{ background: "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)", border: "2px solid #000", color: "#1a1a1a", boxShadow: "0 4px 12px rgba(212,175,55,.4), inset 0 1px rgba(255,255,255,.4)" }}>
          <Sparkles className="h-4 w-4" /> Activate My Elite Account <ArrowRight className="h-4 w-4" />
        </Link>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link to="/app-settings" className="rounded-xl bg-white border border-stone-200 p-3 flex items-center gap-2 text-sm font-semibold text-stone-700 hover:border-amber-400 transition">
          <Star className="h-4 w-4 text-amber-500" /> Rate & Settings
        </Link>
        <Link to="/questionnaire" className="rounded-xl bg-white border border-stone-200 p-3 flex items-center gap-2 text-sm font-semibold text-stone-700 hover:border-amber-400 transition">
          <MessageSquare className="h-4 w-4 text-amber-500" /> Questionnaire
        </Link>
      </div>

      {/* Rating popup for free users */}
      <RatingPopup
        open={!!ratingPopup}
        onClose={() => setRatingPopup(null)}
        targetType="tool"
        targetId={ratingPopup?.tool?.id || ""}
        targetName={ratingPopup?.tool?.name || ""}
      />
    </AppShell>
  );
}