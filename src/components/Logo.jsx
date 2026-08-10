import React from "react";
import { Link } from "react-router-dom";

// Compact logo mark — a stylized garage-floor tile with a lime spark.
// Uses currentColor so it adapts to dark/light headers; the lime dot is fixed.
export default function Logo({ colorClass = "text-white", className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Epoxy Garage Floor Estimate — home"
      className={`inline-flex items-center gap-2 shrink-0 ${colorClass} ${className}`}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="4"
          width="26"
          height="24"
          rx="6"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M3 12h26M3 20h26"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="25" cy="7.5" r="2.6" fill="#a3e635" />
      </svg>
      <span className="hidden sm:inline font-display font-bold tracking-tight text-sm">
        Epoxy Garage Floors
      </span>
    </Link>
  );
}