import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useSettings } from "@/lib/useSettings";
import { calcSquareFootage, calcEstimate, calcLeadScore, money } from "@/lib/pricing";
import { trackEvent, getDeviceType } from "@/lib/tracking";
import { captureAttribution } from "@/lib/estimatorStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Phone, Clock, ShieldCheck } from "lucide-react";
import ScrapeProgress from "@/components/funnel/ScrapeProgress";
import FlakeColorChart from "@/components/funnel/FlakeColorChart";
import BeforeAfter from "@/components/funnel/BeforeAfter";

const BEFORE_URL = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/2fa2f386d_generated_image.png";
const AFTER_URL = "https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/b2326e50a_generated_image.png";

const SIZES = [
  { key: "one_car", label: "1-Car Garage", desc: "~240 sq ft" },
  { key: "two_car", label: "2-Car Garage", desc: "~440 sq ft" },
  { key: "three_car", label: "3-Car Garage", desc: "~660 sq ft" },
  { key: "four_car", label: "4+ Car Garage", desc: "~880 sq ft" },
  { key: "not_sure", label: "I'm Not Sure", desc: "We'll detect it for you" }
];

const CONDITIONS = [
  { key: "good", label: "Clean / bare concrete", desc: "No major issues" },
  { key: "minor", label: "Minor cracks or stains", desc: "A few spots" },
  { key: "several", label: "Several cracks", desc: "Needs repairs" },
  { key: "paint", label: "Painted concrete", desc: "Existing paint" },
  { key: "epoxy", label: "Existing coating", desc: "Needs removal" },
  { key: "major", label: "Major damage / not sure", desc: "We'll assess it" }
];

const STEP_EVENTS = ["funnel_started", "address_entered", "size_selected", "condition_selected", "contact_entered"];

