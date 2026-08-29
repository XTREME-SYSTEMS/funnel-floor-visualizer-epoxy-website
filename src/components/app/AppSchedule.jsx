import React, { useState } from "react";
import { Calendar, Clock, Check, User, Phone, MessageSquare, Bell } from "lucide-react";
import { useSettings } from "@/lib/useSettings";

export default function AppSchedule({ appData }) {
  const { settings } = useSettings();
  const { appointment, setAppointment, timeline } = appData;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [type, setType] = useState("IN-HOME ESTIMATE");

  const handleSchedule = () => {
    if (!date) return;
    setAppointment({ date, time, type, salesperson: settings.salesperson?.name || "Your specialist", status: "booked" });
  };

  const googleCalLink = appointment
    ? `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`XPS ${type}`)}&dates=${date.replace(/-/g, "")}T${time.replace(":", "")}00/${date.replace(/-/g, "")}T${(Number(time.split(":")[0]) + 2).toString().padStart(2, "0")}:0000&details=${encodeURIComponent("Your in-home estimate with Xtreme Polishing Systems. Your specialist will text you the day before and the morning of your appointment.")}&location=${encodeURIComponent(settings.business_address || "")}`
    : "";

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Proposal Tracking</h1>
      <p className="text-sm text-stone-500 mb-4">Schedule your in-home visit and track every step — you'll always be in the loop.</p>

      {/* Schedule form */}
      {!appointment ? (
        <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-4 mb-4">
          <div className="flex gap-2 mb-3">
            {["PHONE CONSULTATION", "IN-HOME ESTIMATE"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition border-2 ${type === t ? "border-amber-500 bg-amber-50 text-stone-900" : "border-stone-200 text-stone-600"}`}
              >
                {t === "PHONE CONSULTATION" ? "Phone Call" : "In-Home Visit"}
              </button>
            ))}
          </div>
          <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Select a Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border-2 border-stone-200 text-sm focus:border-amber-400 outline-none mb-3"
          />
          <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Select a Time</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {["08:00", "10:00", "12:00", "14:00"].map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`py-2 rounded-xl text-xs font-semibold transition border-2 ${time === t ? "border-amber-500 bg-amber-50 text-stone-900" : "border-stone-200 text-stone-600"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={handleSchedule}
            disabled={!date}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition"
          >
            <Calendar className="h-4 w-4" /> Schedule Visit
          </button>
        </div>
      ) : (
        <>
          {/* Appointment confirmation */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              <Check className="h-4 w-4" /> Visit Confirmed
            </div>
            <div className="text-lg font-bold text-stone-900">{appointment.date} at {appointment.time}</div>
            <div className="text-sm text-stone-600">{appointment.type}</div>
            <a
              href={googleCalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-white px-3 py-2 rounded-lg border border-amber-200"
            >
              <Calendar className="h-3.5 w-3.5" /> Add to Google Calendar
            </a>
          </div>

          {/* Assigned rep */}
          <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              <User className="h-3.5 w-3.5" /> Your Specialist
            </div>
            <div className="flex items-center gap-3">
              {settings.salesperson?.photo_url && (
                <img src={settings.salesperson.photo_url} alt={appointment.salesperson} className="h-12 w-12 rounded-full object-cover" />
              )}
              <div>
                <div className="text-sm font-bold text-stone-900">{appointment.salesperson}</div>
                <div className="text-xs text-stone-500">{settings.salesperson?.title}</div>
                {settings.salesperson?.phone && (
                  <a href={`tel:${settings.salesperson.phone}`} className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-0.5">
                    <Phone className="h-3 w-3" /> {settings.salesperson.phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-4">
            <h2 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-1.5">
              <Bell className="h-4 w-4 text-amber-500" /> Communication Timeline
            </h2>
            <div className="space-y-0">
              {timeline.map((step, i) => {
                const isLast = i === timeline.length - 1;
                return (
                  <div key={step.key} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${step.status === "done" ? "bg-amber-500" : step.status === "upcoming" ? "bg-stone-200 border-2 border-amber-400" : "bg-stone-100 border-2 border-stone-200"}`}>
                        {step.status === "done" ? <Check className="h-4 w-4 text-stone-950" /> : <Clock className="h-3.5 w-3.5 text-stone-400" />}
                      </div>
                      {!isLast && <div className={`w-0.5 flex-1 ${step.status === "done" ? "bg-amber-500" : "bg-stone-200"} min-h-[24px]`} />}
                    </div>
                    <div className={`pb-4 ${isLast ? "pb-0" : ""}`}>
                      <div className={`text-sm font-semibold ${step.status === "done" ? "text-stone-900" : step.status === "upcoming" ? "text-stone-800" : "text-stone-400"}`}>{step.label}</div>
                      <div className="text-xs text-stone-500">{step.detail}</div>
                      {step.status === "upcoming" && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">UP NEXT</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SMS link */}
          <a
            href={`sms:${settings.phone || "(877) 958-6408"}?body=${encodeURIComponent("Hi! I have a question about my scheduled visit.")}`}
            className="mt-4 w-full h-12 rounded-xl bg-stone-900 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" /> Text your specialist
          </a>
        </>
      )}
    </div>
  );
}