"use client";

import { getHospitals } from "@/features/admin/hospitals/actions/getHospitals";
import { updateHospitalStatus } from "@/features/admin/hospitals/actions/updateHospitalStatus";
import AdminHospitalCard from "@/features/admin/hospitals/components/AdminHospitalCard";
import {
  AdminHospital,
  HospitalStatus,
} from "@/features/admin/hospitals/types/adminHospital";
import { useEffect, useState } from "react";

export default function AdminHospitalsPage() {
  const [hospitals, setHospitals] = useState<AdminHospital[]>([]);
  const [filter, setFilter] = useState<HospitalStatus | "ALL">("ALL");

  const fetchData = async () => {
    const data = await getHospitals(filter === "ALL" ? undefined : filter);
    setHospitals(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hospital?")) return;
    await updateHospitalStatus(id, "DELETE"); // 👈 we will use delete in action
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Hospitals</h1>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        {(
          [
            "ALL",
            HospitalStatus.PENDING,
            HospitalStatus.APPROVED,
            HospitalStatus.REJECTED,
          ] as const
        ).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded ${
              filter === s
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* List */}
      {hospitals.length === 0 ? (
        <p className="text-gray-500">No hospitals found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((h) => (
            <div key={h.id} className="relative">
              <AdminHospitalCard hospital={h} />
              <button
                onClick={() => handleDelete(h.id)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
