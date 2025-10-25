"use client";

import { useEffect, useState } from "react";
import AdminDoctorCard from "./AdminDoctorCard";
import { getDoctors } from "../actions/getDoctors";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DoctorStatus, AdminDoctor } from "../types/adminDoctor";

interface AdminDoctorListProps {
  status: DoctorStatus;
}

export default function AdminDoctorList({ status }: AdminDoctorListProps) {
  const [doctors, setDoctors] = useState<AdminDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        setError("");
        const data = await getDoctors(status);
        setDoctors(data);
      } catch (err) {
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [status]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <img
          src="/empty-state.svg"
          alt="No doctors"
          className="w-32 h-32 opacity-70 mb-4"
        />
        <p className="text-muted-foreground">No doctors found in {status}.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doctors.map((doctor) => (
        <AdminDoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
