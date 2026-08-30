import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Download, ClipboardList, MessageSquare, Calendar, Heart,
  Sparkles, ArrowRight, CheckCircle2, Gift, Trophy, Shield,
  Bell, Star, FileText, Users, Cloud, Eye, Award,
} from "lucide-react";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";

const FEATURES = [
  { icon: Eye, title: "3D Visual Preview", text: "See your future floor in stunning, accurate detail before we ever start — your exact color, your exact space." },
  { icon: Shield, title: "Warranty Center", text: "Full warranty info at your fingertips. Browse and purchase extended coverage with one tap." },
  { icon: FileText, title: "Digital Contracts & E-Sign", text: "Sign, store, and access all your documents digitally. Your personal project folder lives in the cloud — always findable." },
  { icon: Users, title: "Your Project Team", text: "Meet your assigned project manager, crew leader, and installer — with direct messaging to all of them." },
  { icon: MessageSquare, title: "Text & Email Powered by Google", text: "Stay in the loop with real-time updates via text, email, Google Calendar, and Google Drive integration." },
  { icon: Heart, title: "Color Chart & Gallery", text: "Your approved color front and center, plus the full XPS color chart and your before & after photos." },
];

const PORTAL_FEATURES = [
  { icon: Gift, text: "Refer friends and earn rewards — cleaning kits, swag, and exclusive perks" },
  { icon: Trophy, text: "Track your referral progress and unlock tiers as your friends book their projects" },
  { icon: Sparkles, text: "Above & Beyond care — we partner with you for the life of your floor" },
  { icon: Shield, text: "Warranty tracking and seasonal maintenance reminders included free" },
  { icon: Bell, text: "Get notified at every project milestone — from prep to final walkthrough" },
  { icon: Cloud, text: "All your important documents in one secure cloud folder — never lose paperwork again" },
];

const TIMELINE_STEPS = [
  { icon: CheckCircle2, label: "Contract Signed", done: true },
  { icon: Calendar, label: "Scheduled", done: true },
  { icon: ClipboardList, label: "Prep", active: true },
  { icon: Sparkles, label: "Install" },
  { icon: Award, label: "Complete" },
];

