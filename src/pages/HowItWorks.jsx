import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, MapPin, ClipboardList, Palette, Camera,
  Calculator, Phone, CalendarCheck, ShieldCheck, Clock,
  Star, CheckCircle2,
} from "lucide-react";

const STEPS = [
  { icon: MapPin, t: "Enter your address", d: "Tell us where your garage is. We look up its real square footage from public property records — no guessing.", accent: "from-sky-500 to-blue-600" },
  { icon: ClipboardList, t: "Describe your floor", d: "Select your concrete condition so we know exactly what surface prep your project needs.", accent: "from-violet-500 to-purple-600" },
  { icon: Palette, t: "Choose your color", d: "Browse every finish system and pick the exact flake, metallic, or solid color you love.", accent: "from-amber-500 to-orange-500" },
  { icon: Camera, t: "Add photos (optional)", d: "Snap a few pictures of your garage so we can visualize your new floor and quote more accurately.", accent: "from-rose-500 to-pink-600" },
  { icon: Calculator, t: "Get your instant estimate", d: "We calculate a realistic price range on the spot and email you a detailed proposal.", accent: "from-emerald-500 to-green-600" },
  { icon: Phone, t: "Talk to a specialist", d: "A dedicated floor specialist reviews your details and answers your questions — no pressure.", accent: "from-cyan-500 to-teal-600" },
  { icon: CalendarCheck, t: "Book your consultation", d: "Pick a time that works for you. We confirm final pricing at your free in-home visit.", accent: "from-indigo-500 to-blue-700" },
  { icon: ShieldCheck, t: "Install & enjoy", d: "Our certified crew installs your floor, backed by a nationwide workmanship warranty.", accent: "from-stone-700 to-stone-900" },
];

// Mini estimator mockup that cycles through funnel steps in the hero
const MOCK_STEPS = [
  { label: "Address", value: "4400 NW 31st Ave, Pompano Beach" },
  { label: "Garage size", value: "2-car · 440 sq ft" },
  { label: "Color", value: "Tidal Wave · FB-807", swatch: "#3A6A8A" },
  { label: "Estimate", value: "$3,080 – $4,048" },
];

function HeroMockup() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % MOCK_STEPS.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto max-w-sm">
      {/* floating glow */}
      <div className="absolute -inset-6 bg-amber-500/20 blur-3xl rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative rounded-3xl bg-white shadow-2xl border border-stone-200 overflow-hidden"
      >
        <div className="bg-stone-950 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[10px] font-bold tracking-widest text-stone-400">EPoxyGARAGEFLOORESTIMATE.COM</div>
        </div>
        <div className="p-5 space-y-3">
          {/* progress dots */}
          <div className="flex items-center gap-1.5">
            {MOCK_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= active ? "bg-amber-500" : "bg-stone-200"
                }`}
              />
            ))}
          </div>
          {MOCK_STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              animate={{
                opacity: i === active ? 1 : 0.35,
                scale: i === active ? 1 : 0.98,
              }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-stone-200 p-3"
            >
              <div className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">{s.label}</div>
              <div className="mt-1 flex items-center gap-2">
                {s.swatch && (
                  <span className="h-4 w-4 rounded-full border border-stone-200" style={{ background: s.swatch }} />
                )}
                <span className="text-sm font-bold text-stone-900">{s.value}</span>
                {i === active && <CheckCircle2 className="h-4 w-4 text-amber-500 ml-auto" />}
              </div>
            </motion.div>
          ))}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-11 rounded-xl bg-amber-500 text-stone-950 text-sm font-bold flex items-center justify-center gap-2"
          >
            {active === MOCK_STEPS.length - 1 ? "View your estimate" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* floating badge */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -bottom-4 rounded-2xl bg-white shadow-xl border border-stone-200 px-4 py-3 flex items-center gap-2"
      >
        <div className="flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          ))}
        </div>
        <div className="text-xs font-bold text-stone-900">4.9 · 214 reviews</div>
      </motion.div>
    </div>
  );
}

function StepRow({ step, index }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="relative pl-20 pb-12 last:pb-0"
    >
      {/* node */}
      <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} shadow-lg`}
        >
          <Icon className="h-6 w-6 text-white" />
          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-stone-950 text-[10px] font-bold text-amber-500 border-2 border-white">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </div>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
      >
        <h3 className="text-lg font-bold text-stone-900">{step.t}</h3>
        <p className="mt-2 text-stone-600 leading-relaxed">{step.d}</p>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const { scrollYProgress } = useScroll();
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-stone-950 px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-amber-500/30 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto grid gap-12 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-amber-500 text-xs font-bold tracking-[0.25em] uppercase"
            >
              Simple · Fast · No Obligation
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-3 text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white"
            >
              How it works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-4 text-stone-300 text-lg leading-relaxed md:max-w-md"
            >
              From address to installed floor in a few simple steps. Get a real, personalized estimate in about 60 seconds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <Link
                to="/funnel"
                className="inline-flex h-12 px-7 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
              >
                Start my estimate <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2 text-sm text-stone-400 justify-center md:justify-start">
                <Clock className="h-4 w-4 text-amber-500" /> 60 seconds
                <span className="mx-1">·</span>
                <ShieldCheck className="h-4 w-4 text-amber-500" /> No obligation
              </div>
            </motion.div>
          </div>
          <HeroMockup />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="text-amber-500 text-xs font-bold tracking-[0.25em] uppercase">The Process</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-extrabold tracking-tight text-stone-950">
              Eight steps to a finished floor
            </h2>
          </motion.div>

          <div className="relative">
            {/* track */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-stone-200" />
            {/* animated fill */}
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-7 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-amber-500 via-amber-500 to-stone-300"
            />
            <div>
              {STEPS.map((s, i) => (
                <StepRow key={s.t} step={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-3xl bg-stone-950 p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
          <h2 className="relative text-3xl md:text-4xl font-display font-extrabold text-white">
            Ready to see your new floor?
          </h2>
          <p className="relative mt-3 text-stone-300 max-w-md mx-auto">
            Start your free estimate now — it takes about a minute and there's zero obligation.
          </p>
          <div className="relative mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/funnel"
              className="inline-flex h-12 px-7 items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
            >
              Start my estimate <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition"
            >
              Browse floor systems
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}