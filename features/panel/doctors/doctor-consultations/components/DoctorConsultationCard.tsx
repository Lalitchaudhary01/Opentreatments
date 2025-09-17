// features/panel/doctors/doctor-consultations/components/DoctorConsultationCard.tsx
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
      router.refresh();
    });
  };

  return (
    <div
      className={`border p-4 rounded-lg space-y-2 ${
        consultation.status === "APPROVED"
          ? "border-green-500"
          : consultation.status === "REJECTED"
          ? "border-red-500"
          : "border-gray-300"
      }`}
    >
      <p>
        <strong>User:</strong> {consultation.user.name}
      </p>
      <p>
        <strong>Slot:</strong> {new Date(consultation.slot).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={
            consultation.status === "APPROVED"
              ? "text-green-600"
              : consultation.status === "REJECTED"
              ? "text-red-600"
              : "text-gray-800"
          }
        >
          {consultation.status}
        </span>
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
