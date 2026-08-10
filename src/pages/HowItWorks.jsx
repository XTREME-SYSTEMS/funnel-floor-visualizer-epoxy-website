import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, MapPin, ClipboardList, Palette, Camera,
  Calculator, Phone, CalendarCheck, ShieldCheck, Clock,
} from "lucide-react";
import PageHero from "@/components/PageHero";

const STEPS = [
  { icon: MapPin, t: "Enter your address", d: "Tell us where your garage is. We look up its real square footage from public property records — no guessing." },
  { icon: ClipboardList, t: "Describe your floor", d: "Select your concrete condition so we know exactly what surface prep your project needs." },
  { icon: Palette, t: "Choose your color", d: "Browse every finish system and pick the exact flake, metallic, or solid color you love." },
  { icon: Camera, t: "Add photos (optional)", d: "Snap a few pictures of your garage so we can visualize your new floor and quote more accurately." },
  { icon: Calculator, t: "Get your instant estimate", d: "We calculate a realistic price range on the spot and email you a detailed proposal." },
  { icon: Phone, t: "Talk to a specialist", d: "A dedicated floor specialist reviews your details and answers your questions — no pressure." },
  { icon: CalendarCheck, t: "Book your consultation", d: "Pick a time that works for you. We confirm final pricing at your free in-home visit." },
  { icon: ShieldCheck, t: "Install & enjoy", d: "Our certified crew installs your floor, backed by a nationwide workmanship warranty." },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageHero
        eyebrow="Simple · Fast · No Obligation"
        title="How it works"
        subtitle="From address to installed floor in a few simple steps. Get a real, personalized estimate in about 60 seconds."
      >
        <Link
          to="/funnel"
          className="mt-8 inline-flex h-12 px-7 items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
        >
          Start my estimate <ArrowRight className="h-5 w-5" />
        </Link>
      </PageHero>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <div key={s.t} className="rounded-2xl bg-white border border-stone-200 p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <s.icon className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-[0.2em] text-amber-500">
                      STEP {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-stone-900">{s.t}</h3>
                    <p className="mt-2 text-stone-600 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <Link
                to="/funnel"
                className="inline-flex h-12 px-7 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
              >
                Start my estimate <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex h-12 px-7 items-center justify-center rounded-xl border border-stone-300 text-stone-900 font-semibold hover:border-stone-900 transition"
              >
                Browse floor systems
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-stone-500">
              <Clock className="h-4 w-4 text-amber-500" /> Takes about 60 seconds
              <span className="mx-1">·</span>
              <ShieldCheck className="h-4 w-4 text-amber-500" /> No obligation
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}