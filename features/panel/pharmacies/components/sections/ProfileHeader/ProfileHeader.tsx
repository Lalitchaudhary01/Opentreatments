"use client"

import { PharmacyStatusBadge } from "../../ui"

export function ProfileHeader({
  name,
  status,
}: {
  name: string
  status: any
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <PharmacyStatusBadge status={status} />
      </div>
    </div>
  )
}