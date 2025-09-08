"use client";

import { useState, useEffect } from "react";
import HospitalCard from "./HospitalCard";
import { getHospitals } from "../actions/getHospitals";

export default function HospitalList() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getHospitals({ search });
      setHospitals(data);
      setLoading(false);
    }
    fetchData();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {loading ? (
        <p>Loading hospitals...</p>
      ) : hospitals.length === 0 ? (
        <p>No hospitals found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      )}
    </div>
  );
}
