"use client";

import { useState } from "react";
import { submitDoctorProfile } from "../actions/submitDoctorProfile";

export function useOnboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const totalSteps = 5;

  const next = async () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
      return;
    }

    // Last step → submit
    setLoading(true);
    try {
      await submitDoctorProfile(data);
      window.location.href = "/doctor/profile";
    } catch (e) {
      console.error(e);
      alert("Failed to submit profile");
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return {
    step,
    data,
    setData,
    next,
    back,
    loading,
    isFirst: step === 0,
    isLast: step === totalSteps - 1,
  };
}
