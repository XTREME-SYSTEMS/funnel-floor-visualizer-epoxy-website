import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Calendar, MapPin, GraduationCap, Building2, Award } from "lucide-react";
import { Image } from "@/components/ui/image";
import LocationMap from "@/components/home/LocationMap";

const TRAINING_IMG = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/8bb317033_IMG_8152-min_c55bf5c4-40e1-4893-b5c7-699a395f36c6.jpg";
const SHOWROOM_IMG = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/74e7fe427_images1.jpg";
const XPS_IMG = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/92ad83dc2_xtreme-polishing-systems-blog-paragraph_03_d7345246-7dbb-4a6d-8e86-08bcc63927be.webp";
const CHRIS_IMG = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/910b91397_chris-lavin-xtreme-polishing-systems-600w.webp";

const stats = [
  { value: "30+", label: "Years in business" },
  { value: "70+", label: "Locations nationwide" },
  { value: "#1", label: "Concrete & epoxy trade school" },
  { value: "1,000s", label: "Floors polished & coated" }
];

const pillars = [
  {
    icon: Building2,
    name: "Xtreme Polishing Systems",
    img: XPS_IMG,
    body: "Our parent company and the nation's premier decorative concrete solutions provider for nearly 30 years. Based in Pompano Beach, FL, XPS manufactures and distributes the equipment, epoxy coatings, and tooling that contractors across the country rely on every day."
  },
  {
    icon: MapPin,
    name: "XPS Xpress",
    img: SHOWROOM_IMG,
    body: "A trusted global brand with more than 70 branches worldwide, XPS Xpress brings premium epoxy and concrete supplies, equipment, and fast shipping to pros and homeowners close to home — including our flagship store at 2200 NW 32nd Street, Pompano Beach, FL."
  },
  {
    icon: GraduationCap,
    name: "Polished Concrete University",
    img: TRAINING_IMG,
    body: "Our hands-on epoxy and polished concrete training school. Ranked the world's #1 trade school for the craft, PCU runs 5-day certification courses every month at our Epoxy Training Center — teaching the same techniques we use on your garage."
  }
];

export default function WhoWeAre({ settings }) {
  const sp = settings.salesperson || {};
  return (
    <section className="bg-white pt-10 pb-20 md:pt-12 md:pb-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-4xl md:text-6xl font-bold tracking-[0.25em] text-amber-500">WHO WE ARE</div>
          <h2 className="mt-10 text-3xl md:text-5xl font-semibold tracking-tight text-stone-900">
            Backed by Xtreme Polishing Systems
          </h2>
          <p className="mt-4 text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Your estimate isn't coming from a lead farm. It's coming from a family-owned, Florida-based company that has been perfecting concrete and epoxy flooring for nearly 30 years — the same team that trains the pros and supplies the industry.
          </p>
        </div>

        {/* Stats band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-stone-50 border border-stone-100 p-6 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-stone-900">{s.value}</div>
              <div className="mt-1 text-xs md:text-sm text-stone-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p) => (
            <div key={p.name} className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-sm flex flex-col">
              <div className="h-44 bg-stone-100">
                <Image src={p.img} alt={p.name} fittingType="fill" className="h-full w-full" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 mb-3">
                  <p.icon className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900">{p.name}</h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Find your nearest XPS Xpress store */}
        <div className="mb-20">
          <LocationMap />
        </div>

        {/* Leadership: Chris + Jeremy */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Chris Lavin — owner */}
          <div className="md:col-span-2 rounded-3xl border border-stone-200 overflow-hidden bg-white shadow-sm">
            <div className="h-64 md:h-80 bg-stone-100">
              <Image src={CHRIS_IMG} alt="Chris Lavin on a floor grinder" fittingType="fill" focalPointX={0.5} focalPointY={0} className="h-full w-full" />
            </div>
            <div className="p-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-amber-600">
                <Award className="h-4 w-4" /> OWNER & FOUNDER
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-stone-900">Chris Lavin</h3>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                Chris built Xtreme Polishing Systems from the ground up over a 20+ year career, growing it into a multi-location national brand. He's renowned for polishing and epoxy coating more floors than anyone globally — and for training the next generation of pros through Polished Concrete University.
              </p>
              <p className="mt-3 text-sm text-stone-500 italic">
                "If you want to be something you've never been before, you've got to do something you've never done before."
              </p>
            </div>
          </div>

          {/* Jeremy — smaller card */}
          <div className="rounded-3xl border border-stone-200 overflow-hidden bg-white shadow-sm">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-stone-900">{sp.name}</h3>
              <p className="text-xs text-amber-600 font-semibold leading-snug mt-1">
                Director of AI Architecture &amp; Engineering<br />Senior Floor Specialist
              </p>
              <div className="mt-4 space-y-1.5">
                {settings.phone && (
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-xs text-stone-700">
                    <Phone className="h-3.5 w-3.5 text-stone-400" /> {settings.phone}
                  </a>
                )}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-xs text-stone-700">
                    <Mail className="h-3.5 w-3.5 text-stone-400" /> {settings.email}
                  </a>
                )}
              </div>
              <Link to="/funnel" className="mt-5 h-10 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-sm font-semibold transition">
                <Calendar className="h-4 w-4" /> Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}