import React from "react";

export default function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-stone-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-stone-900 tabular-nums">{value}</div>
      {sub && <div className="mt-1 text-xs text-stone-500">{sub}</div>}
    </div>
  );
}