"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Bell, Search, Plus, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorProfile } from "@/features/panel/doctor/types/doctor";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  profile: DoctorProfile | null;
};

type HeaderPageKey =
  | "dashboard"
  | "appointments"
  | "patients"
  | "billing"
  | "revenue"
  | "analytics"
  | "services"
  | "availability"
  | "reviews"
  | "profile"
  | "settings";

function getHeaderPageKey(pathname: string): HeaderPageKey {
  if (pathname === "/doctor" || pathname.startsWith("/doctor/overview")) return "dashboard";
  if (pathname.startsWith("/doctor/appointments")) return "appointments";
  if (pathname.startsWith("/doctor/patients")) return "patients";
  if (pathname.startsWith("/doctor/billing")) return "billing";
  if (pathname.startsWith("/doctor/revenue")) return "revenue";
  if (pathname.startsWith("/doctor/analytics")) return "analytics";
  if (pathname.startsWith("/doctor/services")) return "services";
  if (pathname.startsWith("/doctor/availability")) return "availability";
  if (pathname.startsWith("/doctor/reviews")) return "reviews";
  if (pathname.startsWith("/doctor/profile")) return "profile";
  if (pathname.startsWith("/doctor/settings")) return "settings";
  return "dashboard";
}

export default function DoctorHeader({ profile }: Props) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const pageKey = useMemo(() => getHeaderPageKey(pathname), [pathname]);

  const title = useMemo(() => {
    if (pageKey === "dashboard") {
      return `${greeting}${profile?.name ? `, Dr. ${profile.name}` : ""} 👋`;
    }
    if (pageKey === "appointments") return "Appointments";
    if (pageKey === "patients") return "Patients";
    if (pageKey === "billing") return "Billing & Invoices";
    if (pageKey === "revenue") return "Revenue";
    if (pageKey === "analytics") return "Analytics";
    if (pageKey === "services") return "Services";
    if (pageKey === "availability") return "Availability";
    if (pageKey === "reviews") return "Reviews";
    if (pageKey === "profile") return "My Profile";
    return "Settings";
  }, [greeting, pageKey, profile?.name]);

  const subtitle = useMemo<ReactNode>(() => {
    const fullDate = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const shortDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (pageKey === "dashboard") {
      return (
        <>
          {fullDate}
          <span className="mx-1">·</span>
          <span className="text-[#3b82f6]">12 appointments today</span>
        </>
      );
    }
    if (pageKey === "appointments") return `Today, ${shortDate}`;
    if (pageKey === "patients") {
      return (
        <>
          <span className="text-[#3b82f6]">1,284 registered</span>
          <span className="mx-1">·</span>
          Sunrise Clinic
        </>
      );
    }
    if (pageKey === "billing") return "February 2026";
    if (pageKey === "revenue") {
      return (
        <>
          Sunrise Clinic
          <span className="mx-1">·</span>
          <span className="text-[#3b82f6]">February 2026</span>
        </>
      );
    }
    if (pageKey === "analytics") return "Trends & insights";
    if (pageKey === "services") {
      return (
        <>
          Manage your <span className="text-[#3b82f6]">offered services</span>
          <span className="mx-1">·</span>
          Sunrise Clinic
        </>
      );
    }
    if (pageKey === "availability") {
      return (
        <>
          Manage your <span className="text-[#3b82f6]">schedule & working hours</span>
        </>
      );
    }
    if (pageKey === "reviews") {
      return (
        <>
          Patient feedback
          <span className="mx-1">·</span>
          <span className="text-[#3b82f6]">4.8★ overall</span>
        </>
      );
    }
    if (pageKey === "profile") {
      return (
        <>
          Dr. {profile?.name || "Doctor"}
          <span className="mx-1">·</span>
          <span className="text-[#3b82f6]">{profile?.specialization || "General Physician"}</span>
        </>
      );
    }
    return "Preferences and account configuration";
  }, [pageKey, profile?.name, profile?.specialization]);

  const ctaLabel = useMemo(() => {
    if (pageKey === "patients") return "Add Patient";
    if (pageKey === "billing") return "New Invoice";
    if (pageKey === "services") return "Add Service";
    if (pageKey === "revenue" || pageKey === "analytics") return "Export Report";
    if (pageKey === "reviews") return "Export Reviews";
    if (pageKey === "availability" || pageKey === "profile" || pageKey === "settings") return "Save Changes";
    return "New Appointment";
  }, [pageKey]);

  const handlePrimaryAction = () => {
    if (pageKey === "appointments") {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("new", "1");
      router.push(`/doctor/appointments?${params.toString()}`);
      return;
    }

    if (pageKey === "patients") {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("new", "1");
      router.push(`/doctor/patients?${params.toString()}`);
    }
  };

  return (
    <header className="flex items-center justify-between px-7 py-3.5 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-white/[0.07]">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>

        <p className="text-sm text-slate-500 dark:text-[#94a3b8]">{subtitle}</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* Search Input - Figma: width 200px, height 33px */}
        <div className="flex items-center w-[200px] h-[33px] rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/[0.07] focus-within:border-slate-300 dark:focus-within:border-white/20 transition-colors">
          <div className="pl-3 text-slate-400 dark:text-[#475569]">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            className="flex-1 h-full px-3 text-sm bg-transparent outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#475569]"
            placeholder="Search patients..."
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-[41px] h-[29px] rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-white"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Bell Button - Figma: 41px x 29px */}
        <Button 
          variant="ghost" 
          size="icon"
          className="w-[41px] h-[29px] rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-white"
        >
          <Bell className="w-4 h-4" />
        </Button>

        {/* Primary Action */}
        <Button 
          type="button"
          onClick={handlePrimaryAction}
          className="h-[29px] px-3 rounded-lg bg-[#3b82f6] hover:bg-blue-600 text-white text-sm font-normal gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          {ctaLabel}
        </Button>
      </div>
    </header>
  );
}
