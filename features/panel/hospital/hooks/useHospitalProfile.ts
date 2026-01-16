"use client";

import { useEffect, useState } from "react";
import { getHospitalProfile } from "@/features/panel/hospital/actions";

export function useHospitalProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHospitalProfile()
      .then((data) => setProfile(data))
      .finally(() => setLoading(false));
  }, []);

  return {
    profile,
    loading,
  };
}
