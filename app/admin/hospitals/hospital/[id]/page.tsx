"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AdminHospital,
  HospitalStatus,
} from "@/features/admin/hospitals/types/adminHospital";
import { getHospitalById } from "@/features/admin/hospitals/actions/getHospitalById";
import { updateHospitalStatus } from "@/features/admin/hospitals/actions/updateHospitalStatus";

export default function AdminHospitalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [hospital, setHospital] = useState<AdminHospital | null>(null);

  const fetchData = async () => {
    if (typeof params.id !== "string") return;
    const data = await getHospitalById(params.id);
    setHospital(data);
  };

  const handleStatusChange = async (status: HospitalStatus) => {
    if (!hospital) return;
    await updateHospitalStatus(hospital.id, status);
    fetchData();
  };

  const handleDelete = async () => {
    if (!hospital) return;
    if (!confirm("Are you sure you want to delete this hospital?")) return;
    await updateHospitalStatus(hospital.id, "DELETE");
    router.push("/admin/hospitals");
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  if (!hospital) return <p className="p-6">Loading hospital...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold">{hospital.name}</h1>
      <p className="text-gray-600">{hospital.email}</p>
      <p>{hospital.phone}</p>
      <p>{hospital.address}</p>
      <p className="mt-2">
        Status:{" "}
        <span
          className={`px-2 py-1 text-xs rounded ${
            hospital.status === HospitalStatus.APPROVED
              ? "bg-green-100 text-green-600"
              : hospital.status === HospitalStatus.REJECTED
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {hospital.status}
        </span>
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleStatusChange(HospitalStatus.APPROVED)}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={() => handleStatusChange(HospitalStatus.REJECTED)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reject
        </button>
        <button
          onClick={() => handleStatusChange(HospitalStatus.PENDING)}
          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Reset Pending
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
