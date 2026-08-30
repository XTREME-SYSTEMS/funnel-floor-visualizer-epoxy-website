import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Crosshair, TrendingUp, Bot, Image as ImageIcon, Zap, Film,
  Calculator, Palette, Award, ArrowRight, Download, Phone,
  Store, Video, Trophy, GraduationCap, Shirt, DollarSign,
  Sparkles, CheckCircle2, Star, MessageSquare, Menu, X,
  FileText, Gift, LogOut, Home,
} from "lucide-react";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";
import RatingPopup from "@/components/app/RatingPopup";
import { base44 } from "@/api/base44Client";

const ICON_MAP = {
  Crosshair, TrendingUp, Bot, Image: ImageIcon, Zap, Film,
  Calculator, Palette, Award, ArrowRight, Download, Phone,
  Store, Video, Trophy, GraduationCap, Shirt, DollarSign,
  Sparkles, CheckCircle2, Star, MessageSquare, Home,
};
const getIcon = (name) => ICON_MAP[name] || Zap;

const BOTTOM_NAV = [
  { icon: Crosshair, label: "Leads", active: true },
  { icon: ImageIcon, label: "Visualizer" },
  { icon: Zap, label: "Bid" },
  { icon: Film, label: "Gallery" },
  { icon: Award, label: "Rewards" },
];

const MORE_ITEMS = [
  { icon: Star, label: "Rate & Settings", path: "/app-settings" },
  { icon: FileText, label: "Questionnaire", path: "/questionnaire" },
  { icon: Gift, label: "Redeem Code", path: "/download?edition=contractor" },
  { icon: Phone, label: "Call Support", path: "tel:+18555555555" },
  { icon: LogOut, label: "Back to Site", path: "/" },
];

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

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";
const GOLD_BORDER = "1.5px solid #000";

