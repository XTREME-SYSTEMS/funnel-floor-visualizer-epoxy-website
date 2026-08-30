import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  ArrowLeft, Menu, X, Home, Crosshair, Zap, Film, Award,
  Star, FileText, Gift, LogOut, Phone, ChevronRight,
} from "lucide-react";
import { LOGO_URL } from "@/components/Logo";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/elite" },
  { icon: Crosshair, label: "Leads", path: "/elite" },
  { icon: Zap, label: "Bid", path: "/elite" },
  { icon: Film, label: "Gallery", path: "/elite" },
  { icon: Menu, label: "More", path: "__more__" },
];

const MORE_ITEMS = [
  { icon: Star, label: "Rate & Settings", path: "/app-settings" },
  { icon: FileText, label: "Questionnaire", path: "/questionnaire" },
  { icon: Gift, label: "Redeem Code", path: "/download?edition=contractor" },
  { icon: Phone, label: "Call Support", path: "tel:+18555555555" },
  { icon: LogOut, label: "Back to Site", path: "/" },
];

/**
 * Dark high-tech device-frame shell for the Xtreme AI Contractor Edition.
 * Uses the xa- design system: dark #030303 background, electric yellow
 * metallic gold accents, brandbar + scrollable main + bottom tab nav.
 */
export default function ContractorShell({ children, title = "Xtreme AI Contractor" }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (item) => {
    if (item.path === "__more__") {
      setDrawerOpen(true);
    } else if (item.path.startsWith("tel:")) {
      window.location.href = item.path;
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="xa-stage">
      <div className="xa-device">
        <div className="xa-screen">
          {/* Brandbar */}
          <div className="xa-brandbar">
            <button onClick={() => navigate(-1)} className="xa-back-btn" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="xa-brandbar-left">
              <img src={LOGO_URL} alt="XPS" className="xa-brandbar-logo" />
              <span className="xa-brandbar-name">{title}</span>
            </div>
            <button onClick={() => setDrawerOpen(true)} className="xa-icon-btn" aria-label="Menu">
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Main content */}
          <div className="xa-main">{children}</div>

          {/* Bottom tab nav */}
          <div className="xa-nav">
            {NAV_ITEMS.map((item) => {
              const active = item.path !== "__more__" && location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className={active ? "active" : ""}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* More drawer */}
          {drawerOpen && <MoreDrawer onClose={() => setDrawerOpen(false)} />}
        </div>
      </div>
    </div>
  );
}

function MoreDrawer({ onClose }) {
  const location = useLocation();
  return (
    <div className="xa-drawer-overlay" onClick={onClose}>
      <div className="xa-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="xa-drawer-header">
          <h3>More</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="xa-drawer-list">
          {MORE_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            const isTel = item.path.startsWith("tel:");
            if (isTel) {
              return (
                <a key={item.label} href={item.path}>
                  <item.icon className="h-4 w-4" /> {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} to={item.path} className={active ? "active" : ""}>
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}