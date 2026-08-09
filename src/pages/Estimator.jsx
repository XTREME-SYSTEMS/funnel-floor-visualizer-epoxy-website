import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useSettings } from "@/lib/useSettings";
import { calcEstimate } from "@/lib/pricing";
import { trackEvent } from "@/lib/tracking";
import { loadDraft, saveDraft, clearDraft, captureAttribution } from "@/lib/estimatorStore";
import AddressStep from "@/components/estimator/AddressStep";
import SizeStep from "@/components/estimator/SizeStep";
import ConditionStep from "@/components/estimator/ConditionStep";
import SystemStep from "@/components/estimator/SystemStep";
import TimelineStep from "@/components/estimator/TimelineStep";
import PhotoStep from "@/components/estimator/PhotoStep";
import ContactStep from "@/components/estimator/ContactStep";

const EVENTS = ["address_completed", "garage_size_completed", "condition_completed", "floor_selected", "timeline_completed", "contact_started"];

export default function Estimator() {
  const navigate = useNavigate();
  const { settings, isLoading } = useSettings();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(loadDraft());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    trackEvent("estimator_started");
  }, []);

  const update = (patch) => {
    const next = { ...data, ...patch };
    setData(next);
    saveDraft(next);
  };

  const next = () => {
    trackEvent(EVENTS[step]);
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  const back = () => {
    if (step === 0) return navigate("/");
    setStep((s) => s - 1);
    window.scrollTo(0, 0);
  };

  const submit = async () => {
    setSubmitting(true);
    const est = calcEstimate(settings, data);
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
      custom_length: data.custom_length,
      custom_width: data.custom_width,
      square_footage: est.sqft,
      floor_condition: data.floor_condition || [],
      desired_system: data.desired_system,
      timeline: data.timeline,
      photos: data.photos || [],
      estimate_mid: est.mid,
      estimate_low: est.low,
      estimate_high: est.high,
      package_options: est.packages,
      assigned_salesperson: settings.salesperson?.name || "",
      status: "NEW ESTIMATE",
      appointment_status: "none",
      ...captureAttribution()
    });
    await trackEvent("lead_created", { lead_id: lead.id });
    clearDraft();
    navigate(`/results/${lead.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
      </div>
    );
  }

  const props = { data, update, settings, onNext: next, onBack: back };

  if (step === 0) return <AddressStep {...props} />;
  if (step === 1) return <SizeStep {...props} />;
  if (step === 2) return <ConditionStep {...props} />;
  if (step === 3) return <SystemStep {...props} />;
  if (step === 4) return <TimelineStep {...props} />;
  if (step === 5) return <PhotoStep {...props} />;
  return <ContactStep {...props} submitting={submitting} onSubmit={submit} />;
}