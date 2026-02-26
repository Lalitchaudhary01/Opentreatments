"use client"

import { BaseCard } from "../../cards"

export function LicenseSection({
  licenseNumber,
  gstNumber,
}: {
  licenseNumber?: string
  gstNumber?: string
}) {
  return (
    <BaseCard>
      <h3 className="mb-4 text-lg font-semibold">License Details</h3>
      <p><strong>License:</strong> {licenseNumber}</p>
      <p><strong>GST:</strong> {gstNumber}</p>
    </BaseCard>
  )
}