export default function EliteSection() {
  const navigate = useNavigate();
  const { isInstalled } = usePwaInstall();

  return (
    <section className="bg-gradient-to-b from-stone-950 to-black py-20 md:py-28 px-6 border-t-2 border-amber-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy + features */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 overflow-hidden">
              <Image src={XTREME_AI_ICON_URL} alt="XPS Client Portal" className="w-full h-full" fittingType="fit" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-amber-500">FREE DOWNLOAD</div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                XPS Client Portal App
              </h2>
            </div>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Your personal project hub — designed to give you the highest-quality experience you've
            come to expect from Xtreme Polishing Systems and National Concrete Polishing. Track your
            project step-by-step from contract to completion, message your crew directly, access all
            your documents in the cloud, and visualize your future floor before we even start.
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

          {/* Portal features */}
          <div className="mt-7 rounded-2xl border-2 border-amber-500 bg-amber-500/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-bold text-amber-400 tracking-wide uppercase">
                Above & Beyond — Included Free
              </span>
            </div>
            <ul className="space-y-2.5">
              {PORTAL_FEATURES.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-200 leading-relaxed">
                  <p.icon className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/download?edition=client-care"
              className="inline-flex h-12 px-8 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition animate-pop-bounce"
            >
              <Download className="h-5 w-5" /> Download Free App
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

        {/* Right: phone mockup with timeline home screen */}
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[620px] rounded-[2.75rem] border-[10px] border-stone-800 bg-white overflow-hidden shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-white flex items-center justify-center z-20">
              <div className="h-1.5 w-16 rounded-full bg-stone-300" />
            </div>

            {/* Promo bar */}
            <div className="absolute top-7 inset-x-0 bg-black text-center py-0.5 border-b border-amber-500 z-10">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Your Project Hub · Free
              </span>
            </div>

            {/* Header */}
            <div className="absolute top-[37px] inset-x-0 h-14 px-3 flex items-center justify-between border-b border-stone-200 bg-white z-10">
              <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center">
                <span className="text-stone-400 text-xs">‹</span>
              </div>
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <img src={LOGO_URL} alt="XPS" className="h-7 w-7 object-contain" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-extrabold text-stone-900">Client Portal</span>
                  <span className="text-[7px] text-amber-600 font-bold tracking-wider uppercase">Xtreme AI Systems</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center">
                <Bell className="h-3.5 w-3.5 text-stone-600" />
              </div>
            </div>

            {/* Scrollable app content */}
            <div className="absolute top-[93px] inset-x-0 bottom-[60px] overflow-hidden bg-gradient-to-b from-white to-stone-50">
              {/* Welcome */}
              <div className="px-4 pt-3 pb-2 text-center">
                <div className="w-12 h-12 mx-auto overflow-hidden">
                  <Image src={XTREME_AI_ICON_URL} alt="XPS" className="w-full h-full" fittingType="fit" />
                </div>
                <h3 className="text-sm font-black text-stone-900 leading-tight mt-1">Welcome, Sarah!</h3>
                <p className="text-[9px] text-stone-500 mt-0.5">123 Maple St · Garage · 528 sqft</p>
              </div>

              {/* Step-by-step timeline */}
              <div className="px-3 pt-2">
                <div className="text-[8px] font-bold text-stone-400 uppercase tracking-wide mb-1.5 px-1">Project Timeline</div>
                <div className="rounded-xl bg-white border border-stone-200 p-2.5">
                  {TIMELINE_STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {/* Vertical connector */}
                      {i > 0 && (
                        <div className="ml-[15px] w-px h-3 bg-stone-200 -my-0.5" />
                      )}
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                            step.done
                              ? "bg-gradient-to-b from-amber-200 to-amber-500 border border-amber-600"
                              : step.active
                              ? "border-2 border-amber-500 bg-amber-50"
                              : "border border-stone-200 bg-stone-50"
                          }`}
                        >
                          <step.icon
                            className={`h-3.5 w-3.5 ${step.done ? "text-stone-900" : step.active ? "text-amber-600" : "text-stone-300"}`}
                            strokeWidth={2}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-bold ${
                            step.done ? "text-stone-900" : step.active ? "text-amber-600" : "text-stone-400"
                          }`}
                        >
                          {step.label}
                        </span>
                        {step.active && (
                          <span className="ml-auto text-[8px] font-bold text-amber-600 animate-pulse">LIVE</span>
                        )}
                        {step.done && (
                          <CheckCircle2 className="ml-auto h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portal quick actions */}
              <div className="px-3 pt-2">
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { icon: Eye, label: "3D Preview" },
                    { icon: Shield, label: "Warranty" },
                    { icon: FileText, label: "Documents" },
                    { icon: MessageSquare, label: "Messages" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-0.5">
                      <div
                        className="h-9 w-9 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)", border: "1.5px solid #000" }}
                      >
                        <b.icon className="h-4 w-4 text-stone-900" strokeWidth={2} />
                      </div>
                      <span className="text-[7px] font-bold text-stone-700 text-center leading-tight">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project team card */}
              <div className="px-3 pt-2">
                <div className="rounded-xl bg-stone-900 p-2.5 border border-amber-500">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users className="h-3 w-3 text-amber-400" />
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wide">Your Team</span>
                  </div>
                  <div className="text-[9px] text-white font-bold">Sarah J. · Project Manager</div>
                  <div className="text-[8px] text-stone-400">Mike R. · Crew Leader & Installer</div>
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="absolute bottom-0 inset-x-0 h-[60px] grid grid-cols-5 border-t border-stone-200 bg-white/96 backdrop-blur z-10 px-2 pb-1.5 pt-1">
              {[
                { icon: ClipboardList, label: "Home", active: true },
                { icon: Eye, label: "Preview" },
                { icon: MessageSquare, label: "Messages" },
                { icon: FileText, label: "Files" },
                { icon: Bell, label: "More" },
              ].map((n, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <n.icon className="h-4 w-4" style={{ color: n.active ? "#D9B835" : "#9CA3AF" }} strokeWidth={n.active ? 2.2 : 1.8} />
                  <span className="text-[8px] font-semibold" style={{ color: n.active ? "#D9B835" : "#9CA3AF" }}>{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}