"use client";

import { Badge } from "@/components/ui/badge";
import { PharmacyStatus } from "../types/pharmacyProfile";

export function PharmacyStatusBadge({ status }: { status: PharmacyStatus }) {
  let color: "default" | "secondary" | "destructive" = "default";

  if (status === PharmacyStatus.APPROVED) color = "default";
  if (status === PharmacyStatus.PENDING) color = "secondary";
  if (status === PharmacyStatus.REJECTED) color = "destructive";

  return <Badge variant={color}>{status}</Badge>;
}
