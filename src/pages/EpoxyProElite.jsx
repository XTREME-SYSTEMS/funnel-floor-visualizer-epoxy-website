import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2, Calendar, ClipboardList, Sparkles, Award,
  Eye, Shield, FileText, MessageSquare, Users, Bell,
  Download, Menu, X, Star, Gift, Phone, LogOut, Home,
  Cloud, ArrowRight, Clock, Heart as HeartIcon,
} from "lucide-react";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";
import { base44 } from "@/api/base44Client";

const TIMELINE_STEPS = [
  { icon: CheckCircle2, label: "Contract Signed & Deposit Paid", desc: "Your project is officially booked", done: true },
  { icon: Calendar, label: "Project Scheduled", desc: "Installation date set for Aug 30", done: true },
  { icon: ClipboardList, label: "Surface Preparation", desc: "Grinding, cleaning & crack repair", active: true },
  { icon: Sparkles, label: "Installation Day", desc: "Epoxy application & flake broadcast" },
  { icon: Clock, label: "Curing & Drying", desc: "24-48 hours of cure time" },
  { icon: Award, label: "Final Walkthrough", desc: "Quality check & handover" },
  { icon: Shield, label: "Warranty Activated", desc: "Your coverage begins" },
];

const PORTAL_ACTIONS = [
  { icon: Eye, label: "3D Preview", desc: "See your future floor" },
  { icon: Shield, label: "Warranty", desc: "View & extend coverage" },
  { icon: FileText, label: "Documents", desc: "Contracts & e-sign" },
  { icon: MessageSquare, label: "Messages", desc: "Text your crew" },
  { icon: Calendar, label: "Schedule", desc: "Book visits" },
  { icon: HeartIcon, label: "Color Chart", desc: "Your approved color" },
  { icon: Cloud, label: "Cloud Folder", desc: "All your files" },
  { icon: Users, label: "Your Team", desc: "PM, crew & installer" },
];

const MORE_ITEMS = [
  { icon: Star, label: "Rate & Settings", path: "/app-settings" },
  { icon: FileText, label: "Questionnaire", path: "/questionnaire" },
  { icon: Gift, label: "Refer & Earn", path: "/care/referral" },
  { icon: Phone, label: "Call Support", path: "tel:+18555555555" },
  { icon: LogOut, label: "Back to Site", path: "/" },
];

