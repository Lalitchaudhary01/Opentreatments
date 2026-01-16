"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hospitalSidebarItems } from "../../constants/sidebarItems";

export function HospitalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r p-4 space-y-2">
      <div className="text-xl font-bold mb-4">Hospital Panel</div>

      {hospitalSidebarItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded px-3 py-2 text-sm ${
              active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
