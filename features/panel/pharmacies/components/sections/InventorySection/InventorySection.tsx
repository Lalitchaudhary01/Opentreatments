"use client"

import { BaseCard } from "../../cards"

export function InventorySection({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BaseCard>
      <h3 className="mb-4 text-lg font-semibold">Inventory</h3>
      {children}
    </BaseCard>
  )
}