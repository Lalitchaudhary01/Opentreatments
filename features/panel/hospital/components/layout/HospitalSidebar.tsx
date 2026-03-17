"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { hospitalSidebarItems } from "@/features/panel/hospital/constants";

type Props = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function HospitalSidebar({ collapsed = false, onToggleCollapse }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-white/[0.07] bg-[#111827] transition-all duration-200",
        collapsed ? "w-[76px]" : "w-[248px]"
      )}
    >
      <div
        className={cn(
          "flex h-[76px] items-center border-b border-white/[0.07]",
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
            <span className="ml-[1px] text-[13px] font-bold text-[#D2E2F8]">
              Treatment
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[8px] py-2 [scrollbar-width:none]">
        {hospitalSidebarItems.map((group, index) => (
          <div key={`${group.section ?? "main"}-${index}`}>
            {group.section ? (
              <p
                className={cn(
                  "px-2 pb-1 pt-[10px] text-[9px] font-semibold uppercase tracking-[0.1em] text-[#475569]",
                  collapsed && "hidden"
                )}
              >
                {group.section}
              </p>
            ) : null}

            <div className="space-y-[2px]">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const badgeTone =
                  item.badgeTone === "amber"
                    ? "bg-[#f59e0b] text-white"
                    : item.badgeTone === "red"
                      ? "bg-[#ef4444] text-white"
                      : item.badgeTone === "green"
                        ? "bg-[#22c55e] text-[#052e16]"
                        : "bg-[#3b82f6] text-white";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex items-center rounded-[8px] py-2 text-[12.5px] transition-all",
                      collapsed ? "justify-center px-2" : "gap-[9px] px-[10px]",
                      isActive
                        ? "bg-[rgba(59,130,246,.14)] text-[#3b82f6] font-medium"
                        : "text-[#94a3b8] hover:bg-white/[0.05] hover:text-[#f1f5f9]"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive ? (
                      <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-r-[3px] bg-[#3b82f6]" />
                    ) : null}

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

      <div className="border-t border-white/[0.07] px-[10px] py-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "mx-auto flex items-center justify-center border border-white/[0.08] bg-white/[0.06] text-[#94a3b8] transition-colors hover:bg-white/[0.12]",
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
