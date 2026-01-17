"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hospitalSidebarItems } from "../../constants/sidebarItems";

export default function HospitalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r min-h-screen p-4">
      {hospitalSidebarItems.map((item) => {
        const active =
          pathname === item.href ||
          pathname?.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded px-3 py-2 text-sm ${
              active ? "bg-muted font-medium" : "hover:bg-muted"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
