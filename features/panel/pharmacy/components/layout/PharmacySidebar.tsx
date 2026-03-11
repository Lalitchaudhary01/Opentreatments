"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { pharmacySidebarItems } from "@/features/panel/pharmacy/constants";

type Props = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function PharmacySidebar({ collapsed = false, onToggleCollapse }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-200 dark:border-white/[0.07] dark:bg-[#111827]",
        collapsed ? "w-[76px]" : "w-[240px]"
      )}
    >
      <div
        className={cn(
          "flex h-[74px] items-center border-b border-slate-200 dark:border-white/[0.07]",
          collapsed ? "justify-center px-2" : "gap-[10px] px-[16px]"
        )}
      >
        <Image src="/Subtract.svg" alt="Open Treatment" width={32} height={32} className="object-contain" />

        <div className={cn("leading-none", collapsed && "hidden")}>
          <span className="text-[13px] font-bold text-slate-800 dark:text-[#E2E8F0]">Open Treatment</span>
          <p className="mt-1 text-[10px] text-slate-500 dark:text-[#64748B]">Pharmacy Panel</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8px] py-3">
        {pharmacySidebarItems.map((group, index) => (
          <div key={group.section || index}>
            <p
              className={cn(
                "px-2 pb-1 pt-[10px] text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-[#475569]",
                collapsed && "hidden"
              )}
            >
              {group.section}
            </p>

            <div className="space-y-[1px]">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const badgeTone =
                  item.badgeTone === "amber"
                    ? "bg-[#f59e0b] text-[#0b1120]"
                    : item.badgeTone === "teal"
                      ? "bg-[#14b8a6] text-white"
                      : item.badgeTone === "red"
                        ? "bg-[#ef4444] text-white"
                        : "bg-[#3B82F6] text-white";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex items-center rounded-lg py-2 text-[12.5px] transition-all",
                      collapsed ? "justify-center px-2" : "gap-[9px] px-[10px]",
                      isActive
                        ? "bg-[rgba(59,130,246,0.14)] text-[#3B82F6] font-medium"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:bg-white/[0.05] dark:hover:text-[#F1F5F9]"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-[#3B82F6] rounded-r-[3px]" />
                    )}

                    <Icon className={cn("h-[15px] w-[15px] shrink-0", isActive ? "opacity-100" : "opacity-70")} />
                    <span className={cn("truncate", collapsed && "hidden")}>{item.label}</span>

                    {item.badge && !collapsed ? (
                      <span className={cn("ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-bold", badgeTone)}>
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 px-[10px] py-3 dark:border-white/[0.07]">
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "mx-auto flex items-center justify-center border border-slate-200 bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-[#94A3B8] dark:hover:bg-white/[0.12]",
            collapsed ? "h-8 w-8 rounded-full" : "h-8 w-full rounded-lg gap-1.5 px-3 text-[11.5px] font-medium"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <span className="text-[12px] leading-none">&lt;</span>
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
