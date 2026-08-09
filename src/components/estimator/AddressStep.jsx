import React, { useState } from "react";
import StepShell, { PrimaryButton } from "./StepShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressStep({ data, update, onNext, onBack }) {
  const [error, setError] = useState("");

  const submit = () => {
    if (!data.address || !data.city || !data.state || !data.zip) {
      setError("Please complete your property address.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepShell
      step={1}
      total={6}
      title="Where is your garage?"
      helper="We use your location to match you with the right local crew and pricing."
      onBack={onBack}
      footer={<PrimaryButton onClick={submit}>THIS IS MY PROPERTY</PrimaryButton>}
    >
      <div className="space-y-4">
        <div>
          <Label className="text-stone-600">Street address</Label>
          <Input className="mt-2 h-14 rounded-xl text-base" placeholder="123 Maple Street" value={data.address || ""} onChange={(e) => update({ address: e.target.value })} />
        </div>
        <div>
          <Label className="text-stone-600">City</Label>
          <Input className="mt-2 h-14 rounded-xl text-base" placeholder="Oak Ridge" value={data.city || ""} onChange={(e) => update({ city: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-stone-600">State</Label>
            <Input className="mt-2 h-14 rounded-xl text-base" placeholder="TN" value={data.state || ""} onChange={(e) => update({ state: e.target.value })} />
          </div>
          <div>
            <Label className="text-stone-600">ZIP</Label>
            <Input className="mt-2 h-14 rounded-xl text-base" inputMode="numeric" placeholder="37830" value={data.zip || ""} onChange={(e) => update({ zip: e.target.value })} />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </StepShell>
  );
}