import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Calendar } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function SalespersonProfile({ settings }) {
  const sp = settings.salesperson || {};
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-bold tracking-[0.2em] text-amber-500">A PERSONAL TOUCH</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-stone-900">
            Build trust with a real person
          </h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Homeowners know exactly who they'll talk to. No call centers, no runaround — just a local specialist who knows garage floors.
          </p>
        </div>
        <div className="max-w-md mx-auto rounded-3xl border border-stone-200 overflow-hidden bg-white shadow-sm">
          {sp.photo_url && (
            <div className="h-80 bg-stone-100">
              <Image src={sp.photo_url} alt={sp.name} fittingType="fill" focalPointX={0.5} focalPointY={0} className="h-full w-full" />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-stone-900">{sp.name}</h3>
            <p className="text-sm text-amber-600 font-medium">{sp.title}</p>
            {sp.bio && <p className="mt-3 text-sm text-stone-600 leading-relaxed">{sp.bio}</p>}
            <div className="mt-5 space-y-2">
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-stone-700">
                  <Phone className="h-4 w-4 text-stone-400" /> {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-stone-700">
                  <Mail className="h-4 w-4 text-stone-400" /> {settings.email}
                </a>
              )}
            </div>
            <Link to="/funnel" className="mt-6 h-12 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-semibold transition">
              <Calendar className="h-4 w-4" /> Book a consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}