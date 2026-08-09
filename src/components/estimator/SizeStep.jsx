import React from "react";
import StepShell, { PrimaryButton } from "./StepShell";
import OptionCard from "./OptionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIZE_OPTIONS } from "@/lib/defaults";
import { calcSquareFootage } from "@/lib/pricing";

export default function SizeStep({ data, update, settings, onNext, onBack }) {
  const sqft = data.garage_size ? calcSquareFootage(settings, data) : 0;
  const ready = data.garage_size && (data.garage_size !== "custom" || (data.custom_length && data.custom_width));

  return (
    <StepShell
      step={2}
      total={6}
      title="How big is your garage?"
      onBack={onBack}
      footer={<PrimaryButton disabled={!ready} onClick={onNext}>CONTINUE</PrimaryButton>}
    >
      <div className="grid grid-cols-2 gap-3">
        {SIZE_OPTIONS.map((o) => (
          <OptionCard key={o.key} compact selected={data.garage_size === o.key} onClick={() => update({ garage_size: o.key })} title={o.label} />
        ))}
      </div>

      {data.garage_size === "custom" && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <Label className="text-stone-600">Length (ft)</Label>
            <Input className="mt-2 h-14 rounded-xl text-base" inputMode="numeric" value={data.custom_length || ""} onChange={(e) => update({ custom_length: Number(e.target.value) })} />
          </div>
          <div>
            <Label className="text-stone-600">Width (ft)</Label>
            <Input className="mt-2 h-14 rounded-xl text-base" inputMode="numeric" value={data.custom_width || ""} onChange={(e) => update({ custom_width: Number(e.target.value) })} />
          </div>
        </div>
      )}

      {ready && (
        <p className="mt-6 text-sm text-stone-500">
          Estimated area: <span className="font-semibold text-stone-900">{sqft.toLocaleString()} sq ft</span>
        </p>
      )}
    </StepShell>
  );
}