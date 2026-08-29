import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Image as ImageIcon, Calculator, Grid, MoreHorizontal, ArrowLeft, X, Phone, MessageSquare, Palette, MapPin, Star, Wrench, Calendar, Download, Lock } from "lucide-react";
import { useAppData } from "@/lib/useAppData";
import { useSettings } from "@/lib/useSettings";
import AppHome from "@/components/app/AppHome";
import AppVisualizer from "@/components/app/AppVisualizer";
import AppEstimate from "@/components/app/AppEstimate";
import AppGallery from "@/components/app/AppGallery";
import AppColors from "@/components/app/AppColors";
import AppLocations from "@/components/app/AppLocations";
import AppServices from "@/components/app/AppServices";
import AppReviews from "@/components/app/AppReviews";
import AppSchedule from "@/components/app/AppSchedule";
import AppChat from "@/components/app/AppChat";
import TrustLocations from "@/components/app/TrustLocations";
import TrustTraining from "@/components/app/TrustTraining";
import TrustProducts from "@/components/app/TrustProducts";
import TrustSelection from "@/components/app/TrustSelection";
import TrustInstallers from "@/components/app/TrustInstallers";
import { LOGO_URL } from "@/components/Logo";
import { Link } from "react-router-dom";
import { usePwaInstall } from "@/lib/usePwaInstall";

const TABS = [
  { key: "home", label: "Home", icon: Home },
  { key: "visualizer", label: "Visualizer", icon: ImageIcon },
  { key: "gallery", label: "Gallery", icon: Grid },
  { key: "more", label: "More", icon: MoreHorizontal }
];

const TITLES = {
  home: { eyebrow: "EPOXY PRO", title: "Xtreme Project Tracker" },
  visualizer: { eyebrow: "EPOXY PRO · TOOLS", title: "Floor Visualizer" },
  estimate: { eyebrow: "EPOXY PRO · TOOLS", title: "Instant Bid" },
  gallery: { eyebrow: "EPOXY PRO · GALLERY", title: "Project Gallery" },
  more: { eyebrow: "EPOXY PRO", title: "More" },
  colors: { eyebrow: "EPOXY PRO · COLORS", title: "Color Charts" },
  locations: { eyebrow: "EPOXY PRO · STORES", title: "Find a Store" },
  services: { eyebrow: "EPOXY PRO · SERVICES", title: "Our Services" },
  reviews: { eyebrow: "EPOXY PRO · REVIEWS", title: "Customer Reviews" },
  schedule: { eyebrow: "EPOXY PRO · TRACKING", title: "Proposal Tracking" },
  "trust-locations": { eyebrow: "XPS · LOCATIONS", title: "70+ Locations Nationwide" },
  "trust-training": { eyebrow: "XPS · TRAINING", title: "Training Center" },
  "trust-products": { eyebrow: "XPS · PRODUCTS", title: "Commercial Grade Products" },
  "trust-selection": { eyebrow: "XPS · SELECTION", title: "Largest Selection" },
  "trust-installers": { eyebrow: "XPS · CERTIFICATION", title: "XPS Trained Installers" },
};

const MORE_ITEMS = [
  { key: "colors", label: "Color Charts", icon: Palette, desc: "Browse 150+ XPS & Torginol colors" },
  { key: "locations", label: "Find a Store", icon: MapPin, desc: "70+ XPS Xpress locations" },
  { key: "services", label: "Our Services", icon: Wrench, desc: "Full epoxy & concrete services" },
  { key: "reviews", label: "Reviews", icon: Star, desc: "See what customers say" },
  { key: "schedule", label: "Track Proposal", icon: Calendar, desc: "Schedule & track your visit" },
  { key: "chat", label: "Ask AI", icon: MessageSquare, desc: "Get instant answers" }
];

