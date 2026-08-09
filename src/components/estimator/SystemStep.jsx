import React from "react";
import StepShell, { PrimaryButton } from "./StepShell";
import OptionCard from "./OptionCard";

export default function SystemStep({ data, update, settings, onNext, onBack }) {
  return (
    <StepShell
      step={4}
      total={6}
      title="What kind of floor are you interested in?"
      onBack={onBack}
      footer={<PrimaryButton disabled={!data.desired_system} onClick={onNext}>CONTINUE</PrimaryButton>}
    >
      <div className="space-y-4">
        {(settings.systems || []).map((s) => (
          <OptionCard
            key={s.key}
            image={s.image_url}
            selected={data.desired_system === s.key}
            onClick={() => update({ desired_system: s.key })}
            title={s.name}
            subtitle={s.description}
          />
        ))}
      </div>
    </StepShell>
  );
}