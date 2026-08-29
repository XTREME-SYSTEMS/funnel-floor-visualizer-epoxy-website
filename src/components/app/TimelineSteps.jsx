import React from "react";
import { Check, Clock, Bell } from "lucide-react";

// Polished step-by-step progress timeline using the Xtreme AI design system.
const STATUS_PERCENT = { done: 100, upcoming: 50, pending: 0 };

export default function TimelineSteps({ timeline, onClick }) {
  const completed = timeline.filter((s) => s.status === "done").length;
  const overallPct = Math.round((completed / timeline.length) * 100);

  return (
    <div className="xa-card-dark">
      <div className="xa-section-head">
        <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bell className="w-4 h-4" style={{ color: "var(--vx-accent)" }} /> Next Steps
        </h2>
        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--vx-accent)" }}>{overallPct}%</span>
      </div>
      <div className="xa-progress-track" style={{ margin: "4px 0 16px" }}>
        <div className="xa-progress-fill" style={{ width: `${overallPct}%` }} />
      </div>
      <div className="space-y-3.5">
        {timeline.map((step) => {
          const pct = STATUS_PERCENT[step.status] || 0;
          const isActive = pct > 0;
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`xa-step-node ${step.status === "done" ? "done" : step.status === "upcoming" ? "current" : ""}`}>
                {step.status === "done" ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <Clock className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 13, fontWeight: 600, color: isActive ? "var(--vx-text)" : "var(--vx-faint)" }} className="truncate">{step.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: isActive ? "var(--vx-accent)" : "var(--vx-faint)" }} className="ml-2 shrink-0">{pct}%</span>
                </div>
                <div className="xa-progress-track" style={{ height: 8 }}>
                  <div className="xa-progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}