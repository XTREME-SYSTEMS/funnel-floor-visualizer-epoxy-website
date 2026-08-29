import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Image as ImageIcon, Calculator, Grid, MoreHorizontal, ArrowLeft, MessageSquare, Palette, MapPin, Star, Wrench, Calendar, Download, Lock } from "lucide-react";
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
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { usePwaInstall } from "@/lib/usePwaInstall";

const TABS = [
  { key: "home", label: "Home", icon: Home },
  { key: "visualizer", label: "Visualizer", icon: ImageIcon },
  { key: "estimate", label: "Estimate", icon: Calculator },
  { key: "gallery", label: "Gallery", icon: Grid },
  { key: "more", label: "More", icon: MoreHorizontal }
];

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

  const renderSubScreen = () => {
    switch (sub) {
      case "colors": return <AppColors />;
      case "locations": return <AppLocations />;
      case "services": return <AppServices />;
      case "reviews": return <AppReviews />;
      case "schedule": return <AppSchedule appData={appData} />;
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
          <div className="p-4 pb-6">
            <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">More</h1>
            <p className="text-sm text-stone-500 mb-4">Everything else you need, all in one place.</p>
            {canInstall && !isInstalled && (
              <button
                onClick={promptInstall}
                className="w-full mb-3 h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/30"
              >
                <Download className="h-5 w-5" /> Install App to Home Screen
              </button>
            )}
            <div className="space-y-2">
              {MORE_ITEMS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => m.key === "chat" ? setChatOpen(true) : setSub(m.key)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-amber-300 transition text-left"
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
            <button onClick={() => navigate("/")} className="mt-6 w-full text-center text-xs text-stone-400">
              ← Back to main website
            </button>
            <Link to="/admin" className="mt-3 w-full flex items-center gap-3 p-3 rounded-2xl bg-stone-900 border border-stone-700 hover:border-amber-500 transition text-left">
              <div className="h-11 w-11 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Admin Sign In</div>
                <div className="text-xs text-stone-400">Dashboard, leads & settings</div>
              </div>
            </Link>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col max-w-md mx-auto relative shadow-2xl">
      {/* Promo bar — matches main site */}
      {!sub && (
        <Link to="/funnel" className="block bg-amber-500 text-stone-950 text-center text-[11px] font-bold tracking-wide py-1.5 shrink-0">
          🎉 10% OFF YOUR GARAGE FLOOR COATING — TAP TO GET YOUR FREE ESTIMATE
        </Link>
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-200 px-4 h-16 flex items-center justify-between shrink-0">
        {sub ? (
          <button onClick={handleBack} className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
        ) : tab !== "home" ? (
          <button onClick={() => setTab("home")} className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
        ) : (
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
        )}
        <a href={`tel:${settings.phone || "(877) 958-6408"}`} className="text-xs font-semibold text-amber-600">
          {settings.phone || "(877) 958-6408"}
        </a>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {sub ? renderSubScreen() : renderTab()}
      </main>

      {/* Floating chat button */}
      {!chatOpen && !sub && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-20 h-14 w-14 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 flex items-center justify-center z-40 animate-pop-bounce"
          style={{ right: "max(1rem, calc((100% - 28rem) / 2 + 1rem))" }}
        >
          <MessageSquare className="h-6 w-6 text-stone-950" />
        </button>
      )}

      {/* Chat overlay */}
      {chatOpen && <AppChat onClose={() => setChatOpen(false)} />}

      {/* Bottom tab bar — dark to match site footer/hero aesthetic */}
      {!sub && !chatOpen && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto bg-stone-950 border-t-2 border-amber-500 flex">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition ${tab === t.key ? "text-amber-500" : "text-stone-500"}`}
            >
              <t.icon className="h-5 w-5" strokeWidth={tab === t.key ? 2.2 : 1.8} />
              <span className="text-[10px] font-semibold">{t.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}