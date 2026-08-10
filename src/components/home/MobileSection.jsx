import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, MapPin, Camera, Palette, FileText, Mail, Phone, Home } from "lucide-react";

const steps = [
  { icon: MapPin, text: "Enter your address — we pull public records to find your garage's square footage." },
  { icon: Camera, text: "Snap a few photos of your garage from your phone." },
  { icon: Palette, text: "Pick a color from our charts and we'll render a finished epoxy preview of your space." },
  { icon: FileText, text: "Get an instant bid combining your footage, photos, and answers — no home visit needed." },
  { icon: Mail, text: "Your estimate is emailed to you free of charge." },
  { icon: Phone, text: "Book a free 15-minute phone call, or schedule a free in-home consultation." }
];

export default function MobileSection() {
  return (
    <section className="bg-stone-950 py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-bold tracking-[0.2em] text-amber-500">EPOXY GARAGE MOBILE</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Your estimate, right from your phone
          </h2>
          <p className="mt-4 text-stone-400 leading-relaxed">
            Answer a few quick questions about your project and let our tool do the rest — no waiting, no pressure, no home visit required to get your number.
          </p>
          <ul className="mt-6 space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-stone-300">
                <s.icon className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">{s.text}</span>
              </li>
            ))}
          </ul>
          <Link to="/funnel" className="mt-8 inline-flex h-12 px-8 items-center rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold transition">
            Start my estimate
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="relative w-64 h-[460px] rounded-[2.5rem] border-8 border-stone-800 bg-stone-900 overflow-hidden shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-6 bg-stone-900 flex items-center justify-center">
              <div className="h-1 w-12 rounded-full bg-stone-700" />
            </div>
            <div className="pt-10 px-4 pb-4 h-full flex flex-col">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 mb-3">
                  <Smartphone className="h-6 w-6 text-amber-500" />
                </div>
                <div className="text-white font-semibold text-sm">Get Your Estimate</div>
                <div className="text-stone-500 text-xs mt-1">Takes about 60 seconds</div>
              </div>
              <div className="mt-5 space-y-2.5">
                {[MapPin, Camera, Palette].map((Icon, i) => (
                  <div key={i} className="rounded-xl border border-stone-700 p-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-amber-500 shrink-0" />
                    <div className="flex-1">
                      <div className="h-2 w-20 bg-stone-600 rounded mb-2" />
                      <div className="h-2 w-28 bg-stone-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto h-12 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-sm">
                START
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}