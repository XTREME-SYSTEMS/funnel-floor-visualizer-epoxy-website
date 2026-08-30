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
import ContractorShell from "@/components/app/ContractorShell";
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
    <ContractorShell title="Xtreme AI Contractor">
      <div className="px-4 py-5 space-y-5">
        {/* Hero */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 mx-auto overflow-hidden">
            <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI Systems" className="w-full h-full" fittingType="fit" />
          </div>
          <p className="xa-label mt-2">Xtreme AI Systems</p>
          <h1 className="text-xl font-black xa-text mt-1">Contractor Edition</h1>
          <p className="text-xs xa-muted mt-1">Your contractor command center — leads, bids, pricing, and rewards in one app.</p>
          {!user?.plan && (
            <Link
              to="/download?edition=contractor"
              className="xa-gold mt-4 inline-flex h-10 px-6 items-center justify-center gap-2 rounded-xl font-bold text-sm transition"
            >
              <Download className="h-4 w-4" /> Download App
            </Link>
          )}
          {isInstalled && (
            <p className="mt-3 text-xs font-semibold flex items-center justify-center gap-1" style={{ color: "#FFEA00" }}>
              <CheckCircle2 className="h-3.5 w-3.5" /> App installed
            </p>
          )}
        </div>

        {/* Tools grid (admin-managed) */}
        {tools.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {tools.map((tool) => {
              const Icon = getIcon(tool.icon);
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center transition group-hover:scale-105 xa-gold-glow"
                    style={{ background: "linear-gradient(135deg, #FFF7B3 0%, #FFEA00 20%, #E6D400 45%, #FFEE33 65%, #FFEA00 80%, #CCBB00 100%)", border: "1px solid #8B6914" }}
                  >
                    <Icon className="h-5 w-5 text-black" strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-bold xa-muted text-center leading-tight">{tool.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Lead scraper card */}
        <div className="xa-card xa-card-hover">
          <div className="flex items-center gap-2 mb-2">
            <Crosshair className="h-4 w-4" style={{ color: "#FFEA00" }} />
            <span className="xa-label">Lead Scraper · Today</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-black xa-text">14</div>
              <div className="text-xs xa-muted">new leads scraped</div>
            </div>
            <div className="text-right text-xs xa-muted">
              <div className="font-bold" style={{ color: "#FFEA00" }}>3 hot</div>
              <div>6 warm · 5 cold</div>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "68%", background: "linear-gradient(90deg, #FFF7B3, #FFEA00)" }}
            />
          </div>
        </div>

        {/* BidFast card */}
        <div className="xa-card xa-card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" style={{ color: "#FFEA00" }} />
              <span className="text-sm font-bold xa-text">BidFast™</span>
            </div>
            <span className="text-xs xa-muted">3 bids sent this week</span>
          </div>
          <div className="text-xs xa-muted">2,400 sqft · 3-car garage · Metallic system</div>
          <div className="text-lg font-extrabold xa-gold-text mt-1">$8,400 – $9,600</div>
          <button
            className="xa-gold mt-3 w-full h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition"
          >
            <Zap className="h-4 w-4" /> Generate New Bid <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Contractor pricing */}
        <div className="xa-card xa-card-hover">
          <div className="flex items-center gap-2 mb-2">
            <Store className="h-4 w-4" style={{ color: "#FFEA00" }} />
            <span className="text-sm font-bold xa-text">Contractor Pricing & Live Stock</span>
          </div>
          <p className="text-xs xa-muted mb-3">Real-time inventory across 70+ XPS locations. Bulk contractor pricing on the full catalog.</p>
          <div className="space-y-2">
            {[
              { name: "Epoxy 100% Solids · 3 gal kit", stock: "In stock · 42 kits", price: "$189/kit" },
              { name: "Polyaspartic Topcoat · 2 gal kit", stock: "In stock · 18 kits", price: "$145/kit" },
              { name: "Decorative Flakes · 50 lb box", stock: "Low stock · 6 boxes", price: "$112/box" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold xa-text">{p.name}</div>
                  <div className="xa-muted">{p.stock}</div>
                </div>
                <div className="font-bold" style={{ color: "#FFEA00" }}>{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="space-y-3">
          {FEATURES.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <div key={i} className="xa-card xa-card-hover flex items-start gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255, 234, 0, 0.08)", border: "1px solid rgba(255, 234, 0, 0.2)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#FFEA00" }} />
                </div>
                <div>
                  <div className="text-sm font-bold xa-text">{f.title}</div>
                  <div className="text-xs xa-muted leading-relaxed mt-0.5">{f.text}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loyalty program */}
        <div className="xa-card xa-card-hover" style={{ borderColor: "rgba(255, 234, 0, 0.3)" }}>
          <button
            onClick={() => setShowLoyalty(!showLoyalty)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" style={{ color: "#FFEA00" }} />
              <span className="text-sm font-bold tracking-wide uppercase xa-gold-text">Contractor Loyalty & Rewards</span>
            </div>
            <ArrowRight className={`h-4 w-4 transition-transform ${showLoyalty ? "rotate-90" : ""}`} style={{ color: "#FFEA00" }} />
          </button>
          {showLoyalty && (
            <ul className="mt-4 space-y-2.5">
              {LOYALTY_PERKS.map((p, i) => {
                const Icon = getIcon(p.icon);
                return (
                  <li key={i} className="flex items-start gap-2 text-sm xa-muted leading-relaxed">
                    <Icon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#FFEA00" }} />
                    <span>{p.text}</span>
                  </li>
                );
              })}
            </ul>
          )}
          {!showLoyalty && (
            <p className="mt-2 text-xs xa-muted">Tap to expand full rewards details</p>
          )}
          <p className="mt-3 text-xs italic" style={{ color: "#555" }}>
            Details and point values subject to change — full terms available in-app.
          </p>
        </div>

        {/* CTA */}
        {!user?.plan && (
          <Link
            to="/download?edition=contractor"
            className="xa-gold w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition"
          >
            <Sparkles className="h-4 w-4" /> Activate My Elite Account <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <Link to="/app-settings" className="xa-card xa-card-hover flex items-center gap-2 text-sm font-semibold xa-muted">
            <Star className="h-4 w-4" style={{ color: "#FFEA00" }} /> Rate & Settings
          </Link>
          <Link to="/questionnaire" className="xa-card xa-card-hover flex items-center gap-2 text-sm font-semibold xa-muted">
            <MessageSquare className="h-4 w-4" style={{ color: "#FFEA00" }} /> Questionnaire
          </Link>
        </div>
      </div>

      {/* Rating popup for free users */}
      <RatingPopup
        open={!!ratingPopup}
        onClose={() => setRatingPopup(null)}
        targetType="tool"
        targetId={ratingPopup?.tool?.id || ""}
        targetName={ratingPopup?.tool?.name || ""}
      />
    </ContractorShell>
  );
}