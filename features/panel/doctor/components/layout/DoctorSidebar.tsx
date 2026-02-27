"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { doctorSidebarItems } from "../../constants";

export default function DoctorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-[#0B1739] text-slate-300 p-6 flex flex-col">
      
      {/* 🔹 Logo Section */}
      <div className="mb-10">
        <Link href="/doctor/dashboard" className="flex items-center gap-3">
          {/* Replace src with your logo path */}
          <Image
            src="/logo.png"
            alt="App Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-white">
            OpenTreatment
          </span>
        </Link>
      </div>

      {/* 🔹 Sidebar Items */}
      <div className="flex-1 overflow-y-auto">
        {doctorSidebarItems.map((group) => (
          <div key={group.section} className="mb-8">
            
            <p className="text-xs tracking-widest text-slate-500 mb-4">
              {group.section}
            </p>

            <div className="space-y-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative flex items-center justify-between px-4 py-3 rounded-2xl transition-all",
                      isActive
                        ? "bg-[#132350] text-blue-400"
                        : "hover:bg-[#101E45] text-slate-400"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-full" />
                    )}

                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="text-lg">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "text-xs px-3 py-1 rounded-full font-semibold",
                          item.badgeColor === "orange"
                            ? "bg-orange-500 text-white"
                            : "bg-blue-500 text-white"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </aside>
  );
}