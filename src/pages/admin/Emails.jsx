import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Mail, Send, TrendingUp, Image as ImageIcon, Loader2, RefreshCw } from "lucide-react";

export default function Emails() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.EmailLog.list("-created_date", 200);
      setLogs(Array.isArray(data) ? data : []);
    } catch (e) {
      setLogs([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const estimates = logs.filter((l) => l.type === "estimate");
  const followups = logs.filter((l) => (l.type || "").startsWith("followup"));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Email & Bid Activity</h1>
          <p className="text-stone-500 mt-1 text-sm">Every estimate bid and follow-up sent from the site.</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-stone-300 text-stone-600 hover:text-stone-900 text-sm font-semibold">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <StatCard icon={Mail} label="Total sent" value={logs.length} />
        <StatCard icon={Send} label="Estimate bids" value={estimates.length} />
        <StatCard icon={TrendingUp} label="Follow-ups" value={followups.length} />
        <StatCard icon={ImageIcon} label="With images" value={logs.length} />
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-200 font-semibold text-stone-900">Recent sends</div>
        {loading ? (
          <div className="p-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-stone-400" /></div>
        ) : logs.length === 0 ? (
          <div className="p-10 text-center text-stone-500 text-sm">No emails sent yet. Send a bid from the estimator to see it here.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Type</th>
                  <th className="text-left px-5 py-3 font-semibold">Recipient</th>
                  <th className="text-left px-5 py-3 font-semibold">Subject</th>
                  <th className="text-left px-5 py-3 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 font-semibold">Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-stone-50">
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${l.type === "estimate" ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-600"}`}>
                        {l.type || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-stone-700">{l.to_email}</td>
                    <td className="px-5 py-3 text-stone-700 max-w-xs truncate">{l.subject}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">{l.status || "sent"}</span>
                    </td>
                    <td className="px-5 py-3 text-stone-500 whitespace-nowrap">{l.created_date ? new Date(l.created_date).toLocaleString() : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5">
      <Icon className="h-5 w-5 text-amber-500" />
      <div className="mt-2 text-2xl font-bold text-stone-900">{value}</div>
      <div className="text-xs text-stone-500">{label}</div>
    </div>
  );
}