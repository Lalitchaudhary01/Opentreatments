import { PharmacyStatus } from "@prisma/client";

export const pharmacyStatusConfig: Record<
  PharmacyStatus,
  { label: string; color: string }
> = {
  PENDING: { label: "Pending", color: "yellow" },
  APPROVED: { label: "Approved", color: "green" },
  REJECTED: { label: "Rejected", color: "red" },
};
