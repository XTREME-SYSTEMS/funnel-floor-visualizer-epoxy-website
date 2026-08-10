import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, AlertTriangle, Loader2, ExternalLink, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Guided Google Search Console setup — lives inside the dashboard so the
// whole verification + connection flow runs from within the app.
export default function GoogleSetupWizard({ onVerified }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const check = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("checkGoogleStatus", {});
      const d = res.data || res;
      setStatus(d);
      if (d.propertyFound && onVerified) onVerified();
    } catch (e) {
      setStatus({ error: e.message });
    }
    setLoading(false);
  };

  const [adding, setAdding] = useState(false);
  const addProperty = async () => {
    setAdding(true); setMsg("");
    try {
      const res = await base44.functions.invoke("addSearchConsoleProperty", {});
      const d = res.data || res;
      if (d.ok) { setMsg("Added! Your site is now in Search Console (unverified). Continue to step 2 to verify."); check(); }
      else setMsg("Could not add: " + JSON.stringify(d.data || d.error));
    } catch (e) { setMsg("Error: " + e.message); }
    setAdding(false);
  };

  useEffect(() => { check(); }, []);

  const saveTag = async () => {
    setSaving(true); setMsg("");
    try {
      const contentMatch = tag.match(/content=["']([^"']+)["']/);
      const content = contentMatch ? contentMatch[1] : tag.trim();
      if (!content) { setMsg("Paste the full meta tag Google gave you."); setSaving(false); return; }
      const list = await base44.entities.AppSettings.list(1);
      const s = list[0];
      if (s?.id) {
        await base44.entities.AppSettings.update(s.id, { google_site_verification: content });
      } else {
        await base44.entities.AppSettings.create({ google_site_verification: content });
      }
      setMsg("Saved — the verification tag is now live on your site. Go back to Search Console and click Verify, then come back and hit Re-check.");
    } catch (e) { setMsg("Error: " + e.message); }
    setSaving(false);
  };

  const verified = status?.propertyFound;

  return (
    <div className="rounded-xl border bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2"><Globe className="h-5 w-5 text-blue-600" /> Google Search Console setup</h2>
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin text-stone-400" />
        ) : verified ? (
          <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium"><CheckCircle2 className="h-4 w-4" /> Connected & verified</span>
        ) : (
          <span className="flex items-center gap-1.5 text-amber-600 text-sm font-medium"><AlertTriangle className="h-4 w-4" /> Not verified yet</span>
        )}
      </div>

      {status?.error && (
        <div className="text-sm text-red-600 flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5" /> {status.error}</div>
      )}

      <ol className="space-y-3 text-sm">
        <Step n={1} done={status?.propertyFound}>
          {status?.propertyFound
            ? <>Your site is added to Search Console.</>
            : <div className="space-y-2">
              <div>Add your site to Search Console automatically — no need to open the console:</div>
              <Button size="sm" onClick={addProperty} disabled={adding}>
                {adding ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Globe className="h-4 w-4 mr-1" />}
                Auto-add my site to Google
              </Button>
            </div>}
        </Step>
        <Step n={2} done={false}>
          Choose <b>HTML tag</b> verification. Copy the full <code className="bg-stone-100 px-1 rounded">&lt;meta name="google-site-verification" ...&gt;</code> tag and paste it below.
        </Step>
        <li>
          <Textarea
            placeholder='<meta name="google-site-verification" content="..." />'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="font-mono text-xs"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={saveTag} disabled={saving || !tag}>
              {saving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
              Save & make live
            </Button>
          </div>
        </li>
        <Step n={3} done={verified}>
          Back in Search Console, click <b>Verify</b>. Then click <b>Re-check status</b> below.
        </Step>
        <Step n={4} done={verified}>
          Once verified, click <b>Pull Google data</b> above to load your rankings, queries, and index status. The sitemap auto-submits on first pull.
        </Step>
      </ol>

      {msg && <div className="text-sm text-stone-600 bg-stone-50 rounded-lg p-3">{msg}</div>}

      <Button variant="outline" size="sm" onClick={check} disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <ArrowRight className="h-4 w-4 mr-1" />}
        Re-check status
      </Button>
    </div>
  );
}

function Step({ n, done, children }) {
  return (
    <li className="flex gap-3">
      <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : n}
      </span>
      <div className="pt-0.5">{children}</div>
    </li>
  );
}