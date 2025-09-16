"use client";

import { Badge } from "@/components/ui/badge";
import { DoctorStatus } from "../types/doctorProfile";

export default function DoctorStatusBadge({
  status,
}: {
  status: DoctorStatus;
}) {
  switch (status) {
    case "APPROVED":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">APPROVED</Badge>
      );
    case "REJECTED":
      return <Badge className="bg-red-500 hover:bg-red-600">REJECTED</Badge>;
    default:
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">PENDING</Badge>
      );
  }
}
