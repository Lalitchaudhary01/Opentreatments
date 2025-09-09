"use client";

import { useState } from "react";
import type { AddHospitalInput } from "../types/hospital";

// ✅ Export type for form data usage in steps
export type HospitalFormData = AddHospitalInput;

const initialData: HospitalFormData = {
  name: "",
  description: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",
  website: "",
  logo: "",
  facilities: [],
  services: [],
  insurances: [],
  doctors: [],
  procedures: [],
};

export function useHospitalForm(
  initialDataOverride?: Partial<HospitalFormData>
) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<HospitalFormData>({
    ...initialData,
    ...initialDataOverride,
  });

  function updateField<K extends keyof HospitalFormData>(
    field: K,
    value: HospitalFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, 5)); // max 5 steps
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function resetForm() {
    setFormData(initialData);
    setStep(0);
  }

  return {
    step,
    formData,
    updateField,
    nextStep,
    prevStep,
    resetForm,
  };
}
