"use client";

import { ProgressStepper } from "../../components/ui/shared";
import { onboardingSteps } from "../../constants";
import { useOnboarding } from "../../hooks";

// import { useOnboarding } from "@/features/panel/pharmacy/hooks";
// import { onboardingSteps } from "@/features/panel/pharmacy/constants";
// import { ProgressStepper } from "@/features/panel/pharmacy/components/ui/shared";

export function PharmacyProfileForm({ steps }: { steps: React.ReactNode[] }) {
  const { step, next, prev, isFirst, isLast } = useOnboarding(steps.length);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <ProgressStepper steps={onboardingSteps} active={step} />

      <div className="border rounded-xl p-6">{steps[step]}</div>

      <div className="flex justify-between">
        <button
          disabled={isFirst}
          onClick={prev}
          className="px-4 py-2 rounded-lg border disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded-lg bg-primary text-white"
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
