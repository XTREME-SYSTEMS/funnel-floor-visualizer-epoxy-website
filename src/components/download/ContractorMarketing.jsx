import React from "react";
import {
  Crosshair, Zap, Store, Image as ImageIcon, Bot, Calculator,
  Palette, TrendingUp, Clock, DollarSign, RefreshCw, BrainCircuit,
  CheckCircle2, X, ArrowRight, Award, Film, Sparkles,
  FileSpreadsheet, Truck, Users,
} from "lucide-react";
import { XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

const HIGHLIGHTS = [
  { icon: Crosshair, title: "Lead Scraping + CRM", text: "Automatically finds and scores high-intent leads in your service area — no cold calling, no list buying." },
  { icon: Zap, title: "BidFast™ Proposals", text: "Generate professional, accurate bids in seconds. Send branded proposals from the field." },
  { icon: Store, title: "Live Stock & Contractor Pricing", text: "Real-time inventory across 70+ XPS locations. Bulk contractor pricing on the full catalog." },
  { icon: ImageIcon, title: "Floor Visualizer", text: "Show clients exactly what their finished floor will look like before you start." },
  { icon: Bot, title: "AI Commercial Bidding", text: "First access to AI-powered commercial bidding for large-scale project estimates." },
  { icon: Award, title: "Loyalty & Rewards", text: "Earn points for social posts, redeem for discounts, swag, and exclusive access." },
];

const CAPABILITIES = [
  { icon: Crosshair, label: "Lead Scraper", desc: "Scrapes & scores residential + commercial leads automatically" },
  { icon: Zap, label: "Bid Generator", desc: "Professional bids with pricing ranges in seconds" },
  { icon: TrendingUp, label: "Daily Discounts", desc: "Real-time contractor pricing and flash deals" },
  { icon: Bot, label: "AI Tools", desc: "AI-assisted bidding and project estimation" },
  { icon: ImageIcon, label: "Visualizer", desc: "Before/after floor previews for clients" },
  { icon: Film, label: "Gallery", desc: "Project showcase and portfolio management" },
  { icon: Calculator, label: "Epoxy Calculator", desc: "Material coverage and cost calculator" },
  { icon: Palette, label: "Media Maker", desc: "Branded marketing content generator" },
];

const STATS = [
  { value: "12+", label: "hours saved per week", sub: "No more manual lead research, bid writing, or price lookups" },
  { value: "$2,400", label: "saved monthly", sub: "Eliminates lead lists, CRM subscriptions, and proposal software" },
  { value: "3x", label: "more bids sent", sub: "BidFast lets you send proposals from the field before you leave" },
  { value: "70+", label: "stocked locations", sub: "Live inventory and contractor pricing, always current" },
];

const OLD_VS_NEW = [
  { old: "Buying lead lists and cold-calling", neu: "AI scrapes and scores hot leads automatically" },
  { old: "Hand-writing bids for hours", neu: "BidFast generates proposals in seconds" },
  { old: "Calling stores for stock and pricing", neu: "Live stock and contractor pricing in your pocket" },
  { old: "Explaining what the floor will look like", neu: "Visualizer shows the finished result instantly" },
  { old: "Juggling 5+ software subscriptions", neu: "One synced system — leads, bids, pricing, rewards" },
  { old: "Manual follow-ups and reminders", neu: "Intelligent background system handles the busywork" },
];

const SYNC_TO = [
  { icon: Store, label: "XPS Catalog", desc: "Live stock + contractor pricing" },
  { icon: Users, label: "HubSpot CRM", desc: "Leads, contacts, and deals auto-synced" },
  { icon: FileSpreadsheet, label: "Your Pipeline", desc: "Lead status and bid tracking" },
  { icon: Truck, label: "70+ Store Locations", desc: "Inventory and fulfillment" },
];

export default function ContractorMarketing() {
  return (
    <div className="space-y-6 mb-6">
      {/* What It Is */}
      <div className="rounded-2xl bg-gradient-to-b from-stone-900 to-black p-6 text-center">
        <div className="w-16 h-16 mx-auto overflow-hidden mb-3">
          <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI" className="w-full h-full" fittingType="fit" />
        </div>
        <h2 className="text-lg font-black text-white">What Is the Contractor Edition?</h2>
        <p className="text-sm text-stone-400 mt-2 leading-relaxed">
          A fully synced, intelligent contractor command center that works in the background —
          scraping leads, generating bids, tracking stock, and managing your pipeline so you
          don't have to. No chatting, no distractions, no busywork. Just a system designed to
          run your business while you run your jobs.
        </p>
      </div>

      {/* Highlights */}
      <div>
        <h2 className="text-base font-black text-stone-900 mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-600" /> Key Highlights
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className="rounded-xl bg-white border border-stone-200 p-4 flex items-start gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: GOLD_GRADIENT, border: "1.5px solid #000" }}
              >
                <h.icon className="h-5 w-5 text-stone-900" strokeWidth={2} />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">{h.title}</div>
                <div className="text-xs text-stone-500 leading-relaxed mt-0.5">{h.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities & Functions */}
      <div>
        <h2 className="text-base font-black text-stone-900 mb-3 flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-amber-600" /> Capabilities & Functions
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {CAPABILITIES.map((c, i) => (
            <div key={i} className="rounded-xl bg-white border border-stone-200 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <c.icon className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-stone-900">{c.label}</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-snug">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Money & Time Saved */}
      <div>
        <h2 className="text-base font-black text-stone-900 mb-3 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-amber-600" /> Money & Time It Saves
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((s, i) => (
            <div key={i} className="rounded-xl bg-stone-900 p-4 text-center">
              <div className="text-2xl font-black text-amber-400">{s.value}</div>
              <div className="text-xs font-bold text-white mt-1">{s.label}</div>
              <div className="text-[10px] text-stone-400 mt-1 leading-tight">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Old School vs Xtreme AI */}
      <div>
        <h2 className="text-base font-black text-stone-900 mb-3 flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-amber-600" /> Old School vs. Xtreme AI
        </h2>
        <div className="space-y-2">
          {OLD_VS_NEW.map((row, i) => (
            <div key={i} className="rounded-xl bg-white border border-stone-200 p-3 flex items-center gap-3">
              <div className="flex-1 flex items-start gap-2">
                <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-xs text-stone-500 line-through">{row.old}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-amber-500 shrink-0" />
              <div className="flex-1 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-stone-900">{row.neu}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What It Syncs To */}
      <div>
        <h2 className="text-base font-black text-stone-900 mb-3 flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-amber-600" /> What It Syncs To
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {SYNC_TO.map((s, i) => (
            <div key={i} className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center gap-2">
              <s.icon className="h-5 w-5 text-amber-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-stone-900">{s.label}</div>
                <div className="text-[10px] text-stone-500">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Works in the Background */}
      <div className="rounded-2xl border-2 border-amber-500 bg-amber-50 p-5">
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit className="h-5 w-5 text-amber-600" />
          <h3 className="text-sm font-black text-amber-700 uppercase tracking-wide">Works in the Background</h3>
        </div>
        <p className="text-sm text-stone-700 leading-relaxed">
          The Contractor Edition is designed to run silently in the background — scraping leads,
          syncing inventory, tracking your pipeline, and preparing bids without interrupting you.
          No chatbots to talk to. No dashboards to babysit. It reduces the stress and time of
          old-school methods with a fully synced, intelligent system that does the busywork for you,
          so you can focus on the job in front of you.
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-700">
          <Clock className="h-4 w-4" /> Less screen time. More floor time.
        </div>
      </div>
    </div>
  );
}