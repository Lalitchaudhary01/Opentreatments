"use client";

import { useTransition } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoctorProfile } from "@/features/panel/doctors/types/doctorProfile";
import { updateDoctorStatus } from "../actions/updateDoctorStatus";


interface AdminDoctorCardProps {
  doctor: DoctorProfile;
  onAction?: () => void; // refresh list after action
}

export default function AdminDoctorCard({
  doctor,
  onAction,
}: AdminDoctorCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (status: "APPROVED" | "REJECTED" | "DELETED") => {
    startTransition(async () => {
      await updateDoctorStatus(doctor.id, status);
      onAction?.();
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{doctor.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{doctor.email}</p>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-medium">Phone:</span> {doctor.phone}
        </p>
        <p>
          <span className="font-medium">Status:</span> {doctor.status}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="success"
          disabled={isPending || doctor.status === "APPROVED"}
          onClick={() => handleAction("APPROVED")}
        >
          Approve
        </Button>
        <Button
          variant="destructive"
          disabled={isPending || doctor.status === "REJECTED"}
          onClick={() => handleAction("REJECTED")}
        >
          Reject
        </Button>
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => handleAction("DELETED")}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
