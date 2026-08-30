import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Download, ClipboardList, MessageSquare, Calendar, Heart,
  Sparkles, ArrowRight, CheckCircle2, Gift, Trophy, Shield,
  Bell, Star,
} from "lucide-react";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";

const FEATURES = [
  { icon: ClipboardList, title: "Live Project Tracker", text: "Real-time updates at every stage — from scheduling to completion — with photos at each milestone." },
  { icon: MessageSquare, title: "Group Messaging", text: "Chat directly with your project team. No phone tag — everyone in one place." },
  { icon: Calendar, title: "Smart Scheduling", text: "Book consultations, follow-ups, and maintenance visits with reminders via push, SMS & email." },
  { icon: Heart, title: "Before & After Gallery", text: "Your project photos front and center, plus the full XPS color chart with your approved color." },
  { icon: Sparkles, title: "Custom Maintenance Plan", text: "A tailored care guide for your specific floor — delivered via email, SMS, and in-app." },
  { icon: Gift, title: "Refer & Earn Rewards", text: "Refer 5 friends who book and unlock a custom cleaning kit with 1 year of special solution." },
];

const REFERRAL_PERKS = [
  { icon: Gift, text: "Refer 1 friend — earn an XPS branded t-shirt" },
  { icon: Star, text: "Refer 3 friends — unlock an XPS swag kit + sticker pack" },
  { icon: Trophy, text: "Refer 5 friends — get a custom cleaning kit + 1 year of special solution (a $500+ value)" },
  { icon: Sparkles, text: "Track your referrals and progress right in the app" },
  { icon: Bell, text: "Get notified when your friends book" },
  { icon: Shield, text: "Warranty tracking and seasonal care reminders included" },
];

const HOME_BUTTONS = [
  { icon: ClipboardList, label: "Project" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Heart, label: "Gallery" },
  { icon: Calendar, label: "Schedule" },
  { icon: Sparkles, label: "Care Plan" },
  { icon: Gift, label: "Refer" },
  { icon: Shield, label: "Warranty" },
  { icon: Bell, label: "Updates" },
];

export default function EliteSection() {
  const navigate = useNavigate();
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();

  const handleDownload = async () => {
    if (canInstall && !isInstalled) {
      await promptInstall();
    }
    navigate("/download?edition=client-care");
  };

  return (
    <section className="bg-gradient-to-b from-stone-950 to-black py-20 md:py-28 px-6 border-t-2 border-amber-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy + features + referral program */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 overflow-hidden">
              <Image src={XTREME_AI_ICON_URL} alt="XPS Client Care" className="w-full h-full" fittingType="fit" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-amber-500">DOWNLOAD THE APP</div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                XPS Client Care App
              </h2>
            </div>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Specifically designed for our clients — to provide above-average care and to go above
            and beyond. Stay updated on your project, message your team, access your maintenance
            plan, and earn rewards. Your personal floor care hub, always in your pocket.
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

          {/* Referral program */}
          <div className="mt-7 rounded-2xl border-2 border-amber-500 bg-amber-500/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-bold text-amber-400 tracking-wide uppercase">
                Refer & Earn — Above & Beyond Rewards
              </span>
            </div>
            <ul className="space-y-2.5">
              {REFERRAL_PERKS.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-200 leading-relaxed">
                  <p.icon className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-stone-500 italic">
              Details and point values subject to change — full terms available in-app.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/download?edition=client-care"
              className="inline-flex h-12 px-8 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition animate-pop-bounce"
            >
              <Download className="h-5 w-5" /> Download Client Care App
            </Link>
            <Link
              to="/funnel"
              className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition"
            >
              Start an estimate
            </Link>
          </div>
          {isInstalled && (
            <p className="mt-3 text-xs text-amber-500 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> App installed — tap to open
            </p>
          )}
        </div>

        {/* Right: phone mockup with Client Care home screen */}
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[620px] rounded-[2.75rem] border-[10px] border-stone-800 bg-white overflow-hidden shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-white flex items-center justify-center z-20">
              <div className="h-1.5 w-16 rounded-full bg-stone-300" />
            </div>

            {/* Promo bar */}
            <div className="absolute top-7 inset-x-0 bg-black text-center py-0.5 border-b border-amber-500 z-10">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Above & Beyond Care
              </span>
            </div>

            {/* Header */}
            <div className="absolute top-[44px] inset-x-0 h-14 px-3 flex items-center justify-between border-b border-stone-200 bg-white z-10">
              <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center">
                <span className="text-stone-400 text-xs">‹</span>
              </div>
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <img src={LOGO_URL} alt="XPS" className="h-7 w-7 object-contain" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-extrabold text-stone-900">XPS Client Care</span>
                  <span className="text-[7px] text-amber-600 font-bold tracking-wider uppercase">Above & Beyond</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center">
                <Bell className="h-3.5 w-3.5 text-stone-600" />
              </div>
            </div>

            {/* Scrollable app content */}
            <div className="absolute top-[100px] inset-x-0 bottom-[60px] overflow-hidden bg-gradient-to-b from-white to-stone-50">
              {/* Hero */}
              <div className="px-4 pt-4 pb-3 text-center">
                <div className="w-14 h-14 mx-auto overflow-hidden">
                  <Image src={XTREME_AI_ICON_URL} alt="XPS" className="w-full h-full" fittingType="fit" />
                </div>
                <h3 className="text-base font-black text-stone-900 leading-tight mt-1">Welcome, Sarah!</h3>
                <p className="text-[10px] text-stone-500 mt-0.5">Your project care hub</p>
              </div>

              {/* Project status card */}
              <div className="px-3 pt-1">
                <div className="rounded-xl bg-stone-900 p-2.5 border border-amber-500">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ClipboardList className="h-3 w-3 text-amber-400" />
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wide">Your Project</span>
                  </div>
                  <div className="text-[10px] text-white font-bold">123 Maple St · Garage</div>
                  <div className="text-[8px] text-stone-400">Installation in progress</div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-stone-700 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg, #FFF6D5, #D4AF37)' }} />
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="px-3 pt-2">
                <div className="grid grid-cols-4 gap-1.5">
                  {HOME_BUTTONS.slice(0, 4).map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-0.5">
                      <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)', border: '1.5px solid #000' }}>
                        <b.icon className="h-4 w-4 text-stone-900" strokeWidth={2} />
                      </div>
                      <span className="text-[7px] font-bold text-stone-700 text-center leading-tight">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referral card */}
              <div className="px-3 pt-2">
                <div className="rounded-xl p-2.5" style={{ background: 'linear-gradient(135deg, #FFF6D5, #F0DB8A)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Gift className="h-3 w-3 text-amber-700" />
                    <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wide">Refer & Earn</span>
                  </div>
                  <div className="text-[9px] text-amber-900">2/5 referrals — 3 more for your cleaning kit!</div>
                  <div className="mt-1 h-1.5 rounded-full bg-amber-200 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '40%', background: 'linear-gradient(90deg, #FFF6D5, #D4AF37)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="absolute bottom-0 inset-x-0 h-[60px] grid grid-cols-5 border-t border-stone-200 bg-white/96 backdrop-blur z-10 px-2 pb-1.5 pt-1">
              {[
                { icon: ClipboardList, label: "Home", active: true },
                { icon: ClipboardList, label: "Project" },
                { icon: MessageSquare, label: "Messages" },
                { icon: Heart, label: "Gallery" },
                { icon: Bell, label: "More" },
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