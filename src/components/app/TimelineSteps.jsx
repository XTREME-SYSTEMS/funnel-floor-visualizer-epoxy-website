import React from "react";
import { Check, Clock, Bell } from "lucide-react";

// Polished step-by-step progress timeline matching the "Next Steps" reference:
// circular icon + step name + progress bar + percentage per row.
const STATUS_PERCENT = { done: 100, upcoming: 50, pending: 0 };

export default function TimelineSteps({ timeline, onClick }) {
  const completed = timeline.filter((s) => s.status === "done").length;
  const overallPct = Math.round((completed / timeline.length) * 100);

  const Wrapper = onClick ? "button" : "div";

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
          <Bell className="h-4 w-4 text-amber-500" /> Next Steps
        </h2>
        <span className="text-xs font-bold text-amber-600">{overallPct}% complete</span>
      </div>
      <div className="space-y-3.5">
        {timeline.map((step) => {
          const pct = STATUS_PERCENT[step.status] || 0;
          const isActive = pct > 0;
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition ${isActive ? "bg-amber-500" : "bg-stone-100"}`}>
                {step.status === "done" ? (
                  <Check className="h-4 w-4 text-stone-950" strokeWidth={3} />
                ) : (
                  <Clock className="h-4 w-4 text-stone-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-semibold truncate ${isActive ? "text-stone-900" : "text-stone-500"}`}>{step.label}</span>
                  <span className={`text-xs font-bold ml-2 shrink-0 ${isActive ? "text-amber-600" : "text-stone-400"}`}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isActive ? "bg-amber-500" : "bg-stone-200"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}