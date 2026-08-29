import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, BadgeCheck, Phone, Calculator } from "lucide-react";

const trust = [
  { icon: BadgeCheck, text: "Free estimate" },
  { icon: ShieldCheck, text: "No obligation" },
  { icon: Clock, text: "Takes about 60 seconds" }
];

export default function Hero({ settings }) {
  return (
    <section className="relative h-[82vh] min-h-[620px] bg-stone-950 overflow-hidden border-b-2 border-amber-500">
      <img
        src={settings.hero_image_url}
        alt="Premium residential garage with black, white and gray flake epoxy floor, gray cabinets and chrome countertops"
        className="absolute inset-0 w-full h-full object-cover object-[center_75%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-transparent" />
      <div className="absolute inset-0 flex items-start md:items-center pt-28 md:pt-24">
        <div className="w-full max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <h1 className="mt-8 md:mt-10 font-display text-3xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
              How Much Will Your Epoxy Garage Floor Cost?
            </h1>
            <motion.p
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: [0.6, 1.18, 0.95, 1.08, 1, 1.04, 1, 1.04, 1] }}
              transition={{ duration: 2.4, delay: 0.5, times: [0, 0.2, 0.35, 0.45, 0.55, 0.7, 0.85, 0.95, 1], repeat: Infinity, repeatDelay: 2, ease: "easeOut" }}
              className="mt-5 inline-block text-lg md:text-xl font-semibold text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
              style={{ border: "1px solid #FFD700", padding: "10px 16px", borderRadius: "12px", background: "rgba(0,0,0,0.25)" }}
            >
              Want to see exactly what your floor will cost and look like before signing up? We show you free!
            </motion.p>
            <Link to="/funnel" className="mt-6 md:mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-3 h-14 md:h-16 px-8 md:px-10 rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 text-base font-bold tracking-wide shadow-lg shadow-amber-500/30 border border-white/80">
              <Calculator className="h-5 w-5" /> Price My Floor + Visualize It
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/90 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              <span>{trust.map((t, i) => (
                <span key={i}>{i > 0 && " • "}{t.text}</span>
              ))}</span>
              <span className="hidden md:inline text-white/40">|</span>
              <span className="hidden md:inline text-white/80">{settings.service_area}</span>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}