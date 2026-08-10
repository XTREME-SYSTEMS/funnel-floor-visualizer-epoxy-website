import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, BadgeCheck } from "lucide-react";

const trust = [
  { icon: BadgeCheck, text: "Free estimate" },
  { icon: ShieldCheck, text: "No obligation" },
  { icon: Clock, text: "Takes about 60 seconds" }
];

export default function Hero({ settings }) {
  return (
    <section className="relative h-[72vh] min-h-[520px] bg-stone-950 overflow-hidden border-b-2 border-amber-500">
      <img
        src={settings.hero_image_url}
        alt="Premium residential garage with black, white and gray flake epoxy floor, gray cabinets and chrome countertops"
        className="absolute inset-0 w-full h-full object-cover object-[center_75%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
              How Much Will Your Epoxy Garage Floor Cost?
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              Get a personalized garage floor estimate in about 60 seconds.
            </p>
            <Link to="/funnel" className="mt-8 inline-flex w-full sm:w-auto items-center justify-center h-16 px-10 rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 text-base font-bold tracking-wide shadow-lg shadow-amber-500/30">
              GET MY FREE ESTIMATE
            </Link>
            <p className="mt-3 text-sm text-white/90 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              {trust.map((t, i) => (
                <span key={i}>{i > 0 && " • "}{t.text}</span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 pb-4 text-center">
        <p className="text-white text-sm font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">{settings.service_area}</p>
      </div>
    </section>
  );
}