import React, { useState, useEffect } from "react";
import {
  Sparkles, Shield, Droplets, Snowflake, Sun, Leaf, Wind,
  CheckCircle2, Mail, MessageSquare, Bell, Download,
} from "lucide-react";
import { base44 } from "@/api/base44Client";

const SEASONAL_ICONS = {
  Spring: Leaf,
  Summer: Sun,
  Fall: Wind,
  Winter: Snowflake,
};

const DEFAULT_CLEANING = [
  "Sweep or dust mop regularly to remove dirt and debris",
  "Use a soft-bristle broom or microfiber mop for best results",
  "For deeper cleaning, use a neutral pH cleaner with warm water",
  "Avoid harsh chemicals, abrasive pads, or acidic cleaners",
  "Wipe spills immediately to prevent staining",
  "Place felt pads under heavy furniture to prevent scratches",
];

const DEFAULT_SEASONAL = [
  { season: "Spring", task: "Deep clean and inspect for winter damage", month: "March" },
  { season: "Summer", task: "Check for UV exposure areas and reapply UV topcoat if needed", month: "June" },
  { season: "Fall", task: "Clean thoroughly before winter; remove leaves and debris", month: "September" },
  { season: "Winter", task: "Use walk-off mats at entry points; avoid salt de-icers", month: "December" },
];

const DEFAULT_PRODUCTS = [
  { name: "XPS Neutral Cleaner", purpose: "Routine cleaning", frequency: "Weekly" },
  { name: "XPS Floor Polish", purpose: "Restore shine", frequency: "Every 6 months" },
  { name: "XPS Topcoat Kit", purpose: "Re-seal surface", frequency: "Every 2-3 years" },
];

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function CareMaintenance() {
  const [project, setProject] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sentMsg, setSentMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        const projects = await base44.entities.ClientProject.filter({ client_email: me.email });
        const p = projects[0];
        setProject(p);
        if (p) {
          const plans = await base44.entities.MaintenancePlan.filter({ project_id: p.id });
          setPlan(plans[0]);
        }
      } catch (err) {
        console.error("Maintenance load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sendPackage = async (channel) => {
    setSending(true);
    setSentMsg("");
    try {
      const me = await base44.auth.me();
      await base44.integrations.Core.SendEmail({
        to: me.email,
        subject: "Your XPS Floor Care Maintenance Package",
        body: `Hi ${me.full_name || "there"},\n\nHere is your custom floor care maintenance package for your ${project?.floor_system || "epoxy floor"}.\n\nCLEANING INSTRUCTIONS:\n${DEFAULT_CLEANING.map((c) => `• ${c}`).join("\n")}\n\nSEASONAL REMINDERS:\n${DEFAULT_SEASONAL.map((s) => `• ${s.season} (${s.month}): ${s.task}`).join("\n")}\n\nRECOMMENDED PRODUCTS:\n${DEFAULT_PRODUCTS.map((p) => `• ${p.name} — ${p.purpose} (${p.frequency})`).join("\n")}\n\nThank you for choosing XPS!\nYour Client Care Team`,
      });
      setSentMsg(`Sent to your email successfully!`);
    } catch (err) {
      setSentMsg("Could not send. Please try again.");
    } finally {
      setSending(false);
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
        <h1 className="text-lg font-black text-stone-900">Maintenance Plan</h1>
        <p className="text-xs text-stone-500">Custom care guide for your floor</p>
      </div>

      {/* Floor system */}
      {project && (
        <div className="rounded-2xl bg-stone-900 p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Shield className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Your Floor</span>
          </div>
          <div className="text-sm font-bold text-white">{project.floor_system || "Epoxy Floor System"}</div>
          {project.warranty_expiration && (
            <div className="text-xs text-stone-400 mt-1">
              Warranty valid until {new Date(project.warranty_expiration).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      {/* Send package */}
      <div className="rounded-2xl border-2 border-amber-500 bg-amber-50 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-5 w-5 text-amber-600" />
          <span className="text-sm font-black text-amber-700 uppercase tracking-wide">
            Get Your Care Package
          </span>
        </div>
        <p className="text-xs text-stone-700 mb-3">
          Receive your custom maintenance guide via your preferred channel.
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => sendPackage("email")}
            disabled={sending}
            className="flex flex-col items-center gap-1 rounded-xl bg-white border border-amber-200 p-2 disabled:opacity-50"
          >
            <Mail className="h-5 w-5 text-amber-600" />
            <span className="text-[10px] font-bold text-stone-700">Email</span>
          </button>
          <button
            onClick={() => sendPackage("sms")}
            disabled={sending}
            className="flex flex-col items-center gap-1 rounded-xl bg-white border border-amber-200 p-2 disabled:opacity-50"
          >
            <MessageSquare className="h-5 w-5 text-amber-600" />
            <span className="text-[10px] font-bold text-stone-700">SMS</span>
          </button>
          <button
            onClick={() => sendPackage("app")}
            disabled={sending}
            className="flex flex-col items-center gap-1 rounded-xl bg-white border border-amber-200 p-2 disabled:opacity-50"
          >
            <Bell className="h-5 w-5 text-amber-600" />
            <span className="text-[10px] font-bold text-stone-700">App</span>
          </button>
        </div>
        {sentMsg && (
          <p className="mt-2 text-xs text-green-700 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> {sentMsg}
          </p>
        )}
      </div>

      {/* Cleaning instructions */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Droplets className="h-4 w-4 text-amber-600" />
          <h2 className="text-sm font-bold text-stone-900">Cleaning Instructions</h2>
        </div>
        <ul className="space-y-2">
          {DEFAULT_CLEANING.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Seasonal reminders */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <h2 className="text-sm font-bold text-stone-900">Seasonal Care Reminders</h2>
        </div>
        <div className="space-y-2">
          {DEFAULT_SEASONAL.map((s, i) => {
            const Icon = SEASONAL_ICONS[s.season] || Sparkles;
            return (
              <div key={i} className="flex items-start gap-2.5 rounded-xl bg-stone-50 p-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: GOLD_GRADIENT, border: "1px solid #000" }}
                >
                  <Icon className="h-4 w-4 text-stone-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {s.season} · {s.month}
                  </div>
                  <div className="text-[11px] text-stone-500">{s.task}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended products */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Download className="h-4 w-4 text-amber-600" />
          <h2 className="text-sm font-bold text-stone-900">Recommended Products</h2>
        </div>
        <div className="space-y-2">
          {DEFAULT_PRODUCTS.map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-stone-50 p-3">
              <div>
                <div className="text-xs font-bold text-stone-900">{p.name}</div>
                <div className="text-[10px] text-stone-500">{p.purpose}</div>
              </div>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                {p.frequency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Warranty */}
      {project?.warranty_expiration && (
        <div className="rounded-2xl bg-white border border-stone-200 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Shield className="h-4 w-4 text-amber-600" />
            <h2 className="text-sm font-bold text-stone-900">Warranty</h2>
          </div>
          <p className="text-xs text-stone-700">
            Your floor is covered by our warranty until{" "}
            <span className="font-bold text-stone-900">
              {new Date(project.warranty_expiration).toLocaleDateString()}
            </span>
            . Contact our care team if you have any concerns.
          </p>
        </div>
      )}
    </div>
  );
}