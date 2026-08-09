import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare } from "lucide-react";

export default function TrustSection({ settings, leadId, onConsultationClick }) {
  const sp = settings.salesperson || {};
  return (
    <section className="rounded-3xl bg-stone-950 text-white p-7 md:p-10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Have Questions About Your Estimate?</h2>
      <p className="mt-3 text-stone-400 leading-relaxed max-w-xl">
        Your floor specialist can review your garage, answer questions and help narrow your estimate.
      </p>

      <div className="mt-8 flex items-start gap-4">
        {sp.photo_url && <img src={sp.photo_url} alt={sp.name} className="h-20 w-20 rounded-2xl object-cover" />}
        <div>
          <div className="font-semibold text-lg">{sp.name}</div>
          <div className="text-amber-400 text-sm">{sp.title}</div>
          <p className="mt-2 text-sm text-stone-400 leading-relaxed max-w-md">{sp.bio}</p>
          <a href={`tel:${sp.phone}`} className="mt-2 inline-block text-sm text-white underline">{sp.phone}</a>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          to={`/book/${leadId}`}
          onClick={onConsultationClick}
          className="h-14 rounded-xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center hover:bg-amber-400 transition"
        >
          BOOK MY FREE CONSULTATION
        </Link>
        <a href={`tel:${sp.phone}`} className="h-14 rounded-xl border border-stone-700 flex items-center justify-center gap-2 font-semibold hover:bg-stone-900 transition">
          <Phone className="h-4 w-4" /> CALL NOW
        </a>
      </div>
      <a href={`sms:${sp.phone}`} className="mt-3 inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white">
        <MessageSquare className="h-4 w-4" /> Text my specialist instead
      </a>
    </section>
  );
}