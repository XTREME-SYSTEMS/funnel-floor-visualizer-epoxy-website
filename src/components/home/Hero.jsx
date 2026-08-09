import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, BadgeCheck, ClipboardCheck } from "lucide-react";

const trust = [
  { icon: BadgeCheck, text: "Free estimate" },
  { icon: ShieldCheck, text: "No obligation" },
  { icon: Clock, text: "Takes about 60 seconds" },
  { icon: ClipboardCheck, text: "Final pricing confirmed after inspection" }
];

export default function Hero({ settings }) {
  return (
    <section className="relative min-h-[92vh] flex items-end">
      <img src={settings.hero_image_url} alt="Finished residential garage floor" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/30" />
      <div className="relative w-full max-w-6xl mx-auto px-6 pb-16 pt-32">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">{settings.company_name}</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
            Find Out What Your New Garage Floor Could Cost
          </h1>
          <p className="mt-5 text-lg text-stone-300 leading-relaxed">
            Get a personalized garage floor estimate in about 60 seconds.
          </p>
          <Link to="/estimate" className="mt-8 inline-flex w-full sm:w-auto items-center justify-center h-16 px-10 rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 text-base font-bold tracking-wide">
            GET MY FREE ESTIMATE
          </Link>
          <ul className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3">
            {trust.map((t) => (
              <li key={t.text} className="flex items-center gap-2 text-sm text-stone-300">
                <t.icon className="h-4 w-4 text-amber-400 shrink-0" />
                {t.text}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}