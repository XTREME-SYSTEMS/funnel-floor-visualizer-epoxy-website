import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import {
  Plus, Trash2, Star, MessageSquare, Gift, Wrench,
  ToggleLeft, ToggleRight, ChevronDown, ChevronUp
} from "lucide-react";

const EDITIONS = [
  { key: "contractor", label: "Contractor Edition" },
  { key: "home-designer", label: "Home Designer Edition" },
];

const ICON_OPTIONS = [
  "Crosshair", "Zap", "Store", "Image", "Bot", "Film",
  "Calculator", "Palette", "TrendingUp", "Award", "Phone",
  "Video", "Trophy", "GraduationCap", "Shirt", "DollarSign",
  "Sparkles", "Home", "Star", "FileText", "MapPin", "Camera",
];

export default function ToolManager() {
  const [tab, setTab] = useState("tools");
  const [tools, setTools] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newTool, setNewTool] = useState({ name: "", description: "", icon: "Zap", edition: "contractor" });
  const [newCode, setNewCode] = useState({ code: "", tool_name: "", max_uses: 1, notes: "" });

  const loadAll = async () => {
    setLoading(true);
    try {
      const [t, p, r, c] = await Promise.all([
        base44.entities.Tool.list(),
        base44.entities.PromoCode.list(),
        base44.entities.Rating.list(),
        base44.entities.Comment.list(),
      ]);
      setTools(t);
      setPromoCodes(p);
      setRatings(r);
      setComments(c);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const addTool = async () => {
    if (!newTool.name.trim()) return;
    try {
      await base44.entities.Tool.create({
        name: newTool.name.trim(),
        description: newTool.description.trim(),
        icon: newTool.icon,
        edition: newTool.edition,
        active: true,
        order: tools.length,
      });
      setNewTool({ name: "", description: "", icon: "Zap", edition: "contractor" });
      setShowAdd(false);
      loadAll();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTool = async (tool) => {
    await base44.entities.Tool.update(tool.id, { active: !tool.active });
    loadAll();
  };

  const deleteTool = async (tool) => {
    if (!confirm(`Remove "${tool.name}"?`)) return;
    await base44.entities.Tool.delete(tool.id);
    loadAll();
  };

  const addCode = async () => {
    if (!newCode.code.trim()) return;
    try {
      await base44.entities.PromoCode.create({
        code: newCode.code.trim().toUpperCase(),
        tool_name: newCode.tool_name.trim(),
        max_uses: Number(newCode.max_uses) || 1,
        uses: 0,
        active: true,
        notes: newCode.notes.trim(),
      });
      setNewCode({ code: "", tool_name: "", max_uses: 1, notes: "" });
      loadAll();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCode = async (code) => {
    if (!confirm(`Delete code "${code.code}"?`)) return;
    await base44.entities.PromoCode.delete(code.id);
    loadAll();
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-1">App & Tool Manager</h1>
      <p className="text-sm text-stone-500 mb-6">Edit each app's tools, manage promo codes, and view user feedback.</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-stone-200">
        {[
          { key: "tools", label: "Tools", icon: Wrench },
          { key: "promo", label: "Promo Codes", icon: Gift },
          { key: "feedback", label: "Feedback", icon: MessageSquare },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
              tab === t.key ? "border-amber-500 text-amber-700" : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* TOOLS TAB */}
      {tab === "tools" && (
        <div>
          {EDITIONS.map((ed) => {
            const edTools = tools.filter((t) => t.edition === ed.key).sort((a, b) => (a.order || 0) - (b.order || 0));
            return (
              <div key={ed.key} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">{ed.label}</h2>
                  <button
                    onClick={() => { setNewTool({ ...newTool, edition: ed.key }); setShowAdd(true); }}
                    className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <Plus className="h-4 w-4" /> Add Tool
                  </button>
                </div>
                <div className="space-y-2">
                  {edTools.length === 0 && <p className="text-sm text-stone-400 py-2">No tools yet.</p>}
                  {edTools.map((tool) => (
                    <div key={tool.id} className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-stone-900 text-sm">{tool.name}</div>
                        <div className="text-xs text-stone-500 truncate">{tool.description || "No description"}</div>
                      </div>
                      <button onClick={() => toggleTool(tool)} className="shrink-0">
                        {tool.active
                          ? <ToggleRight className="h-7 w-7 text-green-600" />
                          : <ToggleLeft className="h-7 w-7 text-stone-300" />}
                      </button>
                      <button onClick={() => deleteTool(tool)} className="shrink-0 text-stone-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Add tool modal */}
          {showAdd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowAdd(false)} />
              <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-5">
                <h3 className="font-bold text-stone-900 mb-4">Add New Tool</h3>
                <div className="space-y-3">
                  <input
                    value={newTool.name}
                    onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                    placeholder="Tool name"
                    className="w-full h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
                  />
                  <textarea
                    value={newTool.description}
                    onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                    placeholder="Description"
                    rows={2}
                    className="w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-amber-500 outline-none resize-none"
                  />
                  <select
                    value={newTool.icon}
                    onChange={(e) => setNewTool({ ...newTool, icon: e.target.value })}
                    className="w-full h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
                  >
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                  <select
                    value={newTool.edition}
                    onChange={(e) => setNewTool({ ...newTool, edition: e.target.value })}
                    className="w-full h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
                  >
                    {EDITIONS.map((ed) => <option key={ed.key} value={ed.key}>{ed.label}</option>)}
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setShowAdd(false)} className="flex-1 h-11 rounded-xl bg-stone-100 text-stone-700 font-semibold text-sm">Cancel</button>
                  <button onClick={addTool} className="flex-1 h-11 rounded-xl bg-stone-900 text-white font-semibold text-sm">Add Tool</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PROMO CODES TAB */}
      {tab === "promo" && (
        <div>
          <div className="bg-white border border-stone-200 rounded-xl p-4 mb-4">
            <h3 className="font-bold text-stone-900 text-sm mb-3">Create Promo Code</h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={newCode.code}
                onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                placeholder="CODE"
                className="h-11 rounded-xl border border-stone-200 px-3 text-sm uppercase font-bold focus:border-amber-500 outline-none"
              />
              <input
                value={newCode.tool_name}
                onChange={(e) => setNewCode({ ...newCode, tool_name: e.target.value })}
                placeholder="Unlocks (tool name)"
                className="h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
              />
              <input
                type="number"
                value={newCode.max_uses}
                onChange={(e) => setNewCode({ ...newCode, max_uses: e.target.value })}
                placeholder="Max uses"
                className="h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
              />
              <input
                value={newCode.notes}
                onChange={(e) => setNewCode({ ...newCode, notes: e.target.value })}
                placeholder="Notes"
                className="h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
              />
            </div>
            <button onClick={addCode} className="mt-3 w-full h-11 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm">Create Code</button>
          </div>

          <div className="space-y-2">
            {promoCodes.length === 0 && <p className="text-sm text-stone-400">No promo codes yet.</p>
            }
            {promoCodes.map((code) => (
              <div key={code.id} className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-3">
                <div className="flex-1">
                  <div className="font-bold text-stone-900 text-sm tracking-wider">{code.code}</div>
                  <div className="text-xs text-stone-500">
                    {code.tool_name ? `Unlocks: ${code.tool_name}` : "General access"} ·
                    {" "}{code.uses || 0}/{code.max_uses} used
                  </div>
                </div>
                <button onClick={() => deleteCode(code)} className="text-stone-400 hover:text-red-500">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEEDBACK TAB */}
      {tab === "feedback" && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-2">Ratings</h3>
            <div className="space-y-2">
              {ratings.length === 0 && <p className="text-sm text-stone-400">No ratings yet.</p>}
              {ratings.map((r) => (
                <div key={r.id} className="bg-white border border-stone-200 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 text-sm">{r.target_name || r.target_id}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`h-4 w-4 ${n <= r.stars ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
                      ))}
                    </div>
                  </div>
                  {r.text && <p className="text-xs text-stone-500 mt-1">{r.text}</p>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-2">Comments</h3>
            <div className="space-y-2">
              {comments.length === 0 && <p className="text-sm text-stone-400">No comments yet.</p>}
              {comments.map((c) => (
                <div key={c.id} className="bg-white border border-stone-200 rounded-xl p-3">
                  <div className="text-xs text-stone-400 mb-1">{c.target_name || c.target_id}</div>
                  <p className="text-sm text-stone-700">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}