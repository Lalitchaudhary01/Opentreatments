"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronsLeft, ChevronsRight, Settings, UserCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { doctorSidebarItems } from "../../constants";

type Props = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function DoctorSidebar({ collapsed = false, onToggleCollapse }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-[rgba(255,255,255,0.07)] flex flex-col transition-all duration-200",
        collapsed ? "w-[72px]" : "w-[220px]"
      )}
    >
      <div
        className={cn(
          "border-b border-slate-200 dark:border-[rgba(255,255,255,0.07)] flex items-center h-[76px]",
          collapsed ? "justify-center px-2" : "gap-[10px] px-[18px]"
        )}
      >
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-[10px]")}>
          <Image
            src="/Subtract.svg"
            alt="Open Treatment"
            width={32}
            height={32}
            className="object-contain"
          />
          <div className={cn("leading-none", collapsed && "hidden")}>
            <span className="bg-gradient-to-r from-[#55B685] to-[#39A4EC] bg-clip-text text-transparent text-[13px] font-bold">
              Open
            </span>
            <span className="ml-[1px] text-[13px] font-bold text-slate-700 dark:text-[#D2E2F8]">
              Treatment
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[10px] py-3">
        {doctorSidebarItems.length > 0 ? (
          doctorSidebarItems.map((group, index) => (
            <div key={group.section || index}>
              <p
                className={cn(
                  "text-[9px] font-semibold tracking-[0.1em] uppercase text-slate-500 dark:text-[#475569] px-2 pt-[10px] pb-1",
                  collapsed && "hidden"
                )}
              >
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
                          "relative flex items-center rounded-lg py-2 text-[12.5px] transition-all",
                          collapsed ? "justify-center px-2" : "gap-[9px] px-[10px]",
                          isActive
                            ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6] font-medium"
                            : "font-normal text-slate-500 dark:text-[#94A3B8] hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-[rgba(255,255,255,0.05)] dark:hover:text-[#F1F5F9]"
                        )}
                        title={collapsed ? item.label : undefined}
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
                        <span className={cn("truncate", collapsed && "hidden")}>{item.label}</span>

                        {item.badge && !collapsed ? (
                          <span
                            className={cn(
                              "ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                                  ("badgeTone" in item && item.badgeTone === "amber")
                                ? "bg-[#f59e0b] text-white"
                                : ("badgeTone" in item && item.badgeTone === "amber-dark")
                                  ? "bg-[#f59e0b] text-[#0b1120]"
                                  : "bg-[#3B82F6] text-white"
                            )}
                          >
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
            "relative flex items-center rounded-lg py-2 transition-all text-[12.5px]",
            collapsed ? "justify-center px-2" : "gap-[9px] px-[10px]",
            pathname === "/doctor/profile" || pathname.startsWith("/doctor/profile/")
              ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6] font-medium"
              : "text-slate-500 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-slate-900 dark:hover:text-[#F1F5F9]"
          )}
          title={collapsed ? "Profile" : undefined}
        >
          <UserCircle2 className="h-[15px] w-[15px] shrink-0" />
          <span className={cn("truncate", collapsed && "hidden")}>Profile</span>
        </Link>

        <Link
          href="/doctor/settings"
          className={cn(
            "relative flex items-center rounded-lg py-2 transition-all text-[12.5px]",
            collapsed ? "justify-center px-2" : "gap-[9px] px-[10px]",
            pathname === "/doctor/settings" || pathname.startsWith("/doctor/settings/")
              ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6] font-medium"
              : "text-slate-500 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-slate-900 dark:hover:text-[#F1F5F9]"
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="h-[15px] w-[15px] shrink-0" />
          <span className={cn("truncate", collapsed && "hidden")}>Settings</span>
        </Link>

        <div className="pt-1">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:border-white/[0.07] dark:bg-white/[0.06] dark:text-[#94A3B8] dark:hover:bg-white/[0.12]"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
