import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Download, Crosshair, Zap, DollarSign, Image as ImageIcon, Award,
  Video, Trophy, GraduationCap, Shirt, Sparkles, ArrowRight, CheckCircle2,
  TrendingUp, Bot, Palette, Calculator, Film, Store
} from "lucide-react";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";

const FEATURES = [
  { icon: Crosshair, title: "Lead Scraping System", text: "Intelligent CRM that scrapes and scores high-intent residential & commercial leads in your area — automatically." },
  { icon: Zap, title: "BidFast System", text: "Generate professional, accurate bids in seconds. Send proposals from the field and close deals faster." },
  { icon: Store, title: "Contractor Pricing", text: "Real-time stock levels and bulk contractor pricing on the full XPS product catalog." },
  { icon: ImageIcon, title: "Floor Visualizer", text: "Show clients exactly what their floor will look like before you ever mix a batch." },
  { icon: Bot, title: "AI Commercial Bidding", text: "First access to our AI Commercial Bidding System for large-scale project estimates." },
];

const LOYALTY_PERKS = [
  { icon: Video, text: "Earn points every time you post a video on social media using our products and tag us" },
  { icon: DollarSign, text: "Redeem points for exclusive contractor discounts on bulk orders" },
  { icon: Bot, text: "First access to our AI Commercial Bidding System" },
  { icon: GraduationCap, text: "Access to a 1-hour advanced AI training course" },
  { icon: Shirt, text: "Earn XPS-branded t-shirts, gifts, and swag" },
  { icon: Trophy, text: "Qualify for the Friday Epoxy Rockstar Showcase — top loyal customers with the best floors get featured to hundreds of thousands of viewers nationwide" },
  { icon: Sparkles, text: "Plus so much more — new rewards added regularly" },
];

const HOME_BUTTONS = [
  { icon: Crosshair, label: "Get Leads" },
  { icon: TrendingUp, label: "Daily Discounts" },
  { icon: Bot, label: "AI Tools" },
  { icon: ImageIcon, label: "Visualizer" },
  { icon: Zap, label: "Bid Generator" },
  { icon: Film, label: "Gallery" },
  { icon: Calculator, label: "Epoxy Calculator" },
  { icon: Palette, label: "Media Maker" },
];