export default function EpoxyProElite() {
  const { isInstalled } = usePwaInstall();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50 flex flex-col">
      {/* Promo bar */}
      <div className="bg-black text-center py-1 border-b border-amber-500 sticky top-0 z-20">
        <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
          Contractor Elite · Bulk Pricing Inside
        </span>
      </div>

      {/* Header */}
      <div className="h-14 px-3 flex items-center justify-between border-b border-stone-200 bg-white sticky top-[25px] z-20">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center"
        >
          <Menu className="h-4 w-4 text-stone-400" />
        </button>
        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <img src={LOGO_URL} alt="XPS" className="h-7 w-7 object-contain" />
          <span className="text-[11px] font-extrabold text-stone-900">Xtreme AI</span>
        </div>
        <div
          className="h-8 px-2.5 rounded-lg flex items-center gap-1 text-[10px] font-bold"
          style={{ background: GOLD_GRADIENT, border: "2px solid #000", color: "#1a1a1a" }}
        >
          <Award className="h-3 w-3" /> 1,250 pts
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 pb-20" style={{ scrollbarWidth: "none" }}>
        {/* Hero */}
        <div className="px-1 pt-4 pb-3 text-center">
          <div className="w-14 h-14 mx-auto overflow-hidden">
            <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI" className="w-full h-full" fittingType="fit" />
          </div>
          <h3 className="text-base font-black text-stone-900 leading-tight mt-1">Xtreme AI</h3>
          <p className="text-[10px] text-stone-500 mt-0.5">Your contractor command center</p>
          {!user?.plan && (
            <Link
              to="/download?edition=contractor"
              className="mt-3 inline-flex h-9 px-5 items-center justify-center gap-1.5 rounded-xl text-[11px] font-bold transition"
              style={{ background: GOLD_GRADIENT, border: "2px solid #000", color: "#1a1a1a" }}
            >
              <Download className="h-3.5 w-3.5" /> Download App
            </Link>
          )}
          {isInstalled && (
            <p className="mt-2 text-[10px] font-semibold text-amber-600 flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> App installed
            </p>
          )}
        </div>

        {/* Home buttons grid */}
        <div className="pt-1">
          <div className="grid grid-cols-4 gap-1.5">
            {tools.map((tool) => {
              const Icon = getIcon(tool.icon);
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="flex flex-col items-center gap-0.5"
                >
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{ background: GOLD_GRADIENT, border: GOLD_BORDER }}
                  >
                    <Icon className="h-4 w-4 text-stone-900" strokeWidth={2} />
                  </div>
                  <span className="text-[7px] font-bold text-stone-700 text-center leading-tight">{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lead scraper card */}
        <div className="pt-3">
          <div className="rounded-xl bg-stone-900 p-2.5 border border-amber-500">
            <div className="flex items-center gap-1.5 mb-1">
              <Crosshair className="h-3 w-3 text-amber-400" />
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wide">Lead Scraper</span>
            </div>
            <div className="text-[10px] text-white font-bold">14 new leads today</div>
            <div className="text-[8px] text-stone-400">3 hot · 6 warm · 5 cold</div>
            <div className="mt-1.5 h-1.5 rounded-full bg-stone-700 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: "68%", background: "linear-gradient(90deg, #FFF6D5, #D4AF37)" }}
              />
            </div>
          </div>
        </div>

        {/* BidFast card */}
        <div className="pt-2">
          <div className="rounded-xl bg-white border-2 border-black p-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[10px] font-bold text-stone-900">BidFast™</span>
              </div>
              <span className="text-[8px] text-stone-400">3 bids sent</span>
            </div>
            <div className="text-[9px] text-stone-500 mt-1">2,400 sqft · 3-car garage</div>
            <div className="text-[11px] font-extrabold text-stone-900">$8,400 – $9,600</div>
          </div>
        </div>

        {/* Contractor pricing card */}
        <div className="pt-2">
          <div className="rounded-xl bg-white border border-stone-200 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Store className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[10px] font-bold text-stone-900">Contractor Pricing & Live Stock</span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: "Epoxy 100% Solids · 3 gal kit", stock: "In stock · 42 kits", price: "$189/kit" },
                { name: "Polyaspartic Topcoat · 2 gal kit", stock: "In stock · 18 kits", price: "$145/kit" },
                { name: "Decorative Flakes · 50 lb box", stock: "Low stock · 6 boxes", price: "$112/box" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between text-[9px]">
                  <div>
                    <div className="font-semibold text-stone-900">{p.name}</div>
                    <div className="text-stone-400">{p.stock}</div>
                  </div>
                  <div className="font-bold text-amber-600">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="pt-3 space-y-2">
          {FEATURES.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <div key={i} className="rounded-xl bg-white border border-stone-200 p-3 flex items-start gap-2.5">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 border border-amber-200">
                  <Icon className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-900">{f.title}</div>
                  <div className="text-[9px] text-stone-500 leading-relaxed mt-0.5">{f.text}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loyalty program */}
        <div className="pt-3">
          <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3">
            <button
              onClick={() => setShowLoyalty(!showLoyalty)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-600" />
                <span className="text-[10px] font-bold text-amber-700 tracking-wide uppercase">Contractor Loyalty & Rewards</span>
              </div>
              <ArrowRight className={`h-3.5 w-3.5 text-amber-600 transition-transform ${showLoyalty ? "rotate-90" : ""}`} />
            </button>
            {showLoyalty && (
              <ul className="mt-3 space-y-2">
                {LOYALTY_PERKS.map((p, i) => {
                  const Icon = getIcon(p.icon);
                  return (
                    <li key={i} className="flex items-start gap-1.5 text-[10px] text-stone-700 leading-relaxed">
                      <Icon className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{p.text}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            {!showLoyalty && <p className="mt-1.5 text-[9px] text-stone-500">Tap to expand full rewards details</p>}
            <p className="mt-2 text-[8px] text-stone-400 italic">
              Details and point values subject to change — full terms available in-app.
            </p>
          </div>
        </div>

        {/* CTA */}
        {!user?.plan && (
          <div className="pt-3">
            <Link
              to="/download?edition=contractor"
              className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold transition"
              style={{ background: GOLD_GRADIENT, border: "2px solid #000", color: "#1a1a1a" }}
            >
              <Sparkles className="h-4 w-4" /> Activate My Elite Account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Quick links */}
        <div className="pt-3 grid grid-cols-2 gap-2">
          <Link to="/app-settings" className="rounded-xl bg-white border border-stone-200 p-2.5 flex items-center gap-1.5 text-[10px] font-semibold text-stone-600">
            <Star className="h-3.5 w-3.5 text-amber-500" /> Rate & Settings
          </Link>
          <Link to="/questionnaire" className="rounded-xl bg-white border border-stone-200 p-2.5 flex items-center gap-1.5 text-[10px] font-semibold text-stone-600">
            <MessageSquare className="h-3.5 w-3.5 text-amber-500" /> Questionnaire
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 inset-x-0 h-[60px] grid grid-cols-5 border-t border-stone-200 bg-white/96 backdrop-blur z-30 px-2 pb-1.5 pt-1 max-w-[450px] mx-auto">
        {BOTTOM_NAV.map((n, i) => (
          <button key={i} className="flex flex-col items-center gap-0.5">
            <n.icon
              className="h-4 w-4"
              style={{ color: n.active ? "#D9B835" : "#9CA3AF" }}
              strokeWidth={n.active ? 2.2 : 1.8}
            />
            <span
              className="text-[8px] font-semibold"
              style={{ color: n.active ? "#D9B835" : "#9CA3AF" }}
            >
              {n.label}
            </span>
          </button>
        ))}
      </div>

      {/* Drawer */}
      {drawerOpen && <MoreDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );

  function MoreDrawer({ onClose }) {
    return (
      <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="relative w-full max-w-[450px] mx-auto bg-white rounded-t-2xl border-t border-stone-200 max-h-[70%] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 h-14 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900">More</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto">
            {MORE_ITEMS.map((item) => {
              const isTel = item.path.startsWith("tel:");
              if (isTel) {
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    className="border border-stone-200 rounded-xl p-3 flex items-center gap-2 text-xs font-medium text-stone-600 hover:border-amber-500 hover:text-amber-600 transition"
                  >
                    <item.icon className="h-4 w-4" /> {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="border border-stone-200 rounded-xl p-3 flex items-center gap-2 text-xs font-medium text-stone-600 hover:border-amber-500 hover:text-amber-600 transition"
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}