import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { canGoBack } from "@/lib/navHistory";

// Browser-style back button. Goes to the previous in-app page when there is
// one; otherwise falls back to `to` (home by default). Uses our own navigation
// depth tracker because `window.history.length` is unreliable in an iframe.
export default function BackButton({ to = "/", showLabel = true, className = "" }) {
  const navigate = useNavigate();
  const handle = () => {
    if (canGoBack()) navigate(-1);
    else navigate(to);
  };
  return (
    <button
      type="button"
      onClick={handle}
      aria-label="Go back"
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {showLabel && <span>Back</span>}
    </button>
  );
}