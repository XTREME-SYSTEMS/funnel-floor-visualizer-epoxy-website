import React, { useState } from "react";
import { Star, X, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

/**
 * Popup that asks free-tier users for a 1–500 character rating.
 * Props:
 *   open: boolean
 *   onClose: () => void
 *   targetType: "tool" | "app"
 *   targetId: string
 *   targetName: string
 */
export default function RatingPopup({ open, onClose, targetType, targetId, targetName }) {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (text.trim().length < 1 || text.trim().length > 500) return;
    setSubmitting(true);
    try {
      await base44.entities.Rating.create({
        target_type: targetType,
        target_id: targetId,
        target_name: targetName,
        stars: stars || 5,
        text: text.trim(),
      });
      setDone(true);
    } catch (err) {
      console.error("Rating submit error", err);
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    setDone(false);
    setStars(0);
    setText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            <span className="font-bold text-stone-900 text-sm">Quick Rating</span>
          </div>
          <button onClick={close} className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-400 hover:bg-stone-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-8 w-8 text-amber-600" />
            </div>
            <p className="font-bold text-stone-900">Thank you!</p>
            <p className="text-sm text-stone-500 mt-1">Your feedback helps us improve.</p>
            <button onClick={close} className="mt-5 w-full h-11 rounded-xl bg-stone-900 text-white font-semibold text-sm">
              Continue
            </button>
          </div>
        ) : (
          <div className="p-5">
            <p className="text-sm text-stone-600 mb-1">
              You're using <span className="font-bold text-stone-900">{targetName}</span> for free.
            </p>
            <p className="text-xs text-stone-500 mb-4">
              In exchange, please share a quick rating (1–500 characters). It only takes a moment.
            </p>

            {/* 5-star selector */}
            <div className="flex gap-1.5 mb-4 justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setStars(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 transition ${(hover || stars) >= n ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
                  />
                </button>
              ))}
            </div>

            {/* Text rating */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 500))}
              placeholder="Share your experience (1–500 characters)..."
              rows={4}
              className="w-full rounded-xl border border-stone-200 p-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none resize-none"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-stone-400">{text.length}/500</span>
              {text.trim().length < 1 && (
                <span className="text-xs text-red-400">Required</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || text.trim().length < 1}
              className="mt-4 w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-50"
              style={{
                background: "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)",
                border: "2px solid #000",
                color: "#1a1a1a",
                boxShadow: "0 4px 12px rgba(212,175,55,.4), inset 0 1px rgba(255,255,255,.4)",
              }}
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Submit Rating</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}