import React, { useState, useEffect } from "react";
import {
  Gift, Share2, Copy, Check, Users, Trophy, Sparkles,
  Mail, MessageSquare, Link as LinkIcon, ArrowRight, Star,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";

const REWARD_TIERS = [
  { count: 1, label: "Bronze", perk: "XPS branded t-shirt" },
  { count: 3, label: "Silver", perk: "XPS swag kit + sticker pack" },
  { count: 5, label: "GOLD", perk: "Custom cleaning kit + 1 year of special solution" },
];

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function CareReferral() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        const refs = await base44.entities.Referral.filter({ referrer_email: me.email });
        setReferrals(refs);
      } catch (err) {
        console.error("Referral load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const completed = referrals.filter((r) => r.status === "completed").length;
  const booked = referrals.filter((r) => r.status === "booked").length;
  const invited = referrals.filter((r) => r.status === "invited").length;

  const handleInvite = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter a name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const me = await base44.auth.me();
      const ref = await base44.entities.Referral.create({
        referrer_email: me.email,
        referrer_name: me.full_name,
        referred_name: form.name.trim(),
        referred_email: form.email.trim(),
        referred_phone: form.phone.trim(),
        status: "invited",
      });
      setReferrals((prev) => [...prev, ref]);
      setShowForm(false);
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      setError("Could not send invite. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/elite?ref=${user?.email || ""}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-3 space-y-4">
      {/* Hero */}
      <div className="text-center pt-2">
        <div className="w-16 h-16 mx-auto overflow-hidden">
          <Image src={XTREME_AI_ICON_URL} alt="XPS" className="w-full h-full" fittingType="fit" />
        </div>
        <h1 className="text-lg font-black text-stone-900 mt-1">Refer & Earn</h1>
        <p className="text-xs text-stone-500">Share the love, earn rewards</p>
      </div>

      {/* Reward highlight */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{ background: "linear-gradient(135deg, #FFF6D5, #F0DB8A)" }}
      >
        <Trophy className="h-10 w-10 text-amber-700 mx-auto mb-2" />
        <h2 className="text-base font-black text-amber-800">Refer 5, Get a Year of Clean</h2>
        <p className="text-xs text-amber-900 mt-1">
          Refer 5 friends who book with us and unlock a custom cleaning kit
          with 1 year of special solution — a $500+ value!
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-stone-900">Your Progress</span>
          <span className="text-lg font-black text-amber-600">{completed}/5</span>
        </div>
        <div className="h-3 rounded-full bg-stone-100 overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${(completed / 5) * 100}%`, background: GOLD_GRADIENT }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-black text-stone-400">{invited}</div>
            <div className="text-[9px] text-stone-500 uppercase font-bold">Invited</div>
          </div>
          <div>
            <div className="text-lg font-black text-amber-500">{booked}</div>
            <div className="text-[9px] text-stone-500 uppercase font-bold">Booked</div>
          </div>
          <div>
            <div className="text-lg font-black text-green-600">{completed}</div>
            <div className="text-[9px] text-stone-500 uppercase font-bold">Completed</div>
          </div>
        </div>
      </div>

      {/* Reward tiers */}
      <div>
        <h2 className="text-sm font-bold text-stone-900 mb-2">Reward Tiers</h2>
        <div className="space-y-2">
          {REWARD_TIERS.map((tier) => {
            const unlocked = completed >= tier.count;
            return (
              <div
                key={tier.count}
                className="rounded-xl p-3 flex items-center gap-3"
                style={
                  unlocked
                    ? { background: "linear-gradient(135deg, #FFF6D5, #F0DB8A)", border: "2px solid #D4AF37" }
                    : { background: "white", border: "1px solid #e5e5e5" }
                }
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={
                    unlocked
                      ? { background: GOLD_GRADIENT, border: "1.5px solid #000" }
                      : { background: "#f5f5f5", border: "1px solid #e5e5e5" }
                  }
                >
                  {unlocked ? (
                    <Check className="h-5 w-5 text-stone-900" />
                  ) : (
                    <span className="text-xs font-bold text-stone-400">{tier.count}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black text-stone-900">{tier.label}</div>
                  <div className="text-xs text-stone-600">{tier.perk}</div>
                </div>
                {tier.count === 5 && (
                  <Star className="h-5 w-5 text-amber-500" fill="#D4AF37" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Invite actions */}
      <div className="space-y-2">
        <button
          onClick={() => setShowForm(true)}
          className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold"
          style={{ background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }}
        >
          <Users className="h-5 w-5" /> Invite a Friend
        </button>
        <button
          onClick={copyLink}
          className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold border border-stone-200 bg-white text-stone-700"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
          {copied ? "Link Copied!" : "Copy Referral Link"}
        </button>
      </div>

      {/* Referral list */}
      {referrals.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-stone-900 mb-2">Your Referrals</h2>
          <div className="space-y-2">
            {referrals.map((ref) => (
              <div key={ref.id} className="rounded-xl bg-white border border-stone-200 p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-stone-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-stone-900">{ref.referred_name}</div>
                  <div className="text-[10px] text-stone-500">{ref.referred_email}</div>
                </div>
                <span
                  className="text-[9px] font-bold px-2 py-1 rounded-full"
                  style={{
                    background:
                      ref.status === "completed" ? "#dcfce7" :
                      ref.status === "booked" ? "#fef3c7" : "#f5f5f5",
                    color:
                      ref.status === "completed" ? "#166534" :
                      ref.status === "booked" ? "#92400e" : "#71717a",
                  }}
                >
                  {ref.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full max-w-[450px] bg-white rounded-t-2xl p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-stone-900">Invite a Friend</h3>
              <button onClick={() => setShowForm(false)} className="text-stone-400 text-sm">
                Cancel
              </button>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Friend's Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Smith"
                className="w-full h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 mb-1 block">Phone (optional)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="w-full h-11 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              onClick={handleInvite}
              disabled={submitting}
              className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-50"
              style={{ background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }}
            >
              {submitting ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}