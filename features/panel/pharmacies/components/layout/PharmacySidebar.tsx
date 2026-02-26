"use client"

import Link from "next/link"
import { pharmacySidebarItems } from "../../constants"


export function PharmacySidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="mb-6 text-xl font-bold">Pharmacy Panel</h2>

      <nav className="space-y-3">
        {pharmacySidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded px-3 py-2 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}