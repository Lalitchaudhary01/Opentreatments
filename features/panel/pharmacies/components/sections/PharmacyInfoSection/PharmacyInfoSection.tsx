"use client"

import { BaseCard } from "../../cards"

export function PharmacyInfoSection({
  address,
  phone,
  email,
}: {
  address?: string
  phone?: string
  email?: string
}) {
  return (
    <BaseCard>
      <h3 className="mb-4 text-lg font-semibold">Pharmacy Info</h3>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Email:</strong> {email}</p>
    </BaseCard>
  )
}