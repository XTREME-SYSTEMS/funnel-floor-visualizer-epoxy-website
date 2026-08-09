import React from "react";
import StepShell, { PrimaryButton } from "./StepShell";
import OptionCard from "./OptionCard";

export default function ConditionStep({ data, update, settings, onNext, onBack }) {
  const selected = data.floor_condition || [];
  const toggle = (key) =>
    update({ floor_condition: selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key] });

  return (
    <StepShell
      step={3}
      total={6}
      title="What does your concrete look like today?"
      helper="Select everything that applies. Don't worry if you're unsure. We'll confirm everything during your consultation."
      onBack={onBack}
      footer={<PrimaryButton disabled={!selected.length} onClick={onNext}>CONTINUE</PrimaryButton>}
    >
      <div className="space-y-3">
        {(settings.condition_adjustments || []).map((c) => (
          <OptionCard key={c.key} compact selected={selected.includes(c.key)} onClick={() => toggle(c.key)} title={c.label} />
        ))}
      </div>
    </StepShell>
  );
}