"use client";

import { useState } from "react";

export function useOnboarding(totalSteps: number) {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const goTo = (i: number) =>
    setStep(Math.min(Math.max(i, 0), totalSteps - 1));

  return {
    step,
    next,
    prev,
    goTo,
    isFirst: step === 0,
    isLast: step === totalSteps - 1,
  };
}
