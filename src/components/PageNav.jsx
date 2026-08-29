import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { useSettings } from "@/lib/useSettings";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Color charts", to: "/color-charts" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Locations", to: "/locations" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function PageNav() {
  const [open, setOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-stone-950/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 text-sm text-stone-300 hover:text-white transition"
            aria-label="Go back"
          >
            <span className="text-lg leading-none">&larr;</span>
            <span className="hidden sm:inline font-medium">Back</span>
          </button>
          <span className="h-5 w-px bg-white/15" />
          <Logo colorClass="text-white" />
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.phone}`}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-stone-200 hover:text-amber-500 transition"
          >
            <Phone className="h-4 w-4" /> {settings.phone}
          </a>
          <Link
            to="/funnel"
            className="hidden sm:inline-flex h-9 px-5 items-center rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold transition"
          >
            Free Estimate
          </Link>
          <div className="flex items-center gap-2 sm:hidden">
            <a href={`tel:${settings.phone}`} className="flex h-9 items-center gap-1.5 px-3 rounded-lg text-xs font-bold transition" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', color: '#1a1a1a', boxShadow: '0 3px 8px rgba(255,215,0,.35), inset 0 1px rgba(255,255,255,.4)' }}>
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="hidden sm:block text-white p-1"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-stone-950 border-t border-white/10 px-6 py-4 space-y-1 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-stone-200 hover:text-amber-500"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/funnel"
            onClick={() => setOpen(false)}
            className="block mt-2 h-11 text-center leading-11 rounded-lg bg-amber-500 text-stone-950 text-sm font-semibold"
          >
            Get Free Estimate
          </Link>
        </div>
      )}
    </header>
  );
}