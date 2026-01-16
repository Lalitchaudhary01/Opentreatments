"use client";

import { HospitalStatus } from "@prisma/client";
import { hospitalStatusConfig } from "@/features/panel/hospital/utils";

export default function HospitalStatusBadge({
  status,
}: {
  status: HospitalStatus;
}) {
  const config = hospitalStatusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}
