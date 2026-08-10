import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const LOGO_URL = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/8de07d3fd_XTREMEPOLISHINGSYSTEMSLOGO.jpg";

// XPS logo, top-left of every page. Clicking always returns to the home page.
export default function Logo({ className = "" }) {
  return (
    <Link to="/" aria-label="Xtreme Polishing Systems — home" className={`inline-flex items-center justify-center rounded-lg overflow-hidden bg-stone-950 h-9 w-20 shrink-0 ${className}`}>
      <Image src={LOGO_URL} alt="Xtreme Polishing Systems" fittingType="fit" className="h-full w-full" />
    </Link>
  );
}