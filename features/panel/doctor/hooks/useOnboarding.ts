"use client";

import { useState } from "react";

export function useOnboarding(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));

  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const goTo = (index: number) =>
    setCurrentStep(() => Math.max(0, Math.min(index, totalSteps - 1)));

  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return {
    currentStep,
    next,
    prev,
    goTo,
    isFirst,
    isLast,
    progress: Math.round(((currentStep + 1) / totalSteps) * 100),
  };
}
