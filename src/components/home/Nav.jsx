import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/Logo";

export default function Nav({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How it works", to: "/how-it-works" },
    { label: "Color charts", to: "/color-charts" },
    { label: "Gallery", to: "/gallery" },
    { label: "Reviews", to: "/reviews" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* 10% OFF promo bar — clickable to the estimate funnel */}
      <Link
        to="/funnel"
        className="block bg-amber-500 text-stone-950 text-center text-xs font-bold tracking-wide py-1.5 hover:bg-amber-400 transition"
      >
        🎉 10% OFF YOUR GARAGE FLOOR COATING — TAP TO GET YOUR FREE ESTIMATE
      </Link>

      <div className={`transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo colorClass={scrolled ? "text-stone-900" : "text-white"} />

          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              l.to
                ? <Link key={l.label} to={l.to} className={`text-sm font-medium transition ${scrolled ? "text-stone-700 hover:text-amber-500" : "text-white hover:text-amber-500"}`}>{l.label}</Link>
                : <a key={l.label} href={l.href} className={`text-sm font-medium transition ${scrolled ? "text-stone-700 hover:text-amber-500" : "text-white hover:text-amber-500"}`}>{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex flex-col items-start gap-0.5 mt-4">
            <Link to="/funnel" className="h-9 px-5 inline-flex items-center rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold transition">
              Get Free Estimate
            </Link>
            <a href={`tel:${settings.phone}`} className={`flex items-center gap-1.5 text-sm font-semibold transition ${scrolled ? "text-stone-700 hover:text-amber-500" : "text-white hover:text-amber-500"}`}>
              <Phone className="h-4 w-4" /> {settings.phone}
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? "text-stone-900" : "text-white"}`}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
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