import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Browser-style back button. Goes to the previous page in history; if there
// is no history (direct entry), falls back to `to` (home by default).
export default function BackButton({ to = "/", showLabel = true, className = "" }) {
  const navigate = useNavigate();
  const handle = () => {
    if (window.history.length > 1) navigate(-1);
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