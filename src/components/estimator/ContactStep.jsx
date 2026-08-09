import React, { useState } from "react";
import StepShell, { PrimaryButton } from "./StepShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function ContactStep({ data, update, settings, onSubmit, onBack, submitting }) {
  const [error, setError] = useState("");

  const submit = () => {
    if (!data.first_name || !data.last_name || !data.email || !data.phone) {
      setError("Please complete all fields so we can send your estimate.");
      return;
    }
    setError("");
    onSubmit();
  };

  return (
    <StepShell
      step={6}
      total={6}
      title="Your garage estimate is ready."
      helper="Where should we send your estimate?"
      onBack={onBack}
      footer={
        <PrimaryButton onClick={submit} disabled={submitting}>
          {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "SHOW MY ESTIMATE"}
        </PrimaryButton>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-stone-600">First name</Label>
            <Input className="mt-2 h-14 rounded-xl text-base" value={data.first_name || ""} onChange={(e) => update({ first_name: e.target.value })} />
          </div>
          <div>
            <Label className="text-stone-600">Last name</Label>
            <Input className="mt-2 h-14 rounded-xl text-base" value={data.last_name || ""} onChange={(e) => update({ last_name: e.target.value })} />
          </div>
        </div>
        <div>
          <Label className="text-stone-600">Email</Label>
          <Input type="email" className="mt-2 h-14 rounded-xl text-base" value={data.email || ""} onChange={(e) => update({ email: e.target.value })} />
        </div>
        <div>
          <Label className="text-stone-600">Mobile phone</Label>
          <Input type="tel" className="mt-2 h-14 rounded-xl text-base" value={data.phone || ""} onChange={(e) => update({ phone: e.target.value })} />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-xs text-stone-500 leading-relaxed pt-2">{settings.consent_language}</p>
      </div>
    </StepShell>
  );
}