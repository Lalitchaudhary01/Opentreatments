"use client";

import { HospitalStatus } from "../types/hospitalProfile";

export function HospitalStatusBadge({ status }: { status: HospitalStatus }) {
  let color = "bg-gray-200 text-gray-800";

  if (status === HospitalStatus.APPROVED) color = "bg-green-100 text-green-700";
  if (status === HospitalStatus.REJECTED) color = "bg-red-100 text-red-700";
  if (status === HospitalStatus.PENDING)
    color = "bg-yellow-100 text-yellow-700";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {status}
    </span>
  );
}
