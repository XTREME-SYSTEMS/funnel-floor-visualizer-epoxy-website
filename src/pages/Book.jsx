import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useSettings } from "@/lib/useSettings";
import { trackEvent } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { format, addDays } from "date-fns";
import { Loader2 } from "lucide-react";

const SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { data: lead } = useQuery({ queryKey: ["lead", id], queryFn: () => base44.entities.Lead.get(id) });
  const [date, setDate] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [time, setTime] = useState("");
  const [saving, setSaving] = useState(false);

  const days = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i + 1));

  const confirm = async () => {
    setSaving(true);
    const appt = await base44.entities.Appointment.create({
      lead_id: id,
      type: "PHONE CONSULTATION",
      date,
      time,
      salesperson: settings.salesperson?.name || "",
      status: "booked"
    });
    await base44.entities.Lead.update(id, { status: "PHONE CONSULTATION BOOKED", appointment_status: "phone_booked" });
    await trackEvent("consultation_booked", { lead_id: id });
    navigate(`/booked/${appt.id}`);
  };

  if (settings.calendar_url) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Free Garage Floor Consultation</h1>
          <iframe title="Scheduler" src={settings.calendar_url} className="mt-6 w-full h-[720px] rounded-2xl border border-stone-200 bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="text-xs font-bold tracking-[0.2em] text-amber-600">FREE GARAGE FLOOR CONSULTATION</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">Pick a time that works for you</h1>
        <p className="mt-3 text-stone-500">
          A quick call with {settings.salesperson?.name} to review your estimate{lead ? ` for ${lead.address}` : ""}.
        </p>

        <div className="mt-8">
          <div className="text-sm font-medium text-stone-600 mb-3">Choose a day</div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => {
              const key = format(d, "yyyy-MM-dd");
              return (
                <button
                  key={key}
                  onClick={() => setDate(key)}
                  className={`shrink-0 w-20 py-3 rounded-xl border text-center ${date === key ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}
                >
                  <div className="text-[11px] uppercase text-stone-500">{format(d, "EEE")}</div>
                  <div className="text-lg font-semibold text-stone-900">{format(d, "d")}</div>
                  <div className="text-[11px] text-stone-500">{format(d, "MMM")}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <div className="text-sm font-medium text-stone-600 mb-3">Choose a time</div>
          <div className="grid grid-cols-3 gap-3">
            {SLOTS.map((s) => (
              <button
                key={s}
                onClick={() => setTime(s)}
                className={`h-14 rounded-xl border font-medium ${time === s ? "border-amber-500 bg-amber-50 text-stone-900" : "border-stone-200 bg-white text-stone-700"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={confirm}
          disabled={!time || saving}
          className="mt-10 w-full h-14 rounded-xl bg-stone-900 hover:bg-stone-800 text-base font-semibold"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "CONFIRM MY CONSULTATION"}
        </Button>
      </div>
    </div>
  );
}