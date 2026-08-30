import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AppShell from "@/components/app/AppShell";
import { CheckCircle2, AlertCircle, Clock, FileText } from "lucide-react";

const QUESTIONS = [
  "How would you rate the app's overall functionality?",
  "How useful is the app for your daily routine?",
  "Does the app fit well into your day-to-day work or living?",
  "What tools would you add to the app?",
  "Do you have any special requests or features you'd like to see?",
  "How easy was the app to navigate and use?",
  "Did the app help you save time on your projects?",
  "Would you recommend this app to other contractors or homeowners?",
  "What was your favorite feature of the app?",
  "What needs the most improvement?",
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(QUESTIONS.map(() => ""));
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    base44.auth.me()
      .then((u) => { setUser(u); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const downloadedAt = user?.downloaded_at ? new Date(user.downloaded_at) : null;
  const hoursLeft = downloadedAt
    ? Math.max(0, 24 - (Date.now() - downloadedAt.getTime()) / (1000 * 60 * 60))
    : null;
  const alreadyCompleted = user?.questionnaire_completed;

  const updateAnswer = (i, val) => {
    const next = [...answers];
    next[i] = val.slice(0, 500);
    setAnswers(next);
  };

  const handleSubmit = async () => {
    setError("");
    const incomplete = answers.filter((a) => !a.trim());
    if (incomplete.length > 0) {
      setError(`Please answer all questions (${incomplete.length} remaining).`);
      return;
    }
    if (comment.length > 500) {
      setError("Comment must be 500 characters or less.");
      return;
    }

    setSubmitting(true);
    try {
      await base44.entities.QuestionnaireResponse.create({
        answers: QUESTIONS.map((q, i) => ({ question: q, answer: answers[i] })),
        comment: comment.slice(0, 500),
        completed: true,
        completed_at: new Date().toISOString(),
      });
      if (user) {
        await base44.auth.updateMe({ questionnaire_completed: true });
      }
      navigate("/elite");
    } catch (err) {
      setError("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AppShell title="Questionnaire">
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Questionnaire">
      {/* Deadline banner */}
      {alreadyCompleted ? (
        <div className="rounded-2xl bg-green-50 border border-green-200 p-4 mb-6 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-green-800 text-sm">Questionnaire completed</p>
            <p className="text-xs text-green-600 mt-0.5">Thank you — your access is secure.</p>
          </div>
        </div>
      ) : hoursLeft !== null && hoursLeft <= 24 ? (
        <div className={`rounded-2xl border p-4 mb-6 flex items-start gap-3 ${hoursLeft < 4 ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
          <Clock className={`h-5 w-5 shrink-0 mt-0.5 ${hoursLeft < 4 ? "text-red-600" : "text-amber-600"}`} />
          <div>
            <p className={`font-bold text-sm ${hoursLeft < 4 ? "text-red-800" : "text-amber-800"}`}>
              {hoursLeft < 1 ? "Less than 1 hour left" : `${Math.floor(hoursLeft)} hours left`}
            </p>
            <p className="text-xs text-stone-600 mt-0.5">
              You agreed to complete this questionnaire within 24 hours of downloading.
              If not completed, your app access will be turned off.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 mb-6 flex items-start gap-3">
          <FileText className="h-5 w-5 text-stone-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-stone-900 text-sm">Required Questionnaire</p>
            <p className="text-xs text-stone-600 mt-0.5">
              As part of your free trial agreement, please complete this 10-question
              questionnaire within 24 hours of downloading the app.
            </p>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-5">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="rounded-2xl bg-white border border-stone-200 p-4">
            <label className="text-sm font-bold text-stone-900 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <span>{q}</span>
            </label>
            <textarea
              value={answers[i]}
              onChange={(e) => updateAnswer(i, e.target.value)}
              placeholder="Your answer..."
              rows={2}
              disabled={alreadyCompleted}
              className="mt-3 w-full rounded-xl border border-stone-200 p-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none resize-none disabled:bg-stone-50"
            />
            <div className="text-right text-xs text-stone-400 mt-1">{answers[i].length}/500</div>
          </div>
        ))}

        {/* Comment section */}
        <div className="rounded-2xl bg-white border border-stone-200 p-4">
          <label className="text-sm font-bold text-stone-900">Additional Comments</label>
          <p className="text-xs text-stone-500 mt-0.5">Anything else you'd like to share? (up to 500 characters)</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 500))}
            placeholder="Share your thoughts..."
            rows={3}
            disabled={alreadyCompleted}
            className="mt-3 w-full rounded-xl border border-stone-200 p-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none resize-none disabled:bg-stone-50"
          />
          <div className="text-right text-xs text-stone-400 mt-1">{comment.length}/500</div>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
        </div>
      )}

      {!alreadyCompleted && (
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 w-full h-13 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-50"
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
            <>Submit Questionnaire</>
          )}
        </button>
      )}
    </AppShell>
  );
}