import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  Home, ClipboardList, MessageSquare, Image as ImageIcon,
  Calendar, Sparkles, Gift, Settings, Phone, LogOut, Menu, X,
  ChevronLeft, Bell,
} from "lucide-react";
import { LOGO_URL } from "@/components/Logo";

const BOTTOM_NAV = [
  { icon: Home, label: "Home", path: "/care" },
  { icon: ClipboardList, label: "Project", path: "/care/project" },
  { icon: MessageSquare, label: "Messages", path: "/care/messages" },
  { icon: ImageIcon, label: "Gallery", path: "/care/gallery" },
];

const MORE_ITEMS = [
  { icon: Calendar, label: "Schedule", path: "/care/schedule" },
  { icon: Sparkles, label: "Maintenance", path: "/care/maintenance" },
  { icon: Gift, label: "Refer & Earn", path: "/care/referral" },
  { icon: Settings, label: "Settings", path: "/care/settings" },
  { icon: Phone, label: "Call Support", path: "tel:+18555555555" },
  { icon: LogOut, label: "Back to Site", path: "/" },
];

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function ClientCareShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/care") return location.pathname === "/care";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col max-w-[450px] mx-auto relative">
      {/* Header */}
      <div className="h-14 px-3 flex items-center justify-between border-b border-stone-200 bg-white sticky top-0 z-30">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5 text-stone-600" />
        </button>
        <div className="flex items-center gap-2 flex-1 justify-center">
          <img src={LOGO_URL} alt="XPS" className="h-7 w-7 object-contain" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-[11px] font-extrabold text-stone-900">XPS Client Care</span>
            <span className="text-[8px] text-amber-600 font-bold tracking-wider uppercase">Above & Beyond</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center relative">
            <Bell className="h-4 w-4 text-stone-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center"
          >
            <Menu className="h-4 w-4 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-y-auto pb-20" style={{ scrollbarWidth: "none" }}>
        <Outlet />
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] h-[64px] grid grid-cols-5 border-t border-stone-200 bg-white/96 backdrop-blur z-30 px-2 pb-1.5 pt-1.5">
        {BOTTOM_NAV.map((n, i) => {
          const active = isActive(n.path);
          return (
            <button
              key={i}
              onClick={() => navigate(n.path)}
              className="flex flex-col items-center gap-0.5"
            >
              <n.icon
                className="h-5 w-5"
                style={{ color: active ? "#B8860B" : "#9CA3AF" }}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className="text-[8px] font-semibold"
                style={{ color: active ? "#B8860B" : "#9CA3AF" }}
              >
                {n.label}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5"
        >
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center"
            style={{ background: GOLD_GRADIENT, border: "1.5px solid #000" }}
          >
            <Menu className="h-3.5 w-3.5 text-stone-900" />
          </div>
          <span className="text-[8px] font-semibold text-stone-500">More</span>
        </button>
      </div>

      {/* More drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setDrawerOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full max-w-[450px] bg-white rounded-t-2xl border-t border-stone-200 max-h-[70%] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-stone-200">
              <h3 className="text-sm font-bold text-stone-900">More</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto">
              {MORE_ITEMS.map((item) => {
                const isTel = item.path.startsWith("tel:");
                const content = (
                  <>
                    <item.icon className="h-4 w-4" /> {item.label}
                  </>
                );
                const cls =
                  "border border-stone-200 rounded-xl p-3 flex items-center gap-2 text-xs font-medium text-stone-600 hover:border-amber-500 hover:text-amber-600 transition";
                if (isTel) {
                  return (
                    <a key={item.label} href={item.path} className={cls}>
                      {content}
                    </a>
                  );
                }
                return (
                  <Link key={item.label} to={item.path} className={cls} onClick={() => setDrawerOpen(false)}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}