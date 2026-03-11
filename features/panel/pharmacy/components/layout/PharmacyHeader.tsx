"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Bell, Search, Plus, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { pharmacyRoutes } from "@/features/panel/pharmacy/constants";

type HeaderPageKey =
  | "overview"
  | "inventory"
  | "catalog"
  | "orders"
  | "store"
  | "settings"
  | "default";

function getHeaderPageKey(pathname: string): HeaderPageKey {
  if (
    pathname === "/pharmacy" ||
    pathname.startsWith("/pharmacy/dashboard") ||
    pathname.startsWith("/pharmacy/overview")
  ) {
    return "overview";
  }
  if (pathname.startsWith("/pharmacy/inventory")) return "inventory";
  if (pathname.startsWith("/pharmacy/catalog") || pathname.startsWith("/pharmacy/medicines")) return "catalog";
  if (pathname.startsWith("/pharmacy/orders")) return "orders";
  if (pathname.startsWith("/pharmacy/store") || pathname.startsWith("/pharmacy/profile")) return "store";
  if (pathname.startsWith("/pharmacy/settings")) return "settings";
  return "default";
}

export default function PharmacyHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [roleView, setRoleView] = useState<"owner" | "manager">("owner");

  useEffect(() => {
    setMounted(true);
  }, []);

  const pageKey = useMemo(() => getHeaderPageKey(pathname), [pathname]);

  const title = useMemo(() => {
    if (pageKey === "overview") return "Overview";
    if (pageKey === "inventory") return "Stock & Inventory";
    if (pageKey === "catalog") return "Catalog";
    if (pageKey === "orders") return "Customer Orders";
    if (pageKey === "store") return "Store Profile";
    if (pageKey === "settings") return "Settings";
    return "Pharmacy Panel";
  }, [pageKey]);

  const subtitle = useMemo<ReactNode>(() => {
    if (pageKey === "overview") {
      return (
        <>
          Good morning — <span className="text-[#3b82f6]">Sunrise Pharmacy</span> is open and running
        </>
      );
    }
    if (pageKey === "inventory") return "Batch tracking, expiry control and inward entries";
    if (pageKey === "catalog") return "Medicine master, pricing, GST and tags";
    if (pageKey === "orders") return "Online and walk-in order operations";
    if (pageKey === "store") return "Business and compliance details";
    if (pageKey === "settings") return "Roles, billing preferences and integrations";
    return "Live operations console";
  }, [pageKey]);

  const actionLabel = useMemo(() => {
    if (pageKey === "catalog") return "Add Medicine";
    if (pageKey === "inventory") return "Update Stock";
    return "Update Stock";
  }, [pageKey]);

  const handlePrimaryAction = () => {
    if (pageKey === "catalog") {
      router.push(pharmacyRoutes.addMedicine);
      return;
    }

    if (pageKey === "orders") {
      router.push(pharmacyRoutes.orders);
      return;
    }

    router.push(pharmacyRoutes.inventory);
  };

  return (
    <header className="flex h-[56px] items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 dark:border-white/[0.07] dark:bg-[#111827]">
      <div className="min-w-0">
        <h1 className="truncate text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="truncate text-[11.5px] text-slate-500 dark:text-[#94A3B8]">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-[320px] max-w-[32vw]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#475569]" />
          <input
            placeholder="Search medicine, order, patient..."
            className="h-[34px] w-full rounded-[9px] border border-slate-200 bg-slate-100 pl-9 pr-9 text-[12px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#3b82f6]/40 dark:border-white/[0.07] dark:bg-white/[0.05] dark:text-slate-100 dark:placeholder:text-[#475569]"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#475569]">
            ⌘K
          </span>
        </div>

        <div className="inline-flex items-center gap-1 rounded-full border border-[#14b8a6]/20 bg-[#14b8a6]/10 px-2.5 py-1 text-[11px] font-medium text-[#2dd4bf]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Live
        </div>

        <div className="hidden items-center rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-[2px] sm:flex">
          <button
            type="button"
            onClick={() => setRoleView("owner")}
            className={`rounded-[6px] px-2.5 py-1 text-[11px] font-medium transition ${
              roleView === "owner" ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "text-[#64748B]"
            }`}
          >
            Owner
          </button>
          <button
            type="button"
            onClick={() => setRoleView("manager")}
            className={`rounded-[6px] px-2.5 py-1 text-[11px] font-medium transition ${
              roleView === "manager" ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "text-[#64748B]"
            }`}
          >
            Manager
          </button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-[34px] w-[34px] rounded-[8px] border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-[#94A3B8] dark:hover:bg-white/[0.08]"
        >
          {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative h-[34px] w-[34px] rounded-[8px] border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-[#94A3B8] dark:hover:bg-white/[0.08]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full bg-[#ef4444]" />
        </Button>

        <Button
          type="button"
          onClick={handlePrimaryAction}
          className="h-[34px] rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]"
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          {actionLabel}
        </Button>
      </div>
    </header>
  );
}
