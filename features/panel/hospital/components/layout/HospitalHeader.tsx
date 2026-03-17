"use client";

import { useMemo } from "react";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";

type HeaderPageKey =
  | "overview"
  | "appointments"
  | "patients"
  | "services"
  | "billing"
  | "reviews"
  | "analytics"
  | "settings"
  | "profile"
  | "default";

function getHeaderPageKey(pathname: string): HeaderPageKey {
  if (pathname.startsWith("/hospital/dashboard")) return "overview";
  if (pathname.startsWith("/hospital/appointments")) return "appointments";
  if (pathname.startsWith("/hospital/patients")) return "patients";
  if (pathname.startsWith("/hospital/services")) return "services";
  if (pathname.startsWith("/hospital/billing")) return "billing";
  if (pathname.startsWith("/hospital/reviews")) return "reviews";
  if (pathname.startsWith("/hospital/analytics")) return "analytics";
  if (pathname.startsWith("/hospital/settings")) return "settings";
  if (pathname.startsWith("/hospital/profile")) return "profile";
  return "default";
}

function formatDateLabel() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

export default function HospitalHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const pageKey = useMemo(() => getHeaderPageKey(pathname), [pathname]);
  const dateLabel = useMemo(() => formatDateLabel(), []);

  const title = useMemo(() => {
    if (pageKey === "overview") return "Hospital Overview";
    if (pageKey === "appointments") return "Appointments";
    if (pageKey === "patients") return "Patients";
    if (pageKey === "services") return "Services & Pricing";
    if (pageKey === "billing") return "Billing & Payments";
    if (pageKey === "reviews") return "Reviews & Ratings";
    if (pageKey === "analytics") return "Analytics";
    if (pageKey === "settings") return "Settings";
    if (pageKey === "profile") return "Profile";
    return "Hospital Panel";
  }, [pageKey]);

  return (
    <header className="flex h-[56px] items-center gap-3 border-b border-white/[0.07] bg-[#111827] px-6">
      <div className="min-w-0">
        <h1 className="truncate text-[16px] font-semibold tracking-[-0.02em] text-[#f1f5f9]">{title}</h1>
        <p className="truncate text-[11.5px] text-[#94a3b8]">
          {dateLabel} · <span className="font-medium text-[#14b8a6]">{session?.user?.name ?? "Hospital Admin"}</span>
        </p>
      </div>

      <div className="relative ml-3 w-[300px] max-w-[28vw]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#475569]" />
        <input
          placeholder="Search appointments, patients..."
          className="h-[34px] w-full rounded-[9px] border border-white/[0.07] bg-white/[0.05] pl-9 pr-3 text-[12px] text-[#e2e8f0] outline-none placeholder:text-[#475569] focus:border-[#3b82f6]/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="inline-flex items-center gap-1 rounded-full border border-[#14b8a6]/20 bg-[#14b8a6]/10 px-2.5 py-1 text-[11px] font-medium text-[#2dd4bf]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Synced
        </div>

        <ThemeToggleButton variant="circle" start="top-left" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative h-[34px] w-[34px] rounded-[8px] border border-white/[0.07] bg-white/[0.04] text-[#94a3b8] hover:bg-white/[0.08]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full bg-[#ef4444]" />
        </Button>
      </div>
    </header>
  );
}
