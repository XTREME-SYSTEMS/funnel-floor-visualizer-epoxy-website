import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, BadgeCheck } from "lucide-react";
import { Image } from "@/components/ui/image";

const trust = [
  { icon: BadgeCheck, text: "Free estimate" },
  { icon: ShieldCheck, text: "No obligation" },
  { icon: Clock, text: "Takes about 60 seconds" }
];

export default function Hero({ settings }) {
  return (
    <section className="relative min-h-[92vh] flex items-end">
      <Image src={settings.hero_image_url} alt="Premium residential garage with black, white and gray flake epoxy floor, gray cabinets and chrome countertops" fittingType="fill" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/30" />
      <div className="relative w-full max-w-6xl mx-auto px-6 pb-16 pt-32">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="inline-block text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">{settings.service_area}</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
            How Much Will Your Epoxy Garage Floor Cost?
          </h1>
          <p className="mt-5 text-lg text-stone-300 leading-relaxed">
            Get a personalized garage floor estimate in about 60 seconds.
          </p>
          <Link to="/funnel" className="mt-8 inline-flex w-full sm:w-auto items-center justify-center h-16 px-10 rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 text-base font-bold tracking-wide">
            GET MY FREE ESTIMATE
          </Link>
          <p className="mt-3 text-sm text-stone-400">
            {trust.map((t, i) => (
              <span key={i}>{i > 0 && " • "}{t.text}</span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}