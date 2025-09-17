"use client";

import { DoctorConsultation } from "../types/doctorConsultation";
import { updateConsultationStatus } from "../actions/updateConsultationStatus";
import { useTransition } from "react";
import ConsultationStatusBadge from "./ConsultationsStatusBadge";

export default function DoctorConsultationCard({
  consultation,
}: {
  consultation: DoctorConsultation;
}) {
  const [isPending, startTransition] = useTransition();

  function handleUpdate(status: "APPROVED" | "REJECTED" | "COMPLETED") {
    startTransition(async () => {
      await updateConsultationStatus(consultation.id, status);
    });
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{consultation.userName}</h3>
        <ConsultationStatusBadge status={consultation.status} />
      </div>

      <p className="text-sm text-muted-foreground">{consultation.userEmail}</p>
      <p className="text-sm">
        📅 {new Date(consultation.slot).toLocaleString()}
      </p>
      {consultation.notes && (
        <p className="text-sm italic">📝 {consultation.notes}</p>
      )}

      <p className="text-sm">
        💰 {consultation.fee ? `₹${consultation.fee}` : "Not set"}
      </p>
      <p className="text-sm">Payment: {consultation.paymentStatus}</p>

      {consultation.status === "PENDING" && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleUpdate("APPROVED")}
            disabled={isPending}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleUpdate("REJECTED")}
            disabled={isPending}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Reject
          </button>
        </div>
      )}

      {consultation.status === "APPROVED" && (
        <button
          onClick={() => handleUpdate("COMPLETED")}
          disabled={isPending}
          className="px-3 py-1 bg-blue-600 text-white rounded mt-2"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
}
