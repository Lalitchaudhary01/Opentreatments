import { PharmacyStatus } from "@prisma/client"

export const statusLabelMap: Record<PharmacyStatus, string> = {
  PENDING: "Pending Approval",
  APPROVED: "Approved",
  REJECTED: "Rejected",
}

export const statusColorMap: Record<PharmacyStatus, string> = {
  PENDING: "yellow",
  APPROVED: "green",
  REJECTED: "red",
}