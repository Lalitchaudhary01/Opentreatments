"use client";

import { useEffect, useState } from "react";
// import {
//   getPharmacyProfile,
//   submitPharmacyProfile,
//   updatePharmacyProfile,
// } from "@/features/panel/pharmacy/actions";
import { PharmacyProfile, PharmacyProfileInput } from "../types";
import { getPharmacyProfile, submitPharmacyProfile, updatePharmacyProfile } from "../actions";

export function usePharmacyProfile(userId: string) {
  const [profile, setProfile] = useState<PharmacyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    getPharmacyProfile(userId)
      .then((data) => setProfile(data as any))
      .finally(() => setLoading(false));
  }, [userId]);

  const createProfile = async (data: PharmacyProfileInput) => {
    const res = await submitPharmacyProfile(userId, data);
    setProfile(res as any);
    return res;
  };

  const updateProfile = async (data: Partial<PharmacyProfileInput>) => {
    const res = await updatePharmacyProfile(userId, data);
    setProfile(res as any);
    return res;
  };

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
  };
}
