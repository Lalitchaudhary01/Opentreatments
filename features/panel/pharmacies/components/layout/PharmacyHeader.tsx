"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pharmacySidebarItems } from "@/features/panel/pharmacy/constants";

export function PharmacySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-6">Pharmacy Panel</h2>

      <nav className="space-y-2">
        {pharmacySidebarItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
