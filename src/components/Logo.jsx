import React from "react";
import { Link } from "react-router-dom";

// Domain wordmark, top-left of every page. Clicking always returns home.
export default function Logo({ colorClass = "text-white", className = "" }) {
  return (
    <Link
      to="/"
      aria-label="epoxygaragefloorestimate.com — home"
      className={`inline-flex items-center shrink-0 font-display font-bold tracking-tight text-sm sm:text-base ${colorClass} ${className}`}
    >
      epoxygaragefloorestimate.com
    </Link>
  );
}