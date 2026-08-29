import React from "react";
import { GraduationCap, Check, Phone, ExternalLink, Award, TrendingUp, Users, Wrench, Briefcase, Star, ArrowRight } from "lucide-react";
import { LOGO_URL } from "@/components/Logo";

const PCU_URL = "https://www.polishedconcreteuniversity.com";

const WHAT_YOU_LEARN = [
  "Concrete Polishing using professional equipment",
  "Concrete Stains, Logos, and Images",
  "Surface Repair (Holes, Cracks, Expansion Joints)",
  "Money Making Marketing & Lead Generation",
  "Bidding For Jobs (Pricing repairs, installations)",
  "Hands-on training with the same tools used on real jobs",
];

const LIFE_BENEFITS = [
  { icon: TrendingUp, title: "Increase Your Income", desc: "Certified XPS installers command premium rates and win more bids. Turn a job into a career." },
  { icon: Briefcase, title: "Start Your Own Business", desc: "Learn marketing, lead generation, and bidding — the skills to launch and grow a profitable flooring business." },
  { icon: Award, title: "Industry-Recognized Certification", desc: "Walk away with a certification that attests to your proficiency, backed by 30 years of XPS expertise." },
  { icon: Users, title: "Join a Network", desc: "Connect with fellow professionals and gain access to ongoing support from the XPS team." },
  { icon: Wrench, title: "Master Professional Equipment", desc: "Get hands-on with the same grinders, coatings, and tools used on real jobs across the country." },
  { icon: Star, title: "Lifetime Support", desc: "Never be alone on a job — lifetime phone support from our experts is always just a call away." },
];

export default function TrustInstallers() {
  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="bg-stone-950 px-4 py-8 text-center">
        <img src={LOGO_URL} alt="XPS" className="w-20 h-20 mx-auto object-contain mb-3" />
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400 mb-1">Become Certified</p>
        <h1 className="text-2xl font-display font-extrabold text-white mb-2">XPS Trained Installers</h1>
        <p className="text-lg font-bold text-amber-400 italic">"Epoxy will change your life"</p>
        <p className="text-sm text-stone-400 mt-2 max-w-xs mx-auto">
          Transform your career with hands-on certification from Polished Concrete University — the training arm of Xtreme Polishing Systems.
        </p>
      </div>

      {/* What the school offers */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3">What the School Offers</h2>
        <div className="rounded-2xl border-2 border-black p-4 bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <p className="text-sm text-stone-600 leading-relaxed mb-3">
            Polished Concrete University provides a comprehensive, hands-on training experience led by industry professionals. Since 2017, we've been training the next generation of decorative concrete experts.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
              <div className="text-xl font-extrabold text-amber-600">5</div>
              <div className="text-[10px] font-bold uppercase text-stone-600">Day Course</div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
              <div className="text-xl font-extrabold text-amber-600">2</div>
              <div className="text-[10px] font-bold uppercase text-stone-600">Cert Tracks</div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
              <div className="text-xl font-extrabold text-amber-600">30</div>
              <div className="text-[10px] font-bold uppercase text-stone-600">Years XPS</div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
              <div className="text-xl font-extrabold text-amber-600">100%</div>
              <div className="text-[10px] font-bold uppercase text-stone-600">Hands-On</div>
            </div>
          </div>
        </div>
      </div>

      {/* What you'll learn */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-amber-600" /> What You'll Master
        </h2>
        <div className="rounded-2xl border-2 border-stone-200 p-4 bg-white">
          <ul className="space-y-2">
            {WHAT_YOU_LEARN.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Life & business enhancement */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3">Enhance Your Life & Business</h2>
        <div className="space-y-3">
          {LIFE_BENEFITS.map((b) => (
            <div key={b.title} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)", border: "2px solid #000", boxShadow: "0 3px 8px rgba(255,215,0,0.3), inset 0 1px rgba(255,255,255,0.4)" }}>
                <b.icon className="h-4 w-4 text-stone-900" strokeWidth={2} />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">{b.title}</div>
                <div className="text-xs text-stone-500 leading-relaxed">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification tracks */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3">Two Certification Paths</h2>
        <div className="space-y-2">
          <div className="rounded-xl border-2 border-stone-200 p-3 bg-white">
            <div className="text-sm font-extrabold text-stone-900">Concrete Polishing Certification</div>
            <p className="text-xs text-stone-500 mt-1">5 Days · Pompano Beach, FL — Repair, finish, maintenance, stain logos, marketing, and bidding.</p>
          </div>
          <div className="rounded-xl border-2 border-stone-200 p-3 bg-white">
            <div className="text-sm font-extrabold text-stone-900">Epoxy Resin Certification</div>
            <p className="text-xs text-stone-500 mt-1">5 Days · Pompano Beach, FL — Moisture testing, cove bases, coatings, finishes, countertops, marketing, and bidding.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 mt-6 space-y-2">
        <a href={`${PCU_URL}/class-schedule/`} target="_blank" rel="noopener noreferrer" className="xa-cta-gold">
          <GraduationCap className="h-4 w-4" /> Enroll at Polished Concrete University <ArrowRight className="h-4 w-4" />
        </a>
        <a href="tel:9542288856" className="xa-cta-black" style={{ background: "linear-gradient(180deg, #1a1a1a, #000)" }}>
          <Phone className="h-4 w-4" /> Call (954) 228-8856
        </a>
        <a href={PCU_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-amber-600">
          Visit polishedconcreteuniversity.com <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}