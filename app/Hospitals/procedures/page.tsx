"use client";

import HospitalProcedureList from "@/features/panel/hospitals/hospital-Procedure/components/HospitalProcedureList";
import { useSession } from "next-auth/react";


export default function HospitalProceduresPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || session.user.role !== "HOSPITAL") {
    return <p className="text-red-500">You must be logged in as a hospital to manage procedures.</p>;
  }

  // ✅ hospitalId from session (jo aap NextAuth ke user object me store karte ho)
  const hospitalId = session.user.hospitalId;

  if (!hospitalId) {
    return <p className="text-red-500">No hospital profile linked with this account.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Hospital Procedures</h1>
      <HospitalProcedureList hospitalId={hospitalId} />
    </div>
  );
}
