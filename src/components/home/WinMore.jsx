import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Search, Eye, PhoneCall } from "lucide-react";

const steps = [
  { icon: MessageSquare, label: "Answer questions", desc: "Tell us your address, garage size and floor condition in under 60 seconds." },
  { icon: Search, label: "We look up your garage", desc: "Our system searches public records to find your garage's square footage." },
  { icon: Eye, label: "See your options", desc: "Get your estimated price range, browse flake colors and see a before & after." },
  { icon: PhoneCall, label: "Get contacted", desc: "A specialist from Xtreme Polishing Systems reaches out within 24 hours." }
];

export default function WinMore() {
  return (
    <section id="how-it-works" className="bg-stone-950 py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white text-center">
          Win more with our estimator
        </h2>
        <p className="mt-4 text-stone-400 text-center max-w-2xl mx-auto">
          Homeowners get a personalized garage floor estimate in seconds — you get a qualified lead before the competition picks up the phone.
        </p>
        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 mb-5">
                <s.icon className="h-7 w-7 text-amber-500" />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] text-stone-500">STEP {i + 1}</div>
              <h3 className="mt-2 font-semibold text-lg text-white">{s.label}</h3>
              <p className="mt-2 text-stone-400 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/funnel" className="inline-flex h-12 px-8 items-center rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold transition">
            Try it now
          </Link>
        </div>
      </div>
    </section>
  );
}