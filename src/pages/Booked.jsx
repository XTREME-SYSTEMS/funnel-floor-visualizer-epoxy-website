import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useSettings } from "@/lib/useSettings";
import { money } from "@/lib/pricing";
import { format, parseISO } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";

const steps = [
  "We'll review the information you submitted.",
  "We'll discuss the floor and finish you're considering.",
  "We'll answer questions about the estimated range.",
  "If everything looks like a fit, we'll schedule an in-home inspection.",
  "Final project pricing is confirmed after the project is properly evaluated."
];

export default function Booked() {
  const { id } = useParams();
  const { settings } = useSettings();
  const { data: appt } = useQuery({ queryKey: ["appt", id], queryFn: () => base44.entities.Appointment.get(id) });
  const { data: lead } = useQuery({
    queryKey: ["lead", appt?.lead_id],
    queryFn: () => base44.entities.Lead.get(appt.lead_id),
    enabled: !!appt?.lead_id
  });

  if (!appt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-stone-950 text-white">
        <div className="max-w-xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3"><BackButton className="text-stone-300 hover:text-white" /><Logo /></div>
        </div>
      </header>
      <div className="max-w-xl mx-auto px-6 py-14">
        <CheckCircle2 className="h-12 w-12 text-amber-500" />
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-900">You're All Set.</h1>

        <div className="mt-8 rounded-2xl bg-white border border-stone-200 divide-y divide-stone-200">
          {[
            ["Appointment date", format(parseISO(appt.date), "EEEE, MMMM d, yyyy")],
            ["Appointment time", appt.time],
            ["Floor specialist", appt.salesperson || settings.salesperson?.name],
            ["Property address", lead ? `${lead.address}, ${lead.city}, ${lead.state} ${lead.zip}` : "—"],
            ["Estimate range", lead ? `${money(lead.estimate_low)} – ${money(lead.estimate_high)}` : "—"]
          ].map(([l, v]) => (
            <div key={l} className="px-5 py-4 flex justify-between gap-6 text-sm">
              <span className="text-stone-500">{l}</span>
              <span className="font-medium text-stone-900 text-right">{v}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-semibold text-stone-900">What happens next</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-stone-600 text-sm leading-relaxed">
              <span className="shrink-0 h-6 w-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-semibold">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>

        <p className="mt-10 text-xs text-stone-500 leading-relaxed">{settings.disclaimer}</p>
        <Link to="/" className="mt-8 inline-block text-sm font-medium text-stone-900 underline">Back to homepage</Link>
      </div>
    </div>
  );
}