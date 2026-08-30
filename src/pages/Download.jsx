import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LOGO_URL, XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";
import AppShell from "@/components/app/AppShell";
import {
  Shield, CreditCard, CheckCircle2, ArrowRight, Lock, Gift
} from "lucide-react";

const EDITIONS = {
  "home-designer": {
    name: "Xtreme AI — Home Designer Edition",
    tagline: "Design, visualize, and estimate your dream floors from your phone.",
  },
  "contractor": {
    name: "Xtreme AI — Contractor Edition",
    tagline: "Leads, bids, pricing, and rewards — your contractor command center.",
  },
};

const TERMS = `15-DAY FREE TRIAL
You are signing up for a 15-day free trial of the Xtreme AI Starter Plan. A valid credit card is required to start your trial, but it will NOT be charged during the 15-day trial period.

AFTER YOUR TRIAL
If you do not cancel before your trial ends, your card will be charged $19.99 per month until you cancel. You may cancel at any time during the trial period and you will not be charged anything.

STARTER TIER
This subscription grants access to our Starter tier, which includes the core app tools and features. Additional tools, features, and tiers may be available as upgrades in the future.

REQUIRED QUESTIONNAIRE
As part of this agreement, you must complete a 10-question questionnaire within 24 hours of downloading the app. If the questionnaire is not completed within 24 hours, your app access will be turned off. You will receive one warning before the deadline.

DATA USAGE
By signing up, you acknowledge that we collect and store your contact information (name, email, phone) and payment method to provide and maintain your account. Your information is used to deliver the service, process payments, and communicate with you about your account.

ELECTRONIC SIGNATURE
By typing your full name below and checking the agreement box, you are signing this agreement electronically. You consent to do business electronically and acknowledge that your electronic signature has the same legal effect as a handwritten signature.

CANCELLATION
You can cancel at any time from within the app or by contacting support. Cancel during the trial and you will not be charged. Cancel after the trial and your access continues until the end of the current billing period.`;

