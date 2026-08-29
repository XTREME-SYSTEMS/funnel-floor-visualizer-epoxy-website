import React, { useState } from "react";
import { GraduationCap, Check, Phone, ExternalLink, Sparkles, ArrowRight, Clock, MapPin, DollarSign, Award, TrendingUp, Users } from "lucide-react";
import { LOGO_URL } from "@/components/Logo";

const POLISH_CURRICULUM = [
  "Repair (Holes, Cracks, Expansion Joints, Structural Repair)",
  "Finish & Maintenance Techniques",
  "Concrete Stain Logos + Images",
  "Choosing the right tools and equipment",
  "Hands-on training with professional equipment",
  "Marketing For Jobs / Lead Generation",
  "Bidding For Jobs (Pricing repairs, installations, etc.)",
  "Lifetime Phone Support",
];

const EPOXY_CURRICULUM = [
  "Moisture Testing & Surface Preparation",
  "Cove Bases (Waterproof an area)",
  "Mixing, Ratios, Pouring, Embedding, Clear Coats",
  "Types of coatings (Epoxy, Urethane, Polyaspartic, Water Based)",
  "Finishes — Glitter, Paint Chip, Vinyl Flake, Quartz, Metallic",
  "Countertops, Floors, Decals",
  "Hands-on training with professional equipment",
  "Marketing (Lead Generation) & Bidding For Jobs",
  "Lifetime Phone Support",
];

const BENEFITS = [
  { icon: TrendingUp, title: "Increase Your Income", desc: "Certified installers command premium rates and win more bids." },
  { icon: Award, title: "Industry Recognition", desc: "Join an elite network of certified professionals backed by 30 years of XPS expertise." },
  { icon: Users, title: "Lead Generation Skills", desc: "Learn marketing strategies that fill your pipeline with high-quality jobs." },
  { icon: Clock, title: "Lifetime Support", desc: "Ongoing phone support from our team of experts — never alone on a job." },
];

export default function TrustTraining() {
  const [track, setTrack] = useState("polish");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const curriculum = track === "polish" ? POLISH_CURRICULUM : EPOXY_CURRICULUM;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="bg-stone-950 px-4 py-8 text-center">
        <img src={LOGO_URL} alt="XPS" className="w-20 h-20 mx-auto object-contain mb-3" />
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400 mb-1">Since 2017</p>
        <h1 className="text-2xl font-display font-extrabold text-white mb-2">Polished Concrete University</h1>
        <p className="text-lg font-bold text-amber-400 italic">"Epoxy will change your life"</p>
        <p className="text-sm text-stone-400 mt-2 max-w-xs mx-auto">
          5-Day Certification Course · Hands-On Training · Lifetime Support
        </p>
      </div>

      {/* Discount banner */}
      <div className="mx-4 mt-4 rounded-2xl border-2 border-black p-4 text-center" style={{ background: "linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)", boxShadow: "0 6px 18px rgba(255,215,0,0.4), inset 0 1px rgba(255,255,255,0.4)" }}>
        <p className="text-xs font-extrabold uppercase tracking-wider text-stone-900">Limited Time Offer</p>
        <p className="text-2xl font-extrabold text-stone-900 mt-1">100% OFF Tuition</p>
        <p className="text-sm font-semibold text-stone-800 mt-1">Use code <span className="font-extrabold tracking-wider">XPS100</span> at checkout</p>
      </div>

      {/* About */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-2">Who We Are</h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Our parent company, Xtreme Polishing Systems, has been the nation's premier decorative concrete solutions provider for nearly 30 years. We are well known for manufacturing and distributing equipment, supplies, industrial coatings, and all decorative concrete tools.
        </p>
      </div>

      {/* Class info cards */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border-2 border-stone-200 p-3 text-center">
          <Clock className="h-5 w-5 text-amber-600 mx-auto mb-1" />
          <div className="text-xs font-bold text-stone-900">5 Days</div>
          <div className="text-[10px] text-stone-500">Intensive</div>
        </div>
        <div className="rounded-xl border-2 border-stone-200 p-3 text-center">
          <MapPin className="h-5 w-5 text-amber-600 mx-auto mb-1" />
          <div className="text-xs font-bold text-stone-900">Pompano Beach</div>
          <div className="text-[10px] text-stone-500">Florida</div>
        </div>
        <div className="rounded-xl border-2 border-stone-200 p-3 text-center">
          <DollarSign className="h-5 w-5 text-amber-600 mx-auto mb-1" />
          <div className="text-xs font-bold text-stone-900">FREE</div>
          <div className="text-[10px] text-stone-500">With XPS100</div>
        </div>
      </div>

      {/* Track selector */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-2">Choose Your Certification</h2>
        <div className="flex gap-1 p-1 bg-stone-100 rounded-xl mb-4">
          <button
            onClick={() => setTrack("polish")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition ${track === "polish" ? "bg-white shadow text-stone-900" : "text-stone-500"}`}
          >
            Concrete Polishing
          </button>
          <button
            onClick={() => setTrack("epoxy")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition ${track === "epoxy" ? "bg-white shadow text-stone-900" : "text-stone-500"}`}
          >
            Epoxy Resin
          </button>
        </div>

        <div className="rounded-2xl border-2 border-black p-4 bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-amber-600" />
            <h3 className="text-sm font-extrabold text-stone-900">
              {track === "polish" ? "Concrete Polishing Certification" : "Epoxy Resin Certification"}
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-3">5 Days · Pompano Beach, FL</p>
          <ul className="space-y-2">
            {curriculum.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-3">How This Class Will Change Your Life</h2>
        <div className="space-y-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)", border: "2px solid #000", boxShadow: "0 3px 8px rgba(255,215,0,0.3), inset 0 1px rgba(255,255,255,0.4)" }}>
                <b.icon className="h-4 w-4 text-stone-900" strokeWidth={2} />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">{b.title}</div>
                <div className="text-xs text-stone-500">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sign-up form */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-extrabold text-stone-900 mb-1">Sign Up Now</h2>
        <p className="text-sm text-stone-500 mb-4">Reserve your seat with the XPS100 code for 100% off tuition.</p>

        {submitted ? (
          <div className="rounded-2xl border-2 border-black p-6 text-center" style={{ background: "linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)", boxShadow: "0 6px 18px rgba(255,215,0,0.4), inset 0 1px rgba(255,255,255,0.4)" }}>
            <Sparkles className="h-8 w-8 text-stone-900 mx-auto mb-2" />
            <h3 className="text-lg font-extrabold text-stone-900">You're In!</h3>
            <p className="text-sm text-stone-800 mt-1">
              Your seat is reserved with code <strong>XPS100</strong> (100% off). We'll contact you at <strong>{form.email}</strong> with class details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="xa-input"
            />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email address"
              className="xa-input"
            />
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone number"
              className="xa-input"
            />
            <button type="submit" className="xa-cta-gold">
              <GraduationCap className="h-4 w-4" /> Claim My Free Seat <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>

      {/* Contact */}
      <div className="px-4 mt-6">
        <a href="tel:9542288856" className="xa-cta-black" style={{ background: "linear-gradient(180deg, #1a1a1a, #000)" }}>
          <Phone className="h-4 w-4" /> (954) 228-8856
        </a>
        <a
          href="https://www.polishedconcreteuniversity.com/class-schedule/"
          target="_blank"
          rel="noopener noreferrer"
          className="xa-cta-gold mt-2"
        >
          View Class Schedule <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}