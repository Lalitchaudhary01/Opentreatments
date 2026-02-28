"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Settings, UserCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { doctorSidebarItems } from "../../constants";

export default function DoctorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-[rgba(255,255,255,0.07)] flex flex-col">
      <div className="border-b border-slate-200 dark:border-[rgba(255,255,255,0.07)] flex items-center gap-[10px] px-[18px] pt-5 pb-4">
        <div className="flex items-center gap-[10px]">
          <Image
            src="/Subtract.svg"
            alt="Open Treatment"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="leading-tight">
            <span className="bg-gradient-to-r from-[#55B685] to-[#39A4EC] bg-clip-text text-transparent text-2xl font-bold">
              Open
            </span>
            <br />
            <span className="text-slate-700 dark:text-[#D2E2F8] text-2xl font-bold">
              Treatment
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[10px] py-3">
        {doctorSidebarItems.length > 0 ? (
          doctorSidebarItems.map((group, index) => (
            <div key={group.section || index}>
              <p className="text-[9px] font-semibold tracking-[0.1em] uppercase text-slate-500 dark:text-[#475569] px-2 pt-[10px] pb-1">
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
                            : "text-slate-500 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-slate-900 dark:hover:text-[#F1F5F9]"
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
                  <p className="text-slate-500 dark:text-[#94A3B8] px-3 py-2 text-xs">
                    No items
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-500 dark:text-[#94A3B8] p-4 text-sm">
            Loading sidebar...
          </div>
        )}
      </div>

      <div className="px-[10px] py-3 border-t border-slate-200 dark:border-[rgba(255,255,255,0.07)] space-y-1.5">
        <Link
          href="/doctor/profile"
          className={cn(
            "relative flex items-center gap-[9px] px-[10px] py-2 rounded-lg transition-all text-[12.5px]",
            pathname === "/doctor/profile" || pathname.startsWith("/doctor/profile/")
              ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6] font-medium"
              : "text-slate-500 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-slate-900 dark:hover:text-[#F1F5F9]"
          )}
        >
          <UserCircle2 className="h-[15px] w-[15px] shrink-0" />
          <span className="truncate">Profile</span>
        </Link>

        <Link
          href="/doctor/settings"
          className={cn(
            "relative flex items-center gap-[9px] px-[10px] py-2 rounded-lg transition-all text-[12.5px]",
            pathname === "/doctor/settings" || pathname.startsWith("/doctor/settings/")
              ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6] font-medium"
              : "text-slate-500 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-slate-900 dark:hover:text-[#F1F5F9]"
          )}
        >
          <Settings className="h-[15px] w-[15px] shrink-0" />
          <span className="truncate">Settings</span>
        </Link>

        <div className="flex items-center gap-[9px] px-2 py-[7px] rounded-lg hover:bg-slate-100 dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer mt-1.5">
          <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            DR
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-900 dark:text-[#F1F5F9] truncate">
              Doctor Panel
            </p>
            <p className="text-[10px] text-slate-500 dark:text-[#475569] truncate">
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
