"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Plus, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { labRoutes } from "@/features/panel/lab/constants";
import { useTheme } from "next-themes";

type HeaderPageKey =
  | "overview"
  | "orders"
  | "collection"
  | "processing"
  | "reports"
  | "patients"
  | "catalog"
  | "billing"
  | "logistics"
  | "analytics"
  | "settings"
  | "default";

function getHeaderPageKey(pathname: string): HeaderPageKey {
  if (pathname === "/lab" || pathname.startsWith("/lab/overview")) return "overview";
  if (pathname.startsWith("/lab/orders")) return "orders";
  if (pathname.startsWith("/lab/collection")) return "collection";
  if (pathname.startsWith("/lab/processing")) return "processing";
  if (pathname.startsWith("/lab/reports")) return "reports";
  if (pathname.startsWith("/lab/patients")) return "patients";
  if (pathname.startsWith("/lab/catalog")) return "catalog";
  if (pathname.startsWith("/lab/billing")) return "billing";
  if (pathname.startsWith("/lab/logistics")) return "logistics";
  if (pathname.startsWith("/lab/analytics")) return "analytics";
  if (pathname.startsWith("/lab/settings")) return "settings";
  return "default";
}

export default function LabHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [roleView, setRoleView] = useState<"owner" | "manager">("owner");

  const pageKey = useMemo(() => getHeaderPageKey(pathname), [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const title = useMemo(() => {
    if (pageKey === "overview") return "Dashboard";
    if (pageKey === "orders") return "All Orders";
    if (pageKey === "collection") return "Sample Collection";
    if (pageKey === "processing") return "Sample Processing";
    if (pageKey === "reports") return "Reports";
    if (pageKey === "patients") return "Patients";
    if (pageKey === "catalog") return "Test Catalog";
    if (pageKey === "billing") return "Billing & Payments";
    if (pageKey === "logistics") return "Logistics";
    if (pageKey === "analytics") return "Reports & Analytics";
    if (pageKey === "settings") return "Settings";
    return "Laboratory Panel";
  }, [pageKey]);

  const subtitle = useMemo(() => {
    if (pageKey === "overview") return "Good morning — your diagnostics dashboard is live";
    if (pageKey === "orders") return "Track incoming test orders and status";
    if (pageKey === "collection") return "Manage sample pickup and collection queue";
    if (pageKey === "processing") return "Track in-lab processing and TAT";
    if (pageKey === "reports") return "Upload and verify reports";
    if (pageKey === "patients") return "Patient records and test history";
    if (pageKey === "catalog") return "Manage test catalog and pricing";
    if (pageKey === "billing") return "Invoices, settlements and payments";
    if (pageKey === "logistics") return "Field logistics and route operations";
    if (pageKey === "analytics") return "Operational and revenue insights";
    if (pageKey === "settings") return "Manage notification and workflow settings";
    return "Operations console";
  }, [pageKey]);

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search booking, test, patient..."
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
          onClick={() => router.push(pageKey === "catalog" ? labRoutes.catalog : labRoutes.orders)}
          className="h-[34px] rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]"
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          {pageKey === "catalog" ? "Add Test" : "Open Orders"}
        </Button>
      </div>
    </header>
  );
}
