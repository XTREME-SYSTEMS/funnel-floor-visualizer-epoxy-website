import React, { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const APPT_TYPES = [
  { key: "consultation", label: "Phone Consultation", desc: "Talk with our team about your project" },
  { key: "followup", label: "Follow-Up Visit", desc: "Post-installation check" },
  { key: "maintenance", label: "Maintenance Service", desc: "Re-seal or touch-up appointment" },
];

const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function CareSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "consultation", date: "", time: "9:00 AM", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        const projects = await base44.entities.ClientProject.filter({ client_email: me.email });
        if (projects[0]) {
          const appts = await base44.entities.Appointment.filter({ lead_id: projects[0].id });
          setAppointments(appts);
        }
      } catch (err) {
        console.error("Schedule load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleBook = async () => {
    setError("");
    if (!form.date) {
      setError("Please select a date.");
      return;
    }
    setSubmitting(true);
    try {
      const me = await base44.auth.me();
      const projects = await base44.entities.ClientProject.filter({ client_email: me.email });
      const projectId = projects[0]?.id;
      if (!projectId) {
        setError("No project found to book appointment.");
        return;
      }
      const appt = await base44.entities.Appointment.create({
        lead_id: projectId,
        type: form.type === "consultation" ? "PHONE CONSULTATION" : "IN-HOME ESTIMATE",
        date: form.date,
        time: form.time,
        notes: form.notes,
        status: "booked",
      });
      setAppointments((prev) => [...prev, appt]);
      setShowForm(false);
      setForm({ type: "consultation", date: "", time: "9:00 AM", notes: "" });
    } catch (err) {
      setError("Could not book appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-3 space-y-4">
      <div>
        <h1 className="text-lg font-black text-stone-900">Schedule</h1>
        <p className="text-xs text-stone-500">Book consultations & follow-ups</p>
      </div>

      {/* Upcoming appointments */}
      {appointments.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-stone-900 mb-2">Your Appointments</h2>
          <div className="space-y-2">
            {appointments.map((appt) => (
              <div key={appt.id} className="rounded-xl bg-white border border-stone-200 p-3 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: GOLD_GRADIENT, border: "1.5px solid #000" }}
                >
                  <Calendar className="h-5 w-5 text-stone-900" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-stone-900">{appt.type}</div>
                  <div className="text-xs text-stone-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(appt.date).toLocaleDateString()} at {appt.time}
                  </div>
                </div>
                <span
                  className="text-[9px] font-bold px-2 py-1 rounded-full"
                  style={{
                    background: appt.status === "completed" ? "#dcfce7" : "#fef3c7",
                    color: appt.status === "completed" ? "#166534" : "#92400e",
                  }}
                >
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book new appointment */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold"
          style={{ background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }}
        >
          <Calendar className="h-5 w-5" /> Book an Appointment
        </button>
      ) : (
        <div className="rounded-2xl bg-white border border-stone-200 p-4 space-y-3">
          <h2 className="text-sm font-bold text-stone-900">New Appointment</h2>

          {/* Type */}
          <div>
            <label className="text-xs font-semibold text-stone-600 mb-1 block">Type</label>
            <div className="space-y-1.5">
              {APPT_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setForm({ ...form, type: t.key })}
                  className="w-full text-left rounded-xl p-3 border transition"
                  style={
                    form.type === t.key
                      ? { borderColor: "#D4AF37", borderWidth: 2, background: "#FFFBEB" }
                      : { borderColor: "#e5e5e5", background: "white" }
                  }
                >
                  <div className="text-sm font-bold text-stone-900">{t.label}</div>
                  <div className="text-[10px] text-stone-500">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-semibold text-stone-600 mb-1 block">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
              className="w-full h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-xs font-semibold text-stone-600 mb-1 block">Time</label>
            <div className="grid grid-cols-3 gap-1.5">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, time: t })}
                  className="h-9 rounded-lg text-xs font-bold transition"
                  style={
                    form.time === t
                      ? { background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }
                      : { background: "white", border: "1px solid #e5e5e5", color: "#71717a" }
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-stone-600 mb-1 block">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Anything we should know?"
              rows={2}
              className="w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-amber-500 outline-none resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 h-11 rounded-xl border border-stone-200 text-sm font-bold text-stone-600"
            >
              Cancel
            </button>
            <button
              onClick={handleBook}
              disabled={submitting}
              className="flex-1 h-11 rounded-xl text-sm font-bold disabled:opacity-50"
              style={{ background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }}
            >
              {submitting ? "Booking..." : "Confirm"}
            </button>
          </div>
        </div>
      )}

      {/* Care line */}
      <div className="rounded-2xl bg-stone-900 p-4 text-center">
        <Phone className="h-6 w-6 text-amber-400 mx-auto mb-2" />
        <p className="text-sm font-bold text-white">Need to talk now?</p>
        <p className="text-xs text-stone-400 mt-1 mb-3">Our care team is standing by</p>
        <a
          href="tel:+18555555555"
          className="inline-flex h-10 px-5 items-center justify-center gap-2 rounded-xl text-sm font-bold"
          style={{ background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }}
        >
          <Phone className="h-4 w-4" /> Call (855) 555-5555
        </a>
      </div>
    </div>
  );
}