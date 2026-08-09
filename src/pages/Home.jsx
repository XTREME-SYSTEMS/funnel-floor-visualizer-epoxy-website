import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "@/lib/useSettings";
import { trackEvent } from "@/lib/tracking";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import WinMore from "@/components/home/WinMore";
import BeforeAfterShowcase from "@/components/home/BeforeAfterShowcase";
import LeadCapture from "@/components/home/LeadCapture";
import MobileSection from "@/components/home/MobileSection";
import Gallery from "@/components/home/Gallery";
import Reviews from "@/components/home/Reviews";
import SalespersonProfile from "@/components/home/SalespersonProfile";
import FAQ from "@/components/home/FAQ";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  const { settings } = useSettings();

  useEffect(() => {
    trackEvent("page_view", { page: "/" });
  }, []);

  return (
    <div className="bg-white">
      <Nav settings={settings} />

      <Hero settings={settings} />

      <WinMore />
      <BeforeAfterShowcase />
      <LeadCapture />
      <MobileSection />
      <Gallery items={settings.gallery} />
      <Reviews settings={settings} />
      <SalespersonProfile settings={settings} />
      <FAQ />
      <FinalCta settings={settings} />

      <footer className="bg-stone-950 text-stone-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 justify-between text-sm">
          <div>
            <div className="text-white font-semibold">{settings.company_name}</div>
            <div className="mt-1">{settings.phone} · {settings.email}</div>
            <div className="mt-1">{settings.service_area}</div>
          </div>
          <div className="flex flex-col gap-1 sm:items-end">
            <Link to="/epoxy-garage-floor-cost/" className="hover:text-white">Epoxy Garage Floor Cost</Link>
            <Link to="/2-car-garage-epoxy-cost/" className="hover:text-white">2-Car Garage Epoxy Cost</Link>
            <Link to="/3-car-garage-epoxy-cost/" className="hover:text-white">3-Car Garage Epoxy Cost</Link>
            <Link to="/garage-floor-coating-cost/" className="hover:text-white">Garage Floor Coating Cost</Link>
            <Link to="/fl/pompano-beach/" className="hover:text-white">Pompano Beach, FL</Link>
            <Link to="/admin" className="hover:text-white mt-2">Team login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}