import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Zap, ShieldCheck, AlertTriangle, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

// Fully automatic Google Search Console verification bridge.
// Uses a user-provided Google OAuth client (GOOGLE_CLIENT_ID/SECRET) with the
// siteverification scope to get a token, inject it, and verify via API.
export default function GoogleAutoVerifier({ onVerified }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState(null);

  const redirectUri = (typeof window !== "undefined" ? window.location.origin : "https://epoxygaragefloorestimate.com") + "/admin/google";

  // Handle the OAuth callback (?code=...) on this route
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;
    (async () => {
      setBusy(true);
      setMsg("Exchanging Google authorization and verifying…");
      try {
        const ex = await base44.functions.invoke("googleVerifierExchange", { code, redirect_uri: redirectUri });
        const exd = ex.data || ex;
        if (exd.error) { setMsg("Auth failed: " + exd.error); setBusy(false); return; }
        const v = await base44.functions.invoke("verifySearchConsole", {});
        const d = v.data || v;
        setResult(d);
        if (d.verified) { setMsg("✓ Verified! Your site is now verified in Google Search Console."); if (onVerified) onVerified(); }
        else setMsg("Connected. Google couldn't see the tag on the first try — click Verify now again in ~30 seconds (the tag takes a moment to render live).");
      } catch (e) { setMsg("Error: " + e.message); }
      setBusy(false);
      window.history.replaceState({}, "", window.location.pathname);
    })();
  }, []);

  const connect = async () => {
    setBusy(true); setMsg("");
    try {
      const res = await base44.functions.invoke("googleVerifierConnectUrl", { redirect_uri: redirectUri });
      const d = res.data || res;
      if (d.url) window.location.href = d.url;
      else setMsg("Could not start: " + JSON.stringify(d));
    } catch (e) { setMsg("Error: " + e.message); }
    setBusy(false);
  };

  const verifyNow = async () => {
    setBusy(true); setMsg("Verifying…");
    try {
      const v = await base44.functions.invoke("verifySearchConsole", {});
      const d = v.data || v;
      setResult(d);
      if (d.verified) { setMsg("✓ Verified!"); if (onVerified) onVerified(); }
      else setMsg("Not verified yet — " + (d.error || "Google hasn't found the tag. Wait ~30s and retry."));
    } catch (e) { setMsg("Error: " + e.message); }
    setBusy(false);
  };

  return (
    <div className="rounded-xl border bg-white p-5 space-y-3">
      <h2 className="font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-amber-500" /> Fully automatic verification</h2>
      <p className="text-sm text-stone-600">Connect your own Google OAuth client (with the Site Verification scope) once, then verify with one click — no pasting tags, no opening Search Console.</p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={connect} disabled={busy}><KeyRound className="h-4 w-4 mr-1" /> Connect Google Verifier</Button>
        <Button onClick={verifyNow} disabled={busy} variant="outline"><ShieldCheck className="h-4 w-4 mr-1" /> Verify now</Button>
      </div>
      {busy && <div className="flex items-center gap-2 text-sm text-stone-500"><Loader2 className="h-4 w-4 animate-spin" /> {msg}</div>}
      {!busy && msg && (
        <div className={`text-sm flex items-start gap-2 ${result?.verified ? "text-emerald-600" : "text-stone-600"}`}>
          {result?.verified ? <ShieldCheck className="h-4 w-4 mt-0.5" /> : <AlertTriangle className="h-4 w-4 mt-0.5" />} {msg}
        </div>
      )}
      {result && <pre className="text-xs bg-stone-50 rounded p-2 overflow-auto max-h-40">{JSON.stringify(result, null, 2)}</pre>}
      <details className="text-xs text-stone-500">
        <summary className="cursor-pointer font-medium">One-time setup — create the Google OAuth client</summary>
        <ol className="list-decimal ml-5 mt-2 space-y-1">
          <li>Google Cloud Console → APIs &amp; Services → Library → enable <b>Google Site Verification API</b>.</li>
          <li>Credentials → Create Credentials → <b>OAuth client ID</b> → Web application.</li>
          <li>Under Authorized redirect URIs add: <code className="bg-stone-100 px-1 rounded">{redirectUri}</code></li>
          <li>Copy the Client ID and Client Secret, then ask me to set the <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> secrets (I've already declared them — you just enter the values).</li>
          <li>Click <b>Connect Google Verifier</b> and authorize with the Google account that owns the site.</li>
        </ol>
      </details>
    </div>
  );
}