"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  updateDoctorStatus,
  deleteDoctor,
} from "@/features/admin/doctors/actions/updateDoctorStatus";
import { DoctorStatus } from "../types/adminDoctor";

interface AdminDoctorActionsProps {
  doctorId: string;
  currentStatus: "PENDING" | "APPROVED" | "REJECTED";
}

export default function AdminDoctorActions({
  doctorId,
  currentStatus,
}: AdminDoctorActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (status: DoctorStatus) => {
    startTransition(async () => {
      await updateDoctorStatus({ doctorId, status });
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteDoctor({ doctorId });
    });
  };

  return (
    <div className="flex gap-2 pt-4">
      {currentStatus === "PENDING" && (
        <>
          <Button
            variant="default"
            disabled={isPending}
            onClick={() => handleAction(DoctorStatus.APPROVED)}
          >
            Approve
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => handleAction(DoctorStatus.REJECTED)}
          >
            Reject
          </Button>
        </>
      )}
      <Button variant="outline" disabled={isPending} onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
