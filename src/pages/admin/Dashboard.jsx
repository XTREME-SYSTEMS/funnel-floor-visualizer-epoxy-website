import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import StatCard from "@/components/admin/StatCard";
import { money } from "@/lib/pricing";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { isAfter, subDays, startOfDay } from "date-fns";

export default function Dashboard() {
  const { data: leads = [] } = useQuery({ queryKey: ["leads"], queryFn: () => base44.entities.Lead.list("-created_date", 500) });
  const { data: appts = [] } = useQuery({ queryKey: ["appts"], queryFn: () => base44.entities.Appointment.list("-created_date", 500) });
  const { data: events = [] } = useQuery({ queryKey: ["events"], queryFn: () => base44.entities.FunnelEvent.list("-created_date", 1000) });

  const today = startOfDay(new Date());
  const weekAgo = subDays(new Date(), 7);
  const inRange = (d, from) => isAfter(new Date(d), from);

  const todayCount = leads.filter((l) => inRange(l.created_date, today)).length;
  const weekCount = leads.filter((l) => inRange(l.created_date, weekAgo)).length;
  const phone = appts.filter((a) => a.type === "PHONE CONSULTATION").length;
  const home = appts.filter((a) => a.type === "IN-HOME ESTIMATE").length;
  const proposals = leads.filter((l) => l.status === "PROPOSAL SENT").length;
  const won = leads.filter((l) => l.status === "WON");
  const pipeline = leads.filter((l) => !["WON", "LOST"].includes(l.status)).reduce((s, l) => s + (l.estimate_mid || 0), 0);
  const convRate = leads.length ? Math.round((won.length / leads.length) * 100) : 0;

  const starts = events.filter((e) => e.event === "estimator_started").length;
  const visitors = events.filter((e) => e.event === "page_view").length;
  const newLeads = leads.filter((l) => l.status === "NEW ESTIMATE");

  const funnel = [
    ["Visitors", visitors],
    ["Estimator starts", starts],
    ["Leads created", leads.length],
    ["Estimates displayed", events.filter((e) => e.event === "estimate_viewed").length],
    ["Phone consultations booked", phone],
    ["Home visits booked", home],
    ["Proposals", proposals],
    ["Won jobs", won.length]
  ];

  return (
    <div className="space-y-8">
      {newLeads.length > 0 && (
        <div className="rounded-2xl bg-amber-500 text-stone-950 p-5 flex items-start gap-3">
          <Bell className="h-5 w-5 mt-0.5" />
          <div>
            <div className="font-bold">{newLeads.length} NEW ESTIMATE LEAD{newLeads.length > 1 ? "S" : ""}</div>
            <div className="text-sm mt-1">
              Newest: {newLeads[0].first_name} {newLeads[0].last_name} · {newLeads[0].city}{" "}
              <Link to={`/admin/leads/${newLeads[0].id}`} className="underline font-semibold">Open lead</Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard label="Estimates today" value={todayCount} />
        <StatCard label="Estimates this week" value={weekCount} />
        <StatCard label="Phone consultations" value={phone} />
        <StatCard label="Home visits booked" value={home} />
        <StatCard label="Proposals" value={proposals} />
        <StatCard label="Won projects" value={won.length} />
        <StatCard label="Est. pipeline value" value={money(pipeline)} />
        <StatCard label="Conversion rate" value={`${convRate}%`} sub="Leads → won" />
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 p-6">
        <h2 className="font-semibold text-stone-900">MVP success funnel</h2>
        <div className="mt-4 space-y-2">
          {funnel.map(([label, value]) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-56 text-sm text-stone-600 shrink-0">{label}</div>
              <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-900" style={{ width: `${Math.min(100, (value / Math.max(1, funnel[0][1] || value || 1)) * 100)}%` }} />
              </div>
              <div className="w-12 text-right text-sm font-semibold tabular-nums">{value}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Estimator start → lead: {starts ? Math.round((leads.length / starts) * 100) : 0}% · Lead → phone consultation:{" "}
          {leads.length ? Math.round((phone / leads.length) * 100) : 0}% · Lead → won: {convRate}%
        </p>
      </div>
    </div>
  );
}