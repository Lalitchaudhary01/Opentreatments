"use client";

import { getHospitals } from "@/features/Hospitals/actions/getHospitals";
import CompareDrawer from "@/features/Hospitals/components/CompareDrawer";
import HospitalCard from "@/features/Hospitals/components/HospitalCard";
import HospitalFilters from "@/features/Hospitals/components/HospitalFilters";
import type { Hospital } from "@/features/Hospitals/types/hospital";
import { useEffect, useState } from "react";

export default function HospitalListingPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchHospitals() {
    try {
      const data = await getHospitals();
      setHospitals(data);
    } catch (err) {
      console.error("Failed to fetch hospitals:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHospitals();
  }, []);

  if (loading) return <p className="p-6">Loading hospitals...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <HospitalFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((h) => (
          <HospitalCard key={h.id} hospital={h} />
        ))}
      </div>

      <CompareDrawer />
    </div>
  );
}
