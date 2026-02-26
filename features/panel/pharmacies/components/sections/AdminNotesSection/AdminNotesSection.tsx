"use client"

import { BaseCard } from "../../cards"

export function AdminNotesSection({
  notes,
}: {
  notes?: string
}) {
  return (
    <BaseCard>
      <h3 className="mb-4 text-lg font-semibold">Admin Notes</h3>
      <p>{notes || "No notes available"}</p>
    </BaseCard>
  )
}