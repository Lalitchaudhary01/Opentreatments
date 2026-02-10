"use client";

import Link from "next/link";
import { doctorSidebarItems } from "@/features/panel/doctor/constants";

export default function DoctorSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-white/60 dark:bg-black/20 p-4 border-r border-white/80 dark:border-black/30">
      <div className="px-4 py-4 mb-6 text-xl font-bold">Doctor Panel</div>

      <ul className="flex flex-col gap-2">
        {doctorSidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-muted-foreground hover:bg-[#00C6D2]/10 hover:text-[#00C6D2]"
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
