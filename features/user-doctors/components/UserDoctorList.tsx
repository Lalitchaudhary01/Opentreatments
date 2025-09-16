"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApprovedDoctors } from "../actions/getApprovedDoctors";
import { UserDoctor } from "../types/userDoctor";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserDoctorList() {
  const [doctors, setDoctors] = useState<UserDoctor[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getApprovedDoctors();
      setDoctors(data);
    });
  }, []);

  if (isPending && doctors.length === 0) {
    return <p>Loading doctors...</p>;
  }

  if (doctors.length === 0) {
    return <p>No approved doctors found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <Card key={doctor.id}>
          <CardHeader>
            <CardTitle>{doctor.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {doctor.specialization}
            </p>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Specialties:</strong>{" "}
              {doctor.specialties?.join(", ") || "N/A"} {/* ✅ Added */}
            </p>
            <p>
              <strong>Experience:</strong> {doctor.experience ?? 0} yrs
            </p>
            <p>
              <strong>City:</strong> {doctor.city ?? "N/A"}
            </p>
            <p>
              <strong>Fees:</strong> ₹{doctor.fees ?? "N/A"}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {doctor.languages?.join(", ") || "N/A"}
            </p>

            <div className="pt-4">
              <Link href={`/user/doctors/${doctor.id}`}>
                <Button className="w-full">View Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
