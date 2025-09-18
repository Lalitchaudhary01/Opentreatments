"use client";

import { useSession } from "next-auth/react";
import HospitalEstimateList from "@/features/hospital-estimates/components/HospitalEstimateList";

export default function HospitalEstimatesPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session || session.user.role !== "HOSPITAL") return <p>Unauthorized</p>;

  const hospitalId = session.user.hospitalId;
  if (!hospitalId) return <p>No hospital linked to this account.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Insurance Estimates</h1>
      <HospitalEstimateList hospitalId={hospitalId} />
    </div>
  );
}
