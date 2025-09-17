"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateConsultationStatus } from "../actions/updateConsultationStatus";

export default function DoctorConsultationCard({
  consultation,
}: {
  consultation: any;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      await updateConsultationStatus(consultation.id, status);
      router.refresh(); // ✅ updated data reload hoga
    });
  };

  return (
    <div className="border p-4 rounded-lg space-y-2">
      <p>
        <strong>User:</strong> {consultation.user.name}
      </p>
      <p>
        <strong>Slot:</strong> {new Date(consultation.slot).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {consultation.status}
      </p>

      {consultation.status === "PENDING" && (
        <div className="flex gap-2">
          <button
            onClick={() => handleAction("APPROVED")}
            disabled={isPending}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleAction("REJECTED")}
            disabled={isPending}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
