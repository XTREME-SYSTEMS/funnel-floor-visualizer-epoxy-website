import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import { usePwaInstall } from "@/lib/usePwaInstall";
import { CheckCircle2, Download as DownloadIcon, ArrowRight, Sparkles } from "lucide-react";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const [installing, setInstalling] = useState(false);

  const edition = searchParams.get("edition") === "contractor" ? "contractor" : "home-designer";
  const appPath = edition === "contractor" ? "/elite" : "/";

  const handleInstall = async () => {
    setInstalling(true);
    await promptInstall();
    setInstalling(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto overflow-hidden mb-4">
          <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI Systems" className="w-full h-full" fittingType="fit" />
        </div>

        {/* Success */}
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-9 w-9 text-amber-500" />
        </div>

        <h1 className="text-2xl font-black text-white">You're all set!</h1>
        <p className="text-sm text-stone-400 mt-2 leading-relaxed">
          Your 15-day free trial has started. We're confirming your payment — your card
          won't be charged until the trial ends. You can cancel anytime.
        </p>

        {/* Install app */}
        <div className="mt-6 rounded-2xl bg-stone-900 border border-amber-500/30 p-5">
          <p className="text-sm font-bold text-white mb-1">Install the app on your phone</p>
          <p className="text-xs text-stone-400 mb-4">
            Add it to your home screen for instant access — just like a native app.
          </p>
          {isInstalled ? (
            <div className="flex items-center justify-center gap-2 text-amber-500 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" /> App installed
            </div>
          ) : canInstall ? (
            <button
              onClick={handleInstall}
              disabled={installing}
              className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-60 transition"
              style={{
                background: 'linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)',
                border: '2px solid #000',
                color: '#1a1a1a',
                boxShadow: '0 4px 12px rgba(255,215,0,.4), inset 0 1px rgba(255,255,255,.4)',
              }}
            >
              <DownloadIcon className="h-4 w-4" /> {installing ? "Installing..." : "Install on Home Screen"}
            </button>
          ) : (
            <div className="text-xs text-stone-400 leading-relaxed">
              <p className="mb-2">To install on iPhone: tap the Share button, then "Add to Home Screen".</p>
              <p>To install on Android: tap the menu (⋮), then "Install app".</p>
            </div>
          )}
        </div>

        {/* Open app */}
        <Link
          to={appPath}
          className="mt-4 w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold bg-stone-800 hover:bg-stone-700 text-white transition"
        >
          <Sparkles className="h-4 w-4 text-amber-500" /> Open the App <ArrowRight className="h-4 w-4" />
        </Link>

        <Link to="/" className="mt-6 block text-xs text-stone-500 hover:text-amber-500 transition">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}