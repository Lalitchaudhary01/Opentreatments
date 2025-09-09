"use client";

import { useState } from "react";
import type { AddHospitalInput } from "../types/hospital";

const initialData: AddHospitalInput = {
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

export function useHospitalForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<AddHospitalInput>(initialData);

  function updateField<K extends keyof AddHospitalInput>(
    field: K,
    value: AddHospitalInput[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function nextStep() {
    setStep((s) => s + 1);
  }

  function prevStep() {
    setStep((s) => Math.max(0, s - 1));
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
