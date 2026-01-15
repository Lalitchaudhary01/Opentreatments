"use client";

import { Badge } from "@/components/ui/badge";
import { statusConfig } from "@/features/panel/doctor/utils/statusConfig";
import { DoctorStatus } from "@prisma/client";

export default function DoctorStatusBadge({
  status,
}: {
  status: DoctorStatus;
}) {
  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <Badge className={`${config.color} border font-semibold px-3 py-1`}>
      {config.label}
    </Badge>
  );
}
