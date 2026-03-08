"use client";

import { Badge } from "@/components/ui/badge";

type PharmacyStatusValue = "PENDING" | "APPROVED" | "REJECTED";

export function PharmacyStatusBadge({ status }: { status: PharmacyStatusValue }) {
  let color: "default" | "secondary" | "destructive" = "default";

  if (status === "APPROVED") color = "default";
  if (status === "PENDING") color = "secondary";
  if (status === "REJECTED") color = "destructive";

  return <Badge variant={color}>{status}</Badge>;
}
