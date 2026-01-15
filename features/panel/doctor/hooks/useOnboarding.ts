"use client";

import { useState } from "react";
import { submitDoctorProfile } from "../actions/submitDoctorProfile";
import { updateDoctorProfile } from "../actions/updateDoctorProfile";

type Mode = "create" | "edit";

export function useOnboarding(mode: Mode = "create") {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const totalSteps = 5;

  const next = async () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
      return;
    }

    // Last step → submit / update
    setLoading(true);
    try {
      if (mode === "edit") {
        await updateDoctorProfile(data);
        window.location.href = "/doctor/profile";
      } else {
        await submitDoctorProfile(data);
        window.location.href = "/doctor/status";
      }
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Failed to save profile");
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
