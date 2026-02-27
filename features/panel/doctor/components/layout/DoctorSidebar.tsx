"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { doctorSidebarItems } from "../../constants";

export default function DoctorSidebar() {
  const pathname = usePathname();

  // Debug: Check if doctorSidebarItems exists
  console.log("doctorSidebarItems:", doctorSidebarItems);

  return (
    <aside className="w-64 h-screen bg-[#111827] border-r border-[rgba(255,255,255,0.07)] flex flex-col">
      
      {/* Logo Section */}
      <div className="h-[90px] border-b border-[rgba(255,255,255,0.07)] flex items-center px-5">
        <div className="flex items-center gap-4">
          <Image
            src="/Subtract.svg"
            alt="Open Treatment"
            width={45}
            height={45}
            className="object-contain"
          />
          <div className="font-['Plus_Jakarta_Sans'] leading-tight">
            <span className="bg-gradient-to-r from-[#55B685] to-[#39A4EC] bg-clip-text text-transparent text-2xl font-bold">
              Open
            </span>
            <br />
            <span className="text-[#D2E2F8] text-2xl font-bold">Treatment</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-8 px-4 relative">
        {doctorSidebarItems && doctorSidebarItems.length > 0 ? (
          doctorSidebarItems.map((group, index) => (
            <div key={group.section || index} className="mb-8">
              <p className="text-[10px] font-semibold tracking-[1px] uppercase text-[#475569] px-3 mb-4">
                {group.section}
              </p>

              <div className="space-y-1.5">
                {group.items && group.items.length > 0 ? (
                  group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "relative flex items-center justify-between px-4 py-3 rounded-lg transition-all text-[14px]",
                          isActive 
                            ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6]" 
                            : "text-[#94A3B8] hover:bg-[#1E293B]"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[20px] bg-[#3B82F6] rounded-r-full" />
                        )}

                        <div className="flex items-center gap-4">
                          <Icon className="h-[18px] w-[18px] opacity-80" />
                          <span className="font-medium">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={cn(
                              "text-[11px] font-bold px-[8px] py-[3px] rounded-full",
                              "bg-[#3B82F6] text-white"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-[#94A3B8] px-4">No items</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#94A3B8] p-4">Loading sidebar...</div>
        )}
      </div>
    </aside>
  );
}