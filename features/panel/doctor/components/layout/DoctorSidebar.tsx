"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { doctorSidebarItems } from "../../constants";

export default function DoctorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen bg-[#111827] border-r border-[rgba(255,255,255,0.07)] flex flex-col">
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

      <div className="flex-1 overflow-y-auto px-[10px] py-3">
        {doctorSidebarItems.length > 0 ? (
          doctorSidebarItems.map((group, index) => (
            <div key={group.section || index} className="mb-3">
              <p className="text-[9px] font-semibold tracking-[0.1em] uppercase text-[#475569] px-2 pt-[10px] pb-1">
                {group.section}
              </p>

              <div className="space-y-[1px]">
                {group.items.length > 0 ? (
                  group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "relative flex items-center gap-[9px] px-[10px] py-2 rounded-lg transition-all text-[12.5px]",
                          isActive
                            ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6] font-medium"
                            : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#F1F5F9]"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-[#3B82F6] rounded-r-[3px]" />
                        )}

                        <Icon
                          className={cn(
                            "h-[15px] w-[15px] shrink-0",
                            isActive ? "opacity-100" : "opacity-70"
                          )}
                        />
                        <span className="truncate">{item.label}</span>

                        {item.badge ? (
                          <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#3B82F6] text-white">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-[#94A3B8] px-3 py-2 text-xs">No items</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#94A3B8] p-4 text-sm">Loading sidebar...</div>
        )}
      </div>

      <div className="px-[10px] py-3 border-t border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center gap-[9px] px-2 py-[7px] rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer">
          <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            DR
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#F1F5F9] truncate">
              Doctor Panel
            </p>
            <p className="text-[10px] text-[#475569] truncate">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
