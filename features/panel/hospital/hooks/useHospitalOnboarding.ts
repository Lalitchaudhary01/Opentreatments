"use client";

import { useState } from "react";
import { submitHospitalProfile } from "../actions/submitHospitalProfile";
import { updateHospitalProfile } from "../actions/updateHospitalProfile";

type Mode = "create" | "edit";

export function useHospitalOnboarding(mode: Mode = "create") {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const totalSteps = 4;

  const next = async () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
      return;
    }

    setLoading(true);
    try {
      if (mode === "edit") {
        await updateHospitalProfile(data);
        window.location.href = "/hospital/profile";
      } else {
        await submitHospitalProfile(data);
        window.location.href = "/hospital/status";
      }
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Failed to save hospital profile");
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
