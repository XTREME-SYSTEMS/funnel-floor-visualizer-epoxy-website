import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, MapPin, GraduationCap } from "lucide-react";
import PageNav from "@/components/PageNav";
import PageHero from "@/components/PageHero";
import { useSettings } from "@/lib/useSettings";
import Footer from "@/components/home/Footer";

export default function About() {
  const { settings } = useSettings();
  const company = settings.public_business_name || "EpoxyGarageFloorEstimate.com";

  return (
    <div className="min-h-screen bg-stone-50">
      <PageNav />
      <PageHero
        eyebrow="Who we are"
        title={`About ${company}`}
        subtitle="A free, instant estimating tool built by the pros who install garage floors every day."
      />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="prose-content space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              <strong>{company}</strong> is a free online tool that gives homeowners an instant,
              personalized estimate for a professional garage floor coating — no waiting, no sales
              pressure, and no obligation. In about sixty seconds, you enter your property address,
              tell us a little about your concrete, choose your color, and receive a realistic price
              range backed by real public property records and current installation rates.
            </p>
            <p>
              The platform is built for residential homeowners who want a clear, honest starting point
              before talking to a contractor. Whether you're planning a garage upgrade, finishing a
              new home, or just curious what a flake, metallic, or solid-color epoxy floor might cost,
              the estimator delivers a transparent range and a detailed proposal you can review on your
              own time — then decide if you'd like a free in-home consultation.
            </p>
            <p>
              {company} is built and operated by <strong>Xtreme Polishing Systems (XPS)</strong>, the
              industry's #1 source for epoxy and polished concrete products, training, and
              installation. With over fifteen years of experience, a nationwide network of certified
              crews, and Polished Concrete University — the world's leading hands-on trade school for
              epoxy and polished concrete — XPS stands behind every estimate with premium materials,
              factory-trained installers, and a nationwide workmanship warranty.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Nationwide warranty", d: "Workmanship backed across 47 states." },
              { icon: Users, t: "2,400+ projects", d: "Homeowners served coast to coast." },
              { icon: GraduationCap, t: "Factory-trained", d: "Crews certified by Polished Concrete University." },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl bg-white border border-stone-200 p-5">
                <s.icon className="h-6 w-6 text-amber-500" />
                <div className="mt-3 font-bold text-stone-900">{s.t}</div>
                <div className="text-sm text-stone-600 mt-1">{s.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-stone-950 p-8 text-center">
            <div className="flex items-center justify-center gap-2 text-stone-300 text-sm">
              <MapPin className="h-4 w-4 text-amber-500" />
              {settings.business_address || "2200 NW 32nd St #700, Pompano Beach, FL 33069"}
            </div>
            <Link
              to="/funnel"
              className="mt-6 inline-flex h-12 px-7 items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition"
            >
              Start my estimate <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}