export default function EpoxyProGuide() {
  const appData = useAppData();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [tab, setTab] = useState("home");
  const [sub, setSub] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();

  const handleNavigate = (target) => {
    if (target.tab) { setTab(target.tab); setSub(null); }
    else if (target.sub) { setSub(target.sub); }
  };

  const handleBack = () => {
    setSub(null);
  };

  const meta = sub ? (TITLES[sub] || { eyebrow: "EPOXY PRO", title: "More" }) : (TITLES[tab] || TITLES.home);

  const renderSubScreen = () => {
    switch (sub) {
      case "colors": return <AppColors />;
      case "locations": return <AppLocations />;
      case "services": return <AppServices />;
      case "reviews": return <AppReviews />;
      case "schedule": return <AppSchedule appData={appData} />;
      case "trust-locations": return <TrustLocations />;
      case "trust-training": return <TrustTraining />;
      case "trust-products": return <TrustProducts />;
      case "trust-selection": return <TrustSelection />;
      case "trust-installers": return <TrustInstallers />;
      case "chat": setChatOpen(true); setSub(null); return null;
      default: return null;
    }
  };

  const renderTab = () => {
    switch (tab) {
      case "home": return <AppHome appData={appData} onNavigate={handleNavigate} />;
      case "visualizer": return <AppVisualizer appData={appData} />;
      case "estimate": return <AppEstimate appData={appData} />;
      case "gallery": return <AppGallery />;
      case "more":
        return (
          <div className="xa-band-inner space-y-4">
            {canInstall && !isInstalled && (
              <button onClick={promptInstall} className="xa-cta-gold">
                <Download className="w-5 h-5" /> Install App to Home Screen
              </button>
            )}
            <div className="space-y-2">
              {MORE_ITEMS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => m.key === "chat" ? setChatOpen(true) : setSub(m.key)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-amber-400 hover:shadow-md hover:bg-amber-50/50 transition text-left"
                >
                  <div className="h-11 w-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <m.icon className="h-5 w-5 text-amber-600" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-stone-900">{m.label}</div>
                    <div className="text-xs text-stone-500">{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => navigate("/")} className="w-full text-center text-xs text-stone-400">
              ← Back to main website
            </button>
            <Link to="/admin" className="w-full flex items-center gap-3 p-3 rounded-2xl border border-black bg-gradient-to-b from-amber-300 to-amber-600 hover:shadow-md hover:brightness-105 transition text-left">
              <div className="h-11 w-11 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5 text-stone-900" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-stone-900">Admin Sign In</div>
                <div className="text-xs text-stone-800">Dashboard, leads & settings</div>
              </div>
            </Link>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="vx-app-shell">
      <div className="vx-device-shell">
        {/* Promo bar */}
        {!sub && (
          <Link to="/funnel" className="block bg-stone-950 text-center py-1.5 px-4 shrink-0 border-b border-amber-600/40">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-400">
              10% Off Your Garage Floor Coating
            </span>
            <span className="mx-2 text-amber-600/60">|</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-300">
              Tap For Free Estimate
            </span>
          </Link>
        )}

        {/* Header — crest / eyebrow+title / actions */}
        <header className="vx-header">
          {sub ? (
            <button onClick={handleBack} className="vx-icon-btn" aria-label="Back">
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : tab !== "home" ? (
            <button onClick={() => setTab("home")} className="vx-icon-btn" aria-label="Back">
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={() => navigate("/")} className="vx-icon-btn" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="xa-header-center">
            <img src={LOGO_URL} alt="XPS" className="xa-header-crest" />
            <span className="xa-header-brand">Xtreme Polishing Systems</span>
          </div>
          <div className="vx-header__actions">
            <a href={`tel:${(settings.phone || "").replace(/[^\d+]/g, "")}`} className="xa-cta-gold" style={{ width: 'auto', minHeight: 40, padding: '0 14px', fontSize: 12, borderRadius: 10 }}>
              <Phone className="w-4 h-4" /> Call
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="vx-main flex-1" style={{ paddingBottom: 80 }}>
          {sub ? renderSubScreen() : renderTab()}
        </main>

        {/* Chat overlay */}
        {chatOpen && <AppChat onClose={() => setChatOpen(false)} />}

        {/* Bottom nav — 4 tabs + center FAB */}
        {!sub && !chatOpen && (
          <nav className="vx-bottom-nav" aria-label="Primary navigation">
            {TABS.slice(0, 2).map((t) => (
              <button
                key={t.key}
                className={tab === t.key ? "active" : undefined}
                onClick={() => setTab(t.key)}
              >
                <t.icon className="w-5 h-5" strokeWidth={tab === t.key ? 2.2 : 1.8} />
                <span>{t.label}</span>
              </button>
            ))}
            <button
              className="xa-nav-center"
              onClick={() => { setTab("estimate"); setSub(null); }}
              aria-label="Instant Bid"
            >
              <span className="xa-nav-center-btn">
                <Calculator className="w-6 h-6" strokeWidth={2.5} />
              </span>
              <span className="xa-nav-center-label">Bid</span>
            </button>
            {TABS.slice(2).map((t) => (
              <button
                key={t.key}
                className={tab === t.key ? "active" : undefined}
                onClick={() => setTab(t.key)}
              >
                <t.icon className="w-5 h-5" strokeWidth={tab === t.key ? 2.2 : 1.8} />
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}