const BOTTOM_NAV = [
  { icon: Home, label: "Home", active: true },
  { icon: Eye, label: "Preview" },
  { icon: MessageSquare, label: "Messages" },
  { icon: FileText, label: "Files" },
  { icon: Bell, label: "More" },
];

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function EpoxyProElite() {
  const { isInstalled } = usePwaInstall();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50 flex flex-col">
      {/* Promo bar */}
      <div className="bg-black text-center py-1 border-b border-amber-500 sticky top-0 z-20">
        <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
          Your Free Client Portal · Above & Beyond Care
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
          <div className="flex flex-col items-start leading-none">
            <span className="text-[11px] font-extrabold text-stone-900">Client Portal</span>
            <span className="text-[7px] text-amber-600 font-bold tracking-wider uppercase">Xtreme AI Systems</span>
          </div>
        </div>
        <div
          className="h-8 px-2.5 rounded-lg flex items-center gap-1 text-[10px] font-bold"
          style={{ background: GOLD_GRADIENT, border: "2px solid #000", color: "#1a1a1a" }}
        >
          <Award className="h-3 w-3" /> 2/5
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 pb-20" style={{ scrollbarWidth: "none" }}>
        {/* Welcome */}
        <div className="px-1 pt-4 pb-2 text-center">
          <div className="w-14 h-14 mx-auto overflow-hidden">
            <Image src={XTREME_AI_ICON_URL} alt="XPS" className="w-full h-full" fittingType="fit" />
          </div>
          <h3 className="text-base font-black text-stone-900 leading-tight mt-1">Welcome, Sarah!</h3>
          <p className="text-[10px] text-stone-500 mt-0.5">123 Maple St · Garage · 528 sqft</p>
          {!user?.plan && (
            <Link
              to="/download?edition=client-care"
              className="mt-3 inline-flex h-9 px-5 items-center justify-center gap-1.5 rounded-xl text-[11px] font-bold transition"
              style={{ background: GOLD_GRADIENT, border: "2px solid #000", color: "#1a1a1a" }}
            >
              <Download className="h-3.5 w-3.5" /> Download Free App
            </Link>
          )}
          {isInstalled && (
            <p className="mt-2 text-[10px] font-semibold text-amber-600 flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> App installed
            </p>
          )}
        </div>

        {/* Step-by-step project timeline */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-bold text-stone-900 uppercase tracking-wide">Your Project Timeline</span>
            <span className="text-[9px] text-amber-600 font-bold">Step 3 of 7</span>
          </div>
          <div className="rounded-xl bg-white border border-stone-200 p-3">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={i}>
                {i > 0 && (
                  <div className={`ml-[15px] w-px h-4 ${step.done ? "bg-amber-400" : "bg-stone-200"}`} />
                )}
                <div className="flex items-start gap-2.5">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      step.done
                        ? "bg-gradient-to-b from-amber-200 to-amber-500 border border-amber-600"
                        : step.active
                        ? "border-2 border-amber-500 bg-amber-50 animate-pulse"
                        : "border border-stone-200 bg-stone-50"
                    }`}
                  >
                    <step.icon
                      className={`h-3.5 w-3.5 ${step.done ? "text-stone-900" : step.active ? "text-amber-600" : "text-stone-300"}`}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-bold ${
                          step.done ? "text-stone-900" : step.active ? "text-amber-600" : "text-stone-400"
                        }`}
                      >
                        {step.label}
                      </span>
                      {step.active && (
                        <span className="text-[7px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">LIVE</span>
                      )}
                      {step.done && <CheckCircle2 className="h-3 w-3 text-amber-500 ml-auto" />}
                    </div>
                    <p className={`text-[9px] mt-0.5 ${step.done || step.active ? "text-stone-500" : "text-stone-400"}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="pt-2">
          <div className="rounded-xl bg-stone-900 p-2.5 border border-amber-500">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wide">Overall Progress</span>
              <span className="text-[10px] font-bold text-white">43%</span>
            </div>
            <div className="h-2 rounded-full bg-stone-700 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: "43%", background: "linear-gradient(90deg, #FFF6D5, #D4AF37)" }}
              />
            </div>
          </div>
        </div>

        {/* Portal quick actions */}
        <div className="pt-3">
          <div className="text-[10px] font-bold text-stone-900 uppercase tracking-wide mb-2 px-1">Your Portal</div>
          <div className="grid grid-cols-4 gap-1.5">
            {PORTAL_ACTIONS.map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-0.5">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ background: GOLD_GRADIENT, border: "1.5px solid #000" }}
                >
                  <action.icon className="h-4 w-4 text-stone-900" strokeWidth={2} />
                </div>
                <span className="text-[7px] font-bold text-stone-700 text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Your project team */}
        <div className="pt-3">
          <div className="rounded-xl bg-white border border-stone-200 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Users className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[10px] font-bold text-stone-900">Your Project Team</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[9px]">
                <div>
                  <div className="font-semibold text-stone-900">Sarah J. · Project Manager</div>
                  <div className="text-stone-400">Your main point of contact</div>
                </div>
                <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <div className="flex items-center justify-between text-[9px]">
                <div>
                  <div className="font-semibold text-stone-900">Mike R. · Crew Leader & Installer</div>
                  <div className="text-stone-400">On-site for your installation</div>
                </div>
                <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Warranty card */}
        <div className="pt-2">
          <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Shield className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] font-bold text-amber-700">Warranty Center</span>
            </div>
            <div className="text-[9px] text-stone-700 leading-relaxed">
              Your 2-year warranty activates on completion. Tap to view details or purchase
              extended coverage up to 5 years.
            </div>
            <button
              className="mt-2 w-full h-8 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1"
              style={{ background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }}
            >
              View Warranty <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* CTA */}
        {!user?.plan && (
          <div className="pt-3">
            <Link
              to="/download?edition=client-care"
              className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold transition"
              style={{ background: GOLD_GRADIENT, border: "2px solid #000", color: "#1a1a1a" }}
            >
              <Download className="h-4 w-4" /> Download Your Free App <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
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
            <span className="text-[8px] font-semibold" style={{ color: n.active ? "#D9B835" : "#9CA3AF" }}>
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