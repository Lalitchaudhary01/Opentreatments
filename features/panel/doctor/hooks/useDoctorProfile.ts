"use client";

import { useEffect, useState } from "react";
import { getDoctorProfile } from "../actions";
import { DoctorProfile } from "../types";

export function useDoctorProfile() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      try {
        setLoading(true);
        const data = await getDoctorProfile();
        if (mounted) {
          setProfile(data as DoctorProfile);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.message || "Failed to load profile");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    profile,
    loading,
    error,
    refresh: async () => {
      setLoading(true);
      const data = await getDoctorProfile();
      setProfile(data as DoctorProfile);
      setLoading(false);
    },
  };
}
