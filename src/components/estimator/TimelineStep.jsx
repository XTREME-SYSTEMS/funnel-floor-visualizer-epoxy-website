import React from "react";
import StepShell, { PrimaryButton } from "./StepShell";
import OptionCard from "./OptionCard";
import { TIMELINE_OPTIONS } from "@/lib/defaults";

export default function TimelineStep({ data, update, onNext, onBack }) {
  return (
    <StepShell
      step={5}
      total={6}
      title="When would you like your garage done?"
      onBack={onBack}
      footer={<PrimaryButton disabled={!data.timeline} onClick={onNext}>CONTINUE</PrimaryButton>}
    >
      <div className="space-y-3">
        {TIMELINE_OPTIONS.map((t) => (
          <OptionCard key={t} compact selected={data.timeline === t} onClick={() => update({ timeline: t })} title={t} />
        ))}
      </div>
    </StepShell>
  );
}