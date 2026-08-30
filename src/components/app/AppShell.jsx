import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  ArrowLeft, Menu, X, Home, Star, FileText, Gift,
  LogOut, ChevronRight, Phone
} from "lucide-react";
import { LOGO_URL } from "@/components/Logo";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/elite" },
  { icon: Star, label: "Rate & Settings", path: "/app-settings" },
  { icon: FileText, label: "Questionnaire", path: "/questionnaire" },
  { icon: Gift, label: "Redeem Code", path: "/redeem" },
];

export default function AppShell({ children, title = "Xtreme AI", showPhone = true }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header — back arrow LEFT, hamburger RIGHT */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-stone-700 hover:border-amber-500 hover:text-amber-600 transition shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <Link to="/elite" className="flex items-center gap-2 min-w-0 flex-1 justify-center">
            <img src={LOGO_URL} alt="XPS" className="h-7 w-7 object-contain shrink-0" />
            <span className="font-bold text-stone-900 text-sm truncate">{title}</span>
          </Link>

          <button
            onClick={() => setDrawerOpen(true)}
            className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-stone-700 hover:border-amber-500 hover:text-amber-600 transition shrink-0"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Page content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </div>

      {/* Drawer — slides in from the RIGHT */}
      {drawerOpen && <Drawer onClose={() => setDrawerOpen(false)} showPhone={showPhone} />}
    </div>
  );
}

function Drawer({ onClose, showPhone }) {
  const location = useLocation();
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col">
        <div className="h-14 flex items-center justify-between px-4 border-b border-stone-200">
          <span className="font-bold text-stone-900">Menu</span>
          <button onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-500 hover:bg-stone-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition ${
                  active ? "bg-amber-50 text-amber-700" : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                <item.icon className={`h-5 w-5 ${active ? "text-amber-600" : "text-stone-500"}`} />
                <span className="font-semibold text-sm">{item.label}</span>
                <ChevronRight className="h-4 w-4 ml-auto text-stone-400" />
              </Link>
            );
          })}
        </nav>
        {showPhone && (
          <a
            href="tel:+18555555555"
            className="mx-3 mb-2 h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold bg-stone-900 text-white"
          >
            <Phone className="h-4 w-4" /> Call Support
          </a>
        )}
        <div className="p-3 border-t border-stone-200">
          <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-xl text-stone-500 hover:bg-stone-100 transition">
            <LogOut className="h-5 w-5" />
            <span className="font-semibold text-sm">Back to Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}