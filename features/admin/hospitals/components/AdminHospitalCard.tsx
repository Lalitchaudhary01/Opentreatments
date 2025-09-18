"use client";

import { useTransition } from "react";
import { AdminHospital, HospitalStatus } from "../types/adminHospital";
import { updateHospitalStatus } from "../actions/updateHospitalStatus";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  hospital: AdminHospital;
}

export default function AdminHospitalCard({ hospital }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAction = (status: HospitalStatus | "DELETE") => {
    startTransition(async () => {
      await updateHospitalStatus(hospital.id, status);
      router.refresh();
    });
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{hospital.name}</h3>
        <p className="text-sm text-gray-600">Status: {hospital.status}</p>
        <p className="text-sm text-gray-500">{hospital.email}</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => handleAction("APPROVED")}
          disabled={isPending}
        >
          Approve
        </Button>
        <Button
          variant="outline"
          onClick={() => handleAction("REJECTED")}
          disabled={isPending}
        >
          Reject
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleAction("DELETE")}
          disabled={isPending}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
