"use client";

import { ConsultationStatus } from "@prisma/client";

export default function ConsultationStatusBadge({
  status,
}: {
  status: ConsultationStatus;
}) {
  const color =
    status === "PENDING"
      ? "bg-yellow-100 text-yellow-800"
      : status === "APPROVED"
      ? "bg-green-100 text-green-800"
      : status === "REJECTED"
      ? "bg-red-100 text-red-800"
      : status === "COMPLETED"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-200 text-gray-800"; // CANCELLED

  return (
    <span className={`px-2 py-1 text-xs rounded-md font-medium ${color}`}>
      {status}
    </span>
  );
}