export default function EliteSection() {
  const navigate = useNavigate();
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();

  const handleDownload = async () => {
    if (canInstall && !isInstalled) {
      await promptInstall();
    }
    navigate("/elite");
  };

  return (
    <section className="bg-gradient-to-b from-stone-950 to-black py-20 md:py-28 px-6 border-t-2 border-amber-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy + features + loyalty fine print */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 overflow-hidden">
              <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI Systems" className="w-full h-full" fittingType="fit" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-amber-500">DOWNLOAD THE APP</div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                Epoxy Pro Elite
              </h2>
            </div>
          </div>
          <p className="text-stone-400 leading-relaxed">
            The ultimate contractor toolkit — scrape leads, generate bids in seconds, access bulk
            contractor pricing, visualize floors, and get rewarded for doing what you already do.
            Built for the pros who grind.
          </p>

          {/* Feature grid */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{f.title}</div>
                  <div className="text-xs text-stone-400 leading-relaxed mt-0.5">{f.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Loyalty program fine print */}
          <div className="mt-7 rounded-2xl border-2 border-amber-500 bg-amber-500/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-bold text-amber-400 tracking-wide uppercase">Contractor Loyalty & Rewards</span>
            </div>
            <ul className="space-y-2.5">
              {LOYALTY_PERKS.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-200 leading-relaxed">
                  <p.icon className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-stone-500 italic">
              Details and point values subject to change — full terms available in-app. We'll be
              refining these rewards as the program grows.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button onClick={handleDownload} className="inline-flex h-12 px-8 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition animate-pop-bounce">
              <Download className="h-5 w-5" /> Download Epoxy Pro Elite
            </button>
            <Link to="/funnel" className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition">
              Start an estimate
            </Link>
          </div>
          {isInstalled && (
            <p className="mt-3 text-xs text-amber-500 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> App installed — tap to open
            </p>
          )}
        </div>

        {/* Right: phone mockup with contractor home screen */}
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[620px] rounded-[2.75rem] border-[10px] border-stone-800 bg-white overflow-hidden shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-white flex items-center justify-center z-20">
              <div className="h-1.5 w-16 rounded-full bg-stone-300" />
            </div>

            {/* Promo bar */}
            <div className="absolute top-7 inset-x-0 bg-black text-center py-0.5 border-b border-amber-500 z-10">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Contractor Elite · Bulk Pricing Inside
              </span>
            </div>

            {/* Header */}
            <div className="absolute top-[44px] inset-x-0 h-14 px-3 flex items-center justify-between border-b border-stone-200 bg-white z-10">
              <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center">
                <span className="text-stone-400 text-xs">☰</span>
              </div>
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <img src={LOGO_URL} alt="XPS" className="h-7 w-7 object-contain" />
                <span className="text-[11px] font-extrabold text-stone-900">Epoxy Pro Elite</span>
              </div>
              <div className="h-8 px-2.5 rounded-lg flex items-center gap-1 text-[10px] font-bold" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '2px solid #000', color: '#1a1a1a' }}>
                <Award className="h-3 w-3" /> 1,250 pts
              </div>
            </div>

            {/* Scrollable app content */}
            <div className="absolute top-[100px] inset-x-0 bottom-[60px] overflow-hidden bg-gradient-to-b from-white to-stone-50">
              {/* Hero */}
              <div className="px-4 pt-4 pb-3 text-center">
                <div className="w-14 h-14 mx-auto overflow-hidden">
                  <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI" className="w-full h-full" fittingType="fit" />
                </div>
                <h3 className="text-base font-black text-stone-900 leading-tight mt-1">Epoxy Home AI</h3>
                <p className="text-[10px] text-stone-500 mt-0.5">Your contractor command center</p>
              </div>

              {/* Home buttons grid */}
              <div className="px-3 pt-1">
                <div className="grid grid-cols-4 gap-1.5">
                  {HOME_BUTTONS.map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-0.5">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)', border: '1.5px solid #000' }}>
                        <b.icon className="h-4 w-4 text-stone-900" strokeWidth={2} />
                      </div>
                      <span className="text-[7px] font-bold text-stone-700 text-center leading-tight">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead scraper card */}
              <div className="px-3 pt-3">
                <div className="rounded-xl bg-stone-900 p-2.5 border border-amber-500">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Crosshair className="h-3 w-3 text-amber-400" />
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wide">Lead Scraper</span>
                  </div>
                  <div className="text-[10px] text-white font-bold">14 new leads today</div>
                  <div className="text-[8px] text-stone-400">3 hot · 6 warm · 5 cold</div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-stone-700 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, #FFE25A, #FFD700)' }} />
                  </div>
                </div>
              </div>

              {/* BidFast card */}
              <div className="px-3 pt-2">
                <div className="rounded-xl bg-white border-2 border-black p-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-[10px] font-bold text-stone-900">BidFast™</span>
                    </div>
                    <span className="text-[8px] text-stone-400">3 bids sent</span>
                  </div>
                  <div className="text-[9px] text-stone-500 mt-1">2,400 sqft · 3-car garage</div>
                  <div className="text-[11px] font-extrabold text-stone-900">$8,400 – $9,600</div>
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="absolute bottom-0 inset-x-0 h-[60px] grid grid-cols-5 border-t border-stone-200 bg-white/96 backdrop-blur z-10 px-2 pb-1.5 pt-1">
              {[
                { icon: Crosshair, label: "Leads", active: true },
                { icon: ImageIcon, label: "Visualizer" },
                { icon: Zap, label: "Bid" },
                { icon: Film, label: "Gallery" },
                { icon: Award, label: "Rewards" },
              ].map((n, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <n.icon className="h-4 w-4" style={{ color: n.active ? '#D9B835' : '#9CA3AF' }} strokeWidth={n.active ? 2.2 : 1.8} />
                  <span className="text-[8px] font-semibold" style={{ color: n.active ? '#D9B835' : '#9CA3AF' }}>{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}