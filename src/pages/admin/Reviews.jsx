import React, { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import {
  Star, Send, Loader2, CheckCircle2, Clock, RefreshCw, AlertTriangle, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reviews() {
  const [wonLeads, setWonLeads] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [leads, logs, settingsRows] = await Promise.all([
        base44.entities.Lead.filter({ status: "WON" }, "-updated_date", 200),
        base44.entities.EmailLog.list(500),
        base44.entities.AppSettings.list(1),
      ]);
      setWonLeads(leads);
      setEmailLogs(logs);
      setSettings(settingsRows[0] || null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Build a map of lead_id → review emails sent
  const reviewEmailsByLead = {};
  for (const log of emailLogs) {
    if (log.type && log.type.startsWith("review_request") && log.lead_id) {
      if (!reviewEmailsByLead[log.lead_id]) reviewEmailsByLead[log.lead_id] = [];
      reviewEmailsByLead[log.lead_id].push(log);
    }
  }

  const sendManual = async (leadId, stage = "initial") => {
    setSending(leadId + stage);
    setError(""); setMsg("");
    try {
      const res = await base44.functions.invoke("sendReviewRequest", { lead_id: leadId, stage });
      const d = res.data || res;
      if (d.error) throw new Error(d.error);
      setMsg(`Review request sent to ${d.to}`);
      await loadData();
    } catch (e) {
      setError(e.message);
    }
    setSending(null);
  };

  const reviewUrl = settings?.seo?.review_url || "";
  const totalSent = Object.keys(reviewEmailsByLead).length;
  const coverage = wonLeads.length > 0 ? Math.round((totalSent / wonLeads.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-500" /> Review Requests
        </h1>
        <p className="text-stone-500 mt-1 text-sm">
          Automatically request Google reviews from won customers. The workflow fires 3 days after a lead is marked WON, with a 5-day follow-up reminder.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {msg && !error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" /> {msg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Won jobs" value={wonLeads.length} icon={CheckCircle2} />
        <Stat label="Review requests sent" value={totalSent} icon={Mail} />
        <Stat label="Coverage rate" value={`${coverage}%`} icon={Star} />
        <Stat label="Review URL set" value={reviewUrl ? "Yes" : "No"} icon={AlertTriangle} />
      </div>

      {!reviewUrl && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 text-amber-800 text-sm">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
          No Google review URL set in Settings → SEO. Add your Google Business Profile review link so emails point customers to the right place.
        </div>
      )}

      {/* Won leads table */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Won customers ({wonLeads.length})</h2>
          <Button variant="ghost" size="sm" onClick={loadData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-stone-400" /></div>
        ) : wonLeads.length === 0 ? (
          <p className="text-sm text-stone-500 py-6 text-center">No won leads yet. When you mark a lead as WON in the pipeline, they'll appear here and automatically receive a review request after 3 days.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-stone-500 border-b">
                <tr>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Contact</th>
                  <th className="py-2 pr-4">Won date</th>
                  <th className="py-2 pr-4">Review status</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wonLeads.map((lead) => {
                  const logs = reviewEmailsByLead[lead.id] || [];
                  const hasInitial = logs.some((l) => l.type === "review_request");
                  const hasFollowup = logs.some((l) => l.type === "review_request:followup");
                  const lastSent = logs.length > 0
                    ? new Date(Math.max(...logs.map((l) => new Date(l.created_date).getTime()))).toLocaleDateString()
                    : null;

                  return (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-stone-50">
                      <td className="py-3 pr-4">
                        <div className="font-medium text-stone-800">{lead.first_name} {lead.last_name || ""}</div>
                        <div className="text-xs text-stone-400">{lead.city || lead.address || ""}</div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="text-xs text-stone-600">{lead.email}</div>
                        <div className="text-xs text-stone-400">{lead.phone}</div>
                      </td>
                      <td className="py-3 pr-4 text-xs text-stone-500">
                        {new Date(lead.updated_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 pr-4">
                        {logs.length === 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs text-stone-400">
                            <Clock className="h-3.5 w-3.5" /> Pending
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <span className={`inline-flex items-center gap-1 text-xs ${hasFollowup ? "text-emerald-600" : "text-amber-600"}`}>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {hasFollowup ? "Initial + follow-up sent" : "Initial sent"}
                            </span>
                            {lastSent && <div className="text-xs text-stone-400">Last: {lastSent}</div>}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendManual(lead.id, "initial")}
                          disabled={sending === lead.id + "initial"}
                        >
                          {sending === lead.id + "initial" ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Send className="h-3.5 w-3.5 mr-1" />}
                          {hasInitial ? "Resend" : "Send"}
                        </Button>
                        {hasInitial && !hasFollowup && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => sendManual(lead.id, "followup")}
                            disabled={sending === lead.id + "followup"}
                            className="ml-1"
                          >
                            {sending === lead.id + "followup" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-stone-400">
        Tip: Add your Google Business Profile review link in Settings → SEO → Review URL. The automation handles the rest — each won customer gets a branded email 3 days after closing, with a 5-day follow-up if they haven't reviewed yet.
      </p>
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}