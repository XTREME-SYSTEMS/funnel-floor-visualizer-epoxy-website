import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, Share2, QrCode, Truck } from "lucide-react";

const items = [
  { icon: Smartphone, label: "On your website", desc: "Embed the estimator on your homepage or landing pages." },
  { icon: Share2, label: "In ads & social", desc: "Share the link in Facebook, Google and Instagram ads." },
  { icon: QrCode, label: "On door hangers", desc: "Print QR codes on mailers, door hangers and flyers." },
  { icon: Truck, label: "On your trucks", desc: "Wrap your vehicles with a QR code linking straight to it." }
];

export default function LeadCapture() {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <div className="text-xs font-bold tracking-[0.2em] text-amber-500">UPGRADE YOUR MARKETING</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-stone-900">
            Lead capture made easy
          </h2>
          <p className="mt-4 text-stone-600 leading-relaxed">
            Use your estimator link everywhere — on your website, in ads, on door hangers, business cards, or anywhere else. One link captures qualified leads 24/7.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.label} className="rounded-2xl border border-stone-200 p-6 hover:border-amber-300 transition">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 mb-4">
                <it.icon className="h-6 w-6 text-stone-700" />
              </div>
              <h3 className="font-semibold text-stone-900">{it.label}</h3>
              <p className="mt-1.5 text-sm text-stone-500 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/funnel" className="inline-flex h-12 px-8 items-center rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-semibold transition">
            Try the estimator
          </Link>
        </div>
      </div>
    </section>
  );
}