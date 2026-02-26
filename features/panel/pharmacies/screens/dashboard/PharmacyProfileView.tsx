"use client"

import { usePharmacyProfile } from "@/features/panel/pharmacy/hooks"

export function PharmacyProfileView() {
  const { profile, loading } = usePharmacyProfile()

  if (loading || !profile) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Profile Details</h2>

      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Owner:</strong> {profile.ownerName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Status:</strong> {profile.status}</p>
    </div>
  )
}