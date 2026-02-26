"use client"

import { BaseCard } from "./BaseCard"

export function StatCard({
  label,
  value,
}: {
  label: string
  value: number | string
}) {
  return (
    <BaseCard>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </BaseCard>
  )
}