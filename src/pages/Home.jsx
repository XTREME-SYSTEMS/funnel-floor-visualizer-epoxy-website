import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "@/lib/useSettings";
import { trackEvent } from "@/lib/tracking";
import Hero from "@/components/home/Hero";
import Gallery from "@/components/home/Gallery";
import HowItWorks from "@/components/home/HowItWorks";
import Reviews from "@/components/home/Reviews";
import Benefits from "@/components/home/Benefits";
import FAQ from "@/components/home/FAQ";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  const { settings } = useSettings();

  useEffect(() => {
    trackEvent("visitor_landed");
  }, []);

  return (
    <div className="bg-white">
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-white font-semibold tracking-tight">{settings.company_name}</span>
          <a href={`tel:${settings.phone}`} className="text-sm text-white/80 hover:text-white">{settings.phone}</a>
        </div>
      </header>

      <Hero settings={settings} />
      <Gallery items={settings.gallery} />
      <HowItWorks />
      <Reviews settings={settings} />
      <Benefits />
      <FAQ />
      <CtaBand settings={settings} />

      <footer className="bg-stone-950 text-stone-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 justify-between text-sm">
          <div>
            <div className="text-white font-semibold">{settings.company_name}</div>
            <div className="mt-1">{settings.phone} · {settings.email}</div>
            <div className="mt-1">{settings.service_area}</div>
          </div>
          <Link to="/admin" className="hover:text-white self-start sm:self-end">Team login</Link>
        </div>
      </footer>
    </div>
  );
}