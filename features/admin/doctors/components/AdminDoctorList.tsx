// features/admin-doctors/components/AdminDoctorList.tsx
"use client";

import { useEffect, useState } from "react";

import AdminDoctorCard from "./AdminDoctorCard";
import { DoctorProfile } from "@/features/panel/doctors/types/doctorProfile";
import { getDoctors } from "../actions/getDoctors";

interface AdminDoctorListProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function AdminDoctorList({ status }: AdminDoctorListProps) {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);

  useEffect(() => {
    async function fetchDoctors() {
      const data = await getDoctors(status);
      setDoctors(data);
    }
    fetchDoctors();
  }, [status]);

  if (doctors.length === 0) {
    return <p className="text-muted-foreground">No doctors found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doctors.map((doctor) => (
        <AdminDoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
