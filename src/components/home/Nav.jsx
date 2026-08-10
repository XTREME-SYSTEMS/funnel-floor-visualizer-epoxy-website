import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

export default function Nav({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Color charts", to: "/color-charts" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className={`font-semibold tracking-tight text-base ${scrolled ? "text-stone-900" : "text-white"}`}>
          {settings.company_name}
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            l.to
              ? <Link key={l.label} to={l.to} className={`text-sm font-medium transition ${scrolled ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white"}`}>{l.label}</Link>
              : <a key={l.label} href={l.href} className={`text-sm font-medium transition ${scrolled ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white"}`}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${settings.phone}`} className={`flex items-center gap-1.5 text-sm font-medium ${scrolled ? "text-stone-600" : "text-white/80"}`}>
            <Phone className="h-4 w-4" /> {settings.phone}
          </a>
          <Link to="/funnel" className="h-9 px-5 inline-flex items-center rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold transition">
            Get Free Estimate
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? "text-stone-900" : "text-white"}`}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            l.to
              ? <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-stone-700">{l.label}</Link>
              : <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-stone-700">{l.label}</a>
          ))}
          <a href={`tel:${settings.phone}`} className="block text-sm font-medium text-stone-700">{settings.phone}</a>
          <Link to="/funnel" onClick={() => setOpen(false)} className="block h-10 text-center leading-10 rounded-lg bg-amber-500 text-stone-950 text-sm font-semibold">
            Get Free Estimate
          </Link>
        </div>
      )}
    </header>
  );
}