export default function DownloadPage() {
  const [searchParams] = useSearchParams();
  const edition = searchParams.get("edition") === "contractor" ? "contractor" : "home-designer";
  const ed = EDITIONS[edition];

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoResult, setPromoResult] = useState(null);
  const [promoChecking, setPromoChecking] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const applyPromoCode = async () => {
    setPromoResult(null);
    if (!promoCode.trim()) return;
    setPromoChecking(true);
    try {
      const codes = await base44.entities.PromoCode.filter({ code: promoCode.trim().toUpperCase(), active: true });
      const code = codes[0];
      if (!code) {
        setPromoResult({ error: "Invalid code." });
        return;
      }
      if (code.uses >= code.max_uses) {
        setPromoResult({ error: "This code has been fully redeemed." });
        return;
      }
      setPromoResult({ success: code.tool_name ? `Unlocks: ${code.tool_name}` : "Bonus tools unlocked!" });
    } catch (err) {
      setPromoResult({ error: "Could not validate code." });
    } finally {
      setPromoChecking(false);
    }
  };

  const handleCheckout = async () => {
    setError("");
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all contact fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!signature.trim()) {
      setError("Please type your full name as your electronic signature.");
      return;
    }
    if (!agreed) {
      setError("Please check the box to agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const res = await base44.functions.invoke("create-checkout", {
        productId: edition,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      });
      if (res.data?.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      } else {
        setError("Could not start checkout. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Download">
      {/* Edition header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto overflow-hidden">
          <Image src={XTREME_AI_ICON_URL} alt="Xtreme AI Systems" className="w-full h-full" fittingType="fit" />
        </div>
        <p className="text-xs tracking-[0.2em] uppercase font-bold text-amber-600 mt-2">Xtreme AI Systems</p>
        <h1 className="text-2xl font-black text-stone-900 mt-1">{ed.name}</h1>
        <p className="text-sm text-stone-500 mt-1">{ed.tagline}</p>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
          <span className="text-amber-700 font-bold text-sm">$19.99/month</span>
          <span className="text-stone-400 text-xs">·</span>
          <span className="text-stone-600 text-sm">15-day free trial</span>
        </div>
      </div>

      {/* Credit card required banner */}
      <div className="rounded-2xl bg-stone-900 p-4 mb-4 flex items-start gap-3">
        <CreditCard className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-white">Credit card required to start</p>
          <p className="text-xs text-stone-400 mt-0.5">
            You can try the app free for 15 days, but we must retain a card on file.
            <span className="text-amber-400 font-semibold"> No charge during the trial.</span> Cancel
            anytime in the 15 days and you pay nothing. After that, it's $19.99/month.
          </p>
        </div>
      </div>

      {/* Promo code */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="h-5 w-5 text-amber-600" />
          <span className="text-sm font-bold text-stone-900">Have a Promo Code?</span>
        </div>
        <div className="flex gap-2">
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="flex-1 h-11 rounded-xl border border-stone-200 px-3 text-sm uppercase font-bold tracking-wider focus:border-amber-500 outline-none"
          />
          <button
            onClick={applyPromoCode}
            disabled={promoChecking || !promoCode.trim()}
            className="px-5 h-11 rounded-xl bg-stone-900 text-white font-bold text-sm disabled:opacity-50"
          >
            {promoChecking ? "..." : "Apply"}
          </button>
        </div>
        {promoResult?.error && <p className="mt-2 text-xs text-red-600">{promoResult.error}</p>}
        {promoResult?.success && (
          <p className="mt-2 text-xs text-green-700 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> {promoResult.success}
          </p>
        )}
      </div>

      {/* Terms & conditions */}
      <div className="rounded-2xl bg-stone-50 border border-stone-200 p-5 mb-6">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Lock className="h-4 w-4 text-amber-600" /> Terms & Conditions
        </h2>
        <pre className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap font-body max-h-64 overflow-y-auto pr-2">
{TERMS}
        </pre>
      </div>

      {/* Contact info form */}
      <div className="rounded-2xl bg-white border border-stone-200 p-5 mb-6">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-4">Your Contact Information</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-stone-500 font-semibold mb-1 block">First Name</label>
            <input
              value={form.firstName}
              onChange={update("firstName")}
              placeholder="John"
              className="w-full h-11 rounded-lg bg-stone-50 border border-stone-200 px-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-stone-500 font-semibold mb-1 block">Last Name</label>
            <input
              value={form.lastName}
              onChange={update("lastName")}
              placeholder="Doe"
              className="w-full h-11 rounded-lg bg-stone-50 border border-stone-200 px-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-stone-500 font-semibold mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="john@example.com"
              className="w-full h-11 rounded-lg bg-stone-50 border border-stone-200 px-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-stone-500 font-semibold mb-1 block">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="(555) 123-4567"
              className="w-full h-11 rounded-lg bg-stone-50 border border-stone-200 px-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-stone-500 flex items-start gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
          We use this to create your account and send you project updates. Your card details
          are collected securely on the next step — we never see or store them.
        </p>
      </div>

      {/* E-signature */}
      <div className="rounded-2xl bg-white border border-stone-200 p-5 mb-6">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-1">Electronic Signature</h2>
        <p className="text-xs text-stone-500 mb-3">Type your full legal name to sign this agreement.</p>
        <input
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Type your full name"
          className="w-full h-12 rounded-lg bg-stone-50 border border-stone-200 px-3 text-base text-stone-900 placeholder-stone-400 focus:border-amber-500 outline-none italic"
          style={{ fontFamily: "'Georgia', serif" }}
        />
      </div>

      {/* Agreement checkbox */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4 mb-6 flex items-start gap-3">
        <button
          onClick={() => setAgreed(!agreed)}
          className="mt-0.5 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition"
          style={{
            background: agreed ? "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)" : "transparent",
            borderColor: agreed ? "#8B6914" : "#d4d4d8",
          }}
        >
          {agreed && <CheckCircle2 className="h-4 w-4 text-stone-900" />}
        </button>
        <label
          onClick={() => setAgreed(!agreed)}
          className="text-sm text-stone-700 cursor-pointer leading-relaxed"
        >
          I have read and agree to the Terms & Conditions above, and I authorize Xtreme AI
          Systems to charge $19.99/month after my 15-day free trial ends unless I cancel.
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full h-14 rounded-xl flex items-center justify-center gap-2 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed transition"
        style={{
          background: "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)",
          border: "2px solid #000",
          color: "#1a1a1a",
          boxShadow: "0 4px 12px rgba(212,175,55,.4), inset 0 1px rgba(255,255,255,.4)",
        }}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
            Starting checkout...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" /> Enter Card & Start Free Trial <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
        <Lock className="h-3.5 w-3.5" /> Secure checkout powered by Base44 Payments
      </p>
    </AppShell>
  );
}