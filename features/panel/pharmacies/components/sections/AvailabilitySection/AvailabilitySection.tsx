"use client"

import { BaseCard } from "../../cards"

export function AvailabilitySection({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BaseCard>
      <h3 className="mb-4 text-lg font-semibold">Availability</h3>
      {children}
    </BaseCard>
  )
}