export default function Funnel() {
  const navigate = useNavigate();
  const { settings, isLoading } = useSettings();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ floor_condition: [], photos: [] });
  const [leadId, setLeadId] = useState(null);
  const [detectedSqft, setDetectedSqft] = useState(null);
  const [selectedFlake, setSelectedFlake] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { trackEvent("funnel_started"); }, []);

  const update = (patch) => setData({ ...data, ...patch });
  const next = () => {
    trackEvent(STEP_EVENTS[step] || "funnel_step", { step });
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };
  const back = () => { if (step > 0) { setStep((s) => s - 1); window.scrollTo(0, 0); } };

  const toggleCondition = (key) => {
    const arr = data.floor_condition || [];
    update({ floor_condition: arr.includes(key) ? arr.filter((k) => k !== key) : [...arr, key] });
  };

  const submitContact = async () => {
    setSubmitting(true);
    const sqft = calcSquareFootage(settings, data);
    const est = calcEstimate(settings, { ...data, square_footage: sqft });
    const score = calcLeadScore(settings, data);
    const lead = await base44.entities.Lead.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      garage_size: data.garage_size,
      square_footage: sqft,
      floor_condition: data.floor_condition,
      timeline: data.timeline || "AS SOON AS POSSIBLE",
      desired_system: "flake",
      estimate_mid: est.mid,
      estimate_low: est.low,
      estimate_high: est.high,
      package_options: est.packages,
      lead_score: score,
      assigned_salesperson: settings.salesperson?.name || "",
      status: "NEW ESTIMATE",
      device: getDeviceType(),
      ...captureAttribution()
    });
    setLeadId(lead.id);
    await trackEvent("lead_created", { lead_id: lead.id });
    setSubmitting(false);
    next();
  };

  const onScrapeComplete = () => {
    const sqft = calcSquareFootage(settings, data);
    setDetectedSqft(sqft);
    trackEvent("scrape_complete", { lead_id: leadId, sqft });
    next();
  };

  const saveFlake = async (code) => {
    setSelectedFlake(code);
    if (leadId) {
      await base44.entities.Lead.update(leadId, { notes: `Selected flake color: ${code}` });
      trackEvent("flake_selected", { lead_id: leadId, flake: code });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" /></div>;
  }

  // Scrape animation step
  if (step === 5) {
    return <ScrapeProgress address={`${data.address}, ${data.city}, ${data.state} ${data.zip}`} onComplete={onScrapeComplete} />;
  }

  const totalSteps = 5;
  const progressPct = step <= 4 ? (step / totalSteps) * 100 : 100;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="bg-stone-950 text-white">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-semibold tracking-tight text-sm">{settings.company_name}</button>
          {step > 0 && step <= 4 && (
            <button onClick={back} className="flex items-center gap-1 text-sm text-stone-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}
        </div>
      </header>

      {/* Progress bar */}
      {step <= 4 && (
        <div className="h-1 bg-stone-200">
          <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">

          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 mb-6">
                <ShieldCheck className="h-8 w-8 text-amber-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">
                Get Your Garage Floor Estimate
              </h1>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Answer a few quick questions and we'll look up your garage's square footage from public property records — then show you exactly what your new epoxy floor could look like.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-stone-500">
                <span className="flex items-center justify-center gap-2"><Clock className="h-4 w-4 text-amber-500" /> Takes about 60 seconds</span>
                <span className="flex items-center justify-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-500" /> No obligation</span>
              </div>
              <Button onClick={next} className="mt-8 h-14 px-10 text-base font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 w-full sm:w-auto">
                START MY ESTIMATE <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 1: Address */}
          {step === 1 && (
            <div>
              <StepHeader n="1" title="What's your property address?" sub="We'll use public records to find your garage's square footage." />
              <div className="space-y-3 mt-6">
                <Input placeholder="Street address" value={data.address || ""} onChange={(e) => update({ address: e.target.value })} className="h-12" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="City" value={data.city || ""} onChange={(e) => update({ city: e.target.value })} className="h-12" />
                  <Input placeholder="State" value={data.state || ""} onChange={(e) => update({ state: e.target.value })} className="h-12" />
                </div>
                <Input placeholder="ZIP code" value={data.zip || ""} onChange={(e) => update({ zip: e.target.value })} className="h-12" />
              </div>
              <Button
                onClick={next}
                disabled={!data.address || !data.city || !data.state || !data.zip}
                className="mt-6 h-14 w-full text-base font-bold bg-stone-950 hover:bg-stone-800"
              >
                CONTINUE <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Garage size */}
          {step === 2 && (
            <div>
              <StepHeader n="2" title="How big is your garage?" sub="Pick the closest match — we'll verify with our property lookup." />
              <div className="space-y-2 mt-6">
                {SIZES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => { update({ garage_size: s.key }); next(); }}
                    className={`w-full text-left rounded-xl border p-4 flex items-center justify-between transition ${data.garage_size === s.key ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white hover:border-stone-300"}`}
                  >
                    <div>
                      <div className="font-semibold text-stone-900">{s.label}</div>
                      <div className="text-sm text-stone-500">{s.desc}</div>
                    </div>
                    {data.garage_size === s.key && <CheckCircle2 className="h-5 w-5 text-amber-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Floor condition */}
          {step === 3 && (
            <div>
              <StepHeader n="3" title="What's the condition of your floor?" sub="Select all that apply. This helps us prepare the right way." />
              <div className="space-y-2 mt-6">
                {CONDITIONS.map((c) => {
                  const active = (data.floor_condition || []).includes(c.key);
                  return (
                    <button
                      key={c.key}
                      onClick={() => toggleCondition(c.key)}
                      className={`w-full text-left rounded-xl border p-4 flex items-center justify-between transition ${active ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white hover:border-stone-300"}`}
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{c.label}</div>
                        <div className="text-sm text-stone-500">{c.desc}</div>
                      </div>
                      {active && <CheckCircle2 className="h-5 w-5 text-amber-500" />}
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={next}
                disabled={!(data.floor_condition || []).length}
                className="mt-6 h-14 w-full text-base font-bold bg-stone-950 hover:bg-stone-800"
              >
                CONTINUE <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 4: Contact info */}
          {step === 4 && (
            <div>
              <StepHeader n="4" title="Last step — where do we send your estimate?" sub="We'll look up your garage and prepare your personalized quote." />
              <div className="space-y-3 mt-6">
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="First name" value={data.first_name || ""} onChange={(e) => update({ first_name: e.target.value })} className="h-12" />
                  <Input placeholder="Last name" value={data.last_name || ""} onChange={(e) => update({ last_name: e.target.value })} className="h-12" />
                </div>
                <Input type="email" placeholder="Email" value={data.email || ""} onChange={(e) => update({ email: e.target.value })} className="h-12" />
                <Input type="tel" placeholder="Phone" value={data.phone || ""} onChange={(e) => update({ phone: e.target.value })} className="h-12" />
              </div>
              <p className="mt-3 text-xs text-stone-500">{settings.consent_language}</p>
              <Button
                onClick={submitContact}
                disabled={!data.first_name || !data.email || !data.phone || submitting}
                className="mt-4 h-14 w-full text-base font-bold bg-amber-500 hover:bg-amber-400 text-stone-950"
              >
                {submitting ? "LOOKING UP YOUR GARAGE…" : <>LOOK UP MY GARAGE <ArrowRight className="h-5 w-5" /></>}
              </Button>
            </div>
          )}

          {/* Step 6: Results */}
          {step === 6 && (
            <div className="space-y-8">
              {/* Detected sq ft */}
              <div className="rounded-2xl bg-stone-950 p-7 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 mb-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Your garage has been identified</h2>
                <p className="text-sm text-stone-400 mt-1">{data.address}, {data.city}, {data.state}</p>
                <div className="mt-5">
                  <div className="text-xs font-bold tracking-[0.2em] text-amber-500">DETECTED GARAGE SIZE</div>
                  <div className="mt-2 text-5xl font-semibold text-white tabular-nums">{detectedSqft?.toLocaleString()}</div>
                  <div className="text-sm text-stone-400">square feet</div>
                </div>
                <div className="mt-5 pt-5 border-t border-stone-800">
                  <div className="text-xs font-bold tracking-[0.2em] text-amber-500">ESTIMATED PROJECT RANGE</div>
                  <div className="mt-2 text-3xl font-semibold text-white tabular-nums">
                    {money(calcEstimate(settings, { ...data, square_footage: detectedSqft }).low)} – {money(calcEstimate(settings, { ...data, square_footage: detectedSqft }).high)}
                  </div>
                </div>
              </div>

              {/* Before / After */}
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">See the transformation</h3>
                <p className="text-sm text-stone-500 mb-4">Drag the slider to see what your garage could look like before and after a professional epoxy flake floor.</p>
                <BeforeAfter beforeUrl={BEFORE_URL} afterUrl={AFTER_URL} />
              </div>

              {/* Flake color chart */}
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-1">Choose your flake color</h3>
                <p className="text-sm text-stone-500 mb-4">Top 12 popular epoxy flake blends from Xtreme Polishing Systems.</p>
                <FlakeColorChart selected={selectedFlake} onSelect={saveFlake} />
              </div>

              {/* Xtreme Polishing Systems message */}
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-7 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 mb-4">
                  <Phone className="h-7 w-7 text-stone-950" />
                </div>
                <h2 className="text-2xl font-semibold text-stone-900">You're all set, {data.first_name}!</h2>
                <p className="mt-3 text-stone-700 leading-relaxed max-w-md mx-auto">
                  A specialist from <strong>Xtreme Polishing Systems</strong> will be in contact with you within <strong>24 hours</strong> to review your garage, confirm your color selection, and schedule your installation.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={`tel:${settings.phone}`} onClick={() => trackEvent("call_clicked", { lead_id: leadId, location: "funnel_results" })} className="inline-flex h-12 px-6 items-center justify-center gap-2 rounded-xl border border-stone-300 font-semibold text-stone-900">
                    <Phone className="h-4 w-4" /> Call now: {settings.phone}
                  </a>
                  <button onClick={() => navigate(`/results/${leadId}`)} className="inline-flex h-12 px-6 items-center justify-center rounded-xl bg-stone-950 text-white font-semibold">
                    View full estimate
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed">{settings.disclaimer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepHeader({ n, title, sub }) {
  return (
    <div>
      <div className="text-xs font-bold tracking-[0.2em] text-amber-500">STEP {n} OF 4</div>
      <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-stone-900">{title}</h1>
      <p className="mt-2 text-stone-500">{sub}</p>
    </div>
  );
}