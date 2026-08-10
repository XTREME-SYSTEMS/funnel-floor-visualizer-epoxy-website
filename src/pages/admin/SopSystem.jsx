import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import {
  ScrollText, Activity, Sparkles, Loader2, Trash2, CheckCircle2,
  AlertTriangle, Brain, ChevronDown, ChevronRight, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["", "build", "seo", "lead", "email", "integration", "content", "ops"];

export default function SopSystem() {
  const [logs, setLogs] = useState([]);
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState(null);

  const [genCategory, setGenCategory] = useState("");
  const [genTitle, setGenTitle] = useState("");
  const [genBusy, setGenBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [l, s] = await Promise.all([
        base44.entities.SopLog.list(100),
        base44.entities.Sop.list(50),
      ]);
      l.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      s.sort((a, b) => new Date(b.generated_at || b.created_date) - new Date(a.generated_at || a.created_date));
      setLogs(l);
      setSops(s);
    } catch { setLogs([]); setSops([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const generate = async () => {
    setGenBusy(true); setError(""); setMsg("");
    try {
      const res = await base44.functions.invoke("generateSop", { category: genCategory, title: genTitle });
      const d = res.data || res;
      if (d.error) throw new Error(d.error);
      setMsg(`Generated "${d.sop.title}" from ${d.sop.source_log_count} log entries.`);
      setGenTitle("");
      await load();
    } catch (e) { setError(e.message); }
    setGenBusy(false);
  };

  const deleteSop = async (id, title) => {
    if (!confirm(`Delete SOP "${title}"?`)) return;
    try { await base44.entities.Sop.delete(id); await load(); } catch (e) { setError(e.message); }
  };

  const filteredLogs = filter ? logs.filter((l) => l.category === filter) : logs;
  const counts = CATEGORIES.slice(1).map((c) => ({ c, n: logs.filter((l) => l.category === c).length }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Brain className="h-6 w-6 text-amber-500" /> SOP & Memory System
        </h1>
        <p className="text-stone-500 mt-1 text-sm">
          The system logs every step it takes. AI synthesizes those logs into reusable Standard Operating Procedures.
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
        <Stat label="Logged steps" value={logs.length} icon={<Activity className="h-4 w-4 text-stone-400" />} />
        <Stat label="Generated SOPs" value={sops.length} icon={<ScrollText className="h-4 w-4 text-stone-400" />} />
        <Stat label="SEO steps" value={counts.find((x) => x.c === "seo")?.n || 0} />
        <Stat label="Build steps" value={counts.find((x) => x.c === "build")?.n || 0} />
      </div>

      {/* Generate SOP */}
      <div className="rounded-xl border bg-white p-5 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Sparkles className="h-5 w-5 text-amber-500" /> Generate an SOP from memory</h2>
        <p className="text-sm text-stone-500">AI reads the recent log and writes a step-by-step SOP. Optionally focus on one category.</p>
        <div className="grid sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="text-xs font-medium text-stone-500">Category (optional)</label>
            <select value={genCategory} onChange={(e) => setGenCategory(e.target.value)} className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c || "All categories"}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500">Title (optional)</label>
            <input value={genTitle} onChange={(e) => setGenTitle(e.target.value)} placeholder="e.g. SEO Operations SOP" className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <Button onClick={generate} disabled={genBusy}>
            {genBusy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />} Generate SOP
          </Button>
        </div>
      </div>

      {/* Generated SOPs */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold flex items-center gap-2"><ScrollText className="h-5 w-5 text-amber-500" /> Generated SOPs ({sops.length})</h2>
          <Button variant="ghost" size="sm" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
        </div>
        {sops.length === 0 ? (
          <p className="text-sm text-stone-500">No SOPs yet. Click "Generate SOP" to synthesize one from the log.</p>
        ) : (
          <div className="space-y-3">
            {sops.map((s) => (
              <div key={s.id} className="rounded-lg border border-stone-200">
                <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="w-full flex items-center gap-2 p-4 text-left">
                  {expanded === s.id ? <ChevronDown className="h-4 w-4 text-stone-400" /> : <ChevronRight className="h-4 w-4 text-stone-400" />}
                  <span className="font-semibold text-stone-900 flex-1">{s.title}</span>
                  <span className="text-xs text-stone-400">{s.category}</span>
                  <span className="text-xs text-stone-400">{(s.steps || []).length} steps</span>
                  <button onClick={(e) => { e.stopPropagation(); deleteSop(s.id, s.title); }} className="text-red-500 hover:text-red-700 ml-2"><Trash2 className="h-4 w-4" /></button>
                </button>
                {expanded === s.id && (
                  <div className="px-4 pb-4 border-t border-stone-100 pt-3">
                    <p className="text-sm text-stone-600 mb-3">{s.summary}</p>
                    <ol className="space-y-2">
                      {(s.steps || []).map((st, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                          <div>
                            <div className="font-medium text-stone-900">{st.step}</div>
                            <div className="text-stone-500">{st.detail}</div>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 text-xs text-stone-400">Synthesized from {s.source_log_count} log entries · {new Date(s.generated_at).toLocaleString()}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity log */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="font-semibold flex items-center gap-2"><Activity className="h-5 w-5 text-amber-500" /> Activity log ({filteredLogs.length})</h2>
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-2.5 py-1 rounded-md text-xs font-medium ${filter === c ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                {c || "all"}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-stone-400" /></div>
        ) : filteredLogs.length === 0 ? (
          <p className="text-sm text-stone-500">No log entries yet.</p>
        ) : (
          <div className="overflow-x-auto max-h-[28rem] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-stone-500 border-b sticky top-0 bg-white">
                <tr>
                  <th className="py-2 pr-4">When</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Action</th>
                  <th className="py-2 pr-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((l) => (
                  <tr key={l.id} className="border-b last:border-0">
                    <td className="py-2 pr-4 text-xs text-stone-400 whitespace-nowrap">{new Date(l.created_date).toLocaleString()}</td>
                    <td className="py-2 pr-4"><span className="inline-block px-2 py-0.5 rounded text-xs bg-stone-100 text-stone-600">{l.category}</span></td>
                    <td className="py-2 pr-4">
                      <div className="font-medium text-stone-800">{l.action}</div>
                      {l.detail && <div className="text-xs text-stone-500">{l.detail}</div>}
                    </td>
                    <td className="py-2 pr-4 text-xs text-stone-400 font-mono">{l.source || "—"}</td>
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

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="text-xs text-stone-500 flex items-center gap-1">{icon} {label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}