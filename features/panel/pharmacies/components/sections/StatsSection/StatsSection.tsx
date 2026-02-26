"use client"

import { StatCard } from "../../cards"

export function StatsSection({
  totalMedicines,
  totalStock,
}: {
  totalMedicines: number
  totalStock: number
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard label="Total Medicines" value={totalMedicines} />
      <StatCard label="Total Stock" value={totalStock} />
    </div>
  )
}