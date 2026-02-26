"use client"

import { AvatarWithFallback } from "../ui"

export function PharmacyHeader({ name }: { name?: string }) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-lg font-semibold">Pharmacy Dashboard</h1>
      <AvatarWithFallback name={name} />
    </header>
  )
}