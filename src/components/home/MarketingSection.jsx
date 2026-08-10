import React from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  MapPin,
  Palette,
  Clock,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  Star,
  ArrowRight
} from "lucide-react";

// Black marketing band directly below the hero. Doubles as a conversion-focused
// value strip AND an SEO content block loaded with the epoxy garage floor
// keywords that homeowners search and Google rewards.
const pillars = [
  {
    icon: Calculator,
    title: "Instant Epoxy Garage Floor Cost",
    body: "Get a real, personalized garage floor coating cost estimate in about 60 seconds — no phone tag, no pressure. We price by your garage's actual square footage pulled from public property records."
  },
  {
    icon: MapPin,
    title: "Local South Florida Coating Pros",
    body: "Family-owned epoxy flooring contractors serving Pompano Beach, Boca Raton, Fort Lauderdale and the surrounding South Florida area. Fast on-site estimates and local crews who know Florida concrete."
  },
  {
    icon: Palette,
    title: "180+ Flake, Metallic & Solid Colors",
    body: "Browse real manufacturer color charts across flake epoxy, metallic epoxy, solid color, quartz and stained concrete systems — then visualize your chosen color on your own garage."
  },
  {
    icon: Clock,
    title: "1-Day Installation, Fast Cure",
    body: "Commercial-grade epoxy with a polyaspartic topcoat means most residential garage floors are completed in a single day and ready for vehicles in 24 hours — minimal disruption to your routine."
  },
  {
    icon: ShieldCheck,
    title: "Stain, Crack & Moisture Protection",
    body: "Our garage floor resurfacing seals oil stains, fills cracks and creates a moisture-resistant, easy-clean surface that holds up to Florida heat, humidity and hot tires for 15–20+ years."
  },
  {
    icon: TrendingUp,
    title: "Boost Your Home's Value",
    body: "A professionally coated garage floor is one of the highest-ROI home upgrades — adding curb appeal, resale value and a showroom-quality finish buyers notice the moment the door opens."
  },
  {
    icon: BadgeCheck,
    title: "Free, No-Obligation Quote",
    body: "Real numbers upfront. Review your estimate, compare package options, and only move forward when it's the right fit. No pushy sales calls — just transparent epoxy flooring pricing."
  },
  {
    icon: Star,
    title: "5-Star Rated by Homeowners",
    body: "Hundreds of verified Google reviews from real South Florida homeowners. We back every residential garage floor coating with a written workmanship warranty you can count on."
  }
];

export default function MarketingSection() {
  return (
    <section className="bg-stone-950 text-white py-20 md:py-28 px-6 border-b border-stone-800">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl">
          <span className="inline-block text-amber-400 text-xs font-bold tracking-[0.25em] uppercase">
            Epoxy Garage Floor Experts
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.08]">
            The smartest way to price and plan your garage floor coating
          </h2>
          <p className="mt-5 text-lg text-stone-300 leading-relaxed">
            Whether you're researching <strong className="text-white">epoxy garage floor cost</strong>,
            comparing <strong className="text-white">flake vs. metallic epoxy</strong>, or ready to
            resurface cracked, stained concrete, our free estimator gives you real numbers and a
            clear path forward — built for South Florida homeowners.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-stone-900/60 border border-stone-800 p-6 hover:border-amber-500/50 transition"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15">
                <p.icon className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-stone-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* SEO keyword band */}
        <div className="mt-14 rounded-2xl bg-stone-900/60 border border-stone-800 p-8 md:p-10">
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            Everything you need to know before you coat your garage floor
          </h3>
          <p className="mt-4 text-stone-300 leading-relaxed">
            Garage floor epoxy is one of the most cost-effective home improvements available.
            A professionally installed <strong className="text-white">epoxy garage floor</strong> resists
            oil, chemicals, hot-tire pickup and Florida humidity, hides imperfections in aging concrete,
            and transforms a dull slab into a glossy, showroom-quality surface. Popular searches like
            "how much does a 2-car garage epoxy floor cost," "garage floor coating near me," and
            "polyaspartic vs epoxy garage floor" all point to the same answer: pricing depends on square
            footage, floor condition, and the finish system you choose. Our estimator accounts for all
            three — pulling your garage's real size from public records, adjusting for cracks or
            existing coatings, and letting you compare flake, metallic, solid and quartz systems
            side by side so you can budget with confidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "epoxy garage floor cost",
              "garage floor coating",
              "polyaspartic garage floor",
              "flake epoxy",
              "metallic epoxy",
              "garage floor resurfacing",
              "concrete floor coating",
              "2-car garage epoxy cost",
              "3-car garage epoxy cost",
              "epoxy flooring contractor"
            ].map((k) => (
              <span
                key={k}
                className="text-xs font-medium text-stone-300 bg-stone-800 border border-stone-700 rounded-full px-3 py-1.5"
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
              Ready to see your garage transformed?
            </h3>
            <p className="mt-2 text-stone-400">
              Get your free, no-obligation epoxy garage floor estimate in about 60 seconds.
            </p>
          </div>
          <Link
            to="/funnel"
            className="inline-flex items-center gap-2 h-14 px-10 rounded-xl bg-amber-500 hover:bg-amber-400 transition text-stone-950 font-bold tracking-wide whitespace-nowrap"
          >
            GET MY FREE ESTIMATE <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}