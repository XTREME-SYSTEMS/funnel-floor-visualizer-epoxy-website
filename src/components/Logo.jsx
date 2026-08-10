import React from "react";
import { Link } from "react-router-dom";

const LOGO_URL = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/8de07d3fd_XTREMEPOLISHINGSYSTEMSLOGO.jpg";

// XPS logo (direct URL), top-left of every page. Clicking always returns home.
export default function Logo({ className = "" }) {
  return (
    <Link to="/" aria-label="Xtreme Polishing Systems — home" className={`inline-flex items-center shrink-0 ${className}`}>
      <img src={LOGO_URL} alt="Xtreme Polishing Systems" className="h-9 w-auto object-contain" />
    </Link>
  );
}