"use client"

import { PharmacySidebar } from "./PharmacySidebar"
import { PharmacyHeader } from "./PharmacyHeader"

export function PharmacyShell({
  children,
  pharmacyName,
}: {
  children: React.ReactNode
  pharmacyName?: string
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <PharmacySidebar />

      <div className="flex flex-1 flex-col">
        <PharmacyHeader name={pharmacyName} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}