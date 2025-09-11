"use client";

import { useState } from "react";
import type { AddDoctorInput } from "../actions/addDoctor";
import { addDoctor } from "../actions/addDoctor";

export function useAddDoctor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitDoctor = async (data: AddDoctorInput) => {
    setLoading(true);
    setError(null);

    try {
      const doctor = await addDoctor(data); // server action
      setLoading(false);
      return doctor;
    } catch (err: any) {
      console.error("Add doctor failed:", err);
      setError(err.message || "Something went wrong");
      setLoading(false);
      return null;
    }
  };

  return { submitDoctor, loading, error };
}
