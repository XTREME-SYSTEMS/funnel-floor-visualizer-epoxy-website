import { useState, useEffect, useCallback } from "react";

/**
 * PWA install hook — captures the browser's beforeinstallprompt event so the
 * app can show a branded "Add to Home Screen" button. Also detects whether
 * the app is already running in installed (standalone) mode.
 */
export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone) setIsInstalled(true);

    const onPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted" || outcome === "dismissed") {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  return { canInstall: !!deferredPrompt, isInstalled, promptInstall };
}