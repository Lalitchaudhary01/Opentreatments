"use client"

import { PharmacyStatus } from "@prisma/client"
import { statusColorMap, statusLabelMap } from "../../../utils"

export function PharmacyStatusBadge({ status }: { status: PharmacyStatus }) {
  const color = statusColorMap[status]

  const colorClasses: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`rounded px-3 py-1 text-sm font-medium ${colorClasses[color]}`}
    >
      {statusLabelMap[status]}
    </span>
  )
}