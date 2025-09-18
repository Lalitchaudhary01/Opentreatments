"use client";

import { useEffect, useState } from "react";
import { getHospitals } from "../actions/getHospitals";
import { AdminHospital } from "../types/adminHospital";
import AdminHospitalCard from "./AdminHospitalCard";

export default function AdminHospitalList() {
  const [hospitals, setHospitals] = useState<AdminHospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitals(); // ✅ fetch all hospitals
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading hospitals...</p>;
  }

  if (hospitals.length === 0) {
    return <p className="text-gray-500">No hospitals found.</p>;
  }

  return (
    <div className="space-y-4">
      {hospitals.map((hospital) => (
        <AdminHospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </div>
  );
}
