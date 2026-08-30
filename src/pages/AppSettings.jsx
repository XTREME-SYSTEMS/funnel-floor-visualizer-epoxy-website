import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AppShell from "@/components/app/AppShell";
import { Star, Gift, CheckCircle2 } from "lucide-react";

export default function AppSettings() {
  const [tools, setTools] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    base44.entities.Tool.filter({ active: true })
      .then(setTools)
      .catch(() => {});
    base44.entities.Rating.list()
      .then(setRatings)
      .catch(() => {});
  }, []);

  const userRating = (targetId) => ratings.find((r) => r.target_id === targetId);

  const rateApp = async (stars) => {
    try {
      const existing = userRating("app");
      if (existing) {
        await base44.entities.Rating.update(existing.id, { stars });
      } else {
        await base44.entities.Rating.create({
          target_type: "app",
          target_id: "app",
          target_name: "Xtreme AI",
          stars,
        });
      }
      setRatings([...ratings.filter((r) => r.target_id !== "app"), { id: existing?.id, target_id: "app", stars }]);
    } catch (err) {
      console.error(err);
    }
  };

  const rateTool = async (tool, stars) => {
    try {
      const existing = ratings.find((r) => r.target_id === tool.id);
      if (existing) {
        await base44.entities.Rating.update(existing.id, { stars });
      } else {
        await base44.entities.Rating.create({
          target_type: "tool",
          target_id: tool.id,
          target_name: tool.name,
          stars,
        });
      }
      setRatings([...ratings.filter((r) => r.target_id !== tool.id), { id: existing?.id, target_id: tool.id, stars }]);
    } catch (err) {
      console.error(err);
    }
  };

  const redeemCode = async () => {
    setPromoMsg("");
    setSubmitting(true);
    try {
      const codes = await base44.entities.PromoCode.filter({ code: promoCode.trim().toUpperCase(), active: true });
      const code = codes[0];
      if (!code) {
        setPromoMsg("Invalid code.");
        return;
      }
      if (code.uses >= code.max_uses) {
        setPromoMsg("This code has been fully redeemed.");
        return;
      }
      await base44.entities.PromoCode.update(code.id, { uses: code.uses + 1 });
      setPromoMsg(`Success! You unlocked: ${code.tool_name || "bonus tools"}.`);
      setPromoCode("");
    } catch (err) {
      setPromoMsg("Could not redeem code.");
    } finally {
      setSubmitting(false);
    }
  };

  const appStars = userRating("app")?.stars || 0;

  return (
    <AppShell title="Settings">
      {/* Rate the app */}
      <div className="rounded-2xl bg-white border border-stone-200 p-5 mb-4">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3">Rate the App</h2>
        <div className="flex gap-2 justify-center py-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => rateApp(n)}>
              <Star className={`h-9 w-9 transition ${n <= appStars ? "fill-amber-400 text-amber-400" : "text-stone-300"}`} />
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-stone-500 mt-1">
          {appStars > 0 ? `You rated ${appStars} star${appStars > 1 ? "s" : ""}` : "Tap to rate"}
        </p>
      </div>

      {/* Rate individual tools */}
      <div className="rounded-2xl bg-white border border-stone-200 p-5 mb-4">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3">Rate Tools</h2>
        <div className="space-y-3">
          {tools.length === 0 && <p className="text-sm text-stone-400">No tools yet.</p>}
          {tools.map((tool) => {
            const r = userRating(tool.id);
            const stars = r?.stars || 0;
            return (
              <div key={tool.id} className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-700">{tool.name}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => rateTool(tool, n)}>
                      <Star className={`h-5 w-5 ${n <= stars ? "fill-amber-400 text-amber-400" : "text-stone-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redeem promo code */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="h-5 w-5 text-amber-600" />
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">Redeem Promo Code</h2>
        </div>
        <div className="flex gap-2">
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 h-11 rounded-xl border border-stone-200 px-3 text-sm uppercase font-bold tracking-wider focus:border-amber-500 outline-none"
          />
          <button
            onClick={redeemCode}
            disabled={submitting || !promoCode.trim()}
            className="px-5 h-11 rounded-xl bg-stone-900 text-white font-bold text-sm disabled:opacity-50"
          >
            Redeem
          </button>
        </div>
        {promoMsg && (
          <div className="mt-2 flex items-center gap-1.5 text-sm">
            {promoMsg.startsWith("Success") ? (
              <><CheckCircle2 className="h-4 w-4 text-green-600" /><span className="text-green-700">{promoMsg}</span></>
            ) : (
              <span className="text-red-600">{promoMsg}</span>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}