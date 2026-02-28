"use client";

import { ReactNode, useEffect, useState } from "react";
import DoctorSidebar from "./DoctorSidebar";
import DoctorHeader from "./DoctorHeader";
import { useDoctorProfile } from "@/features/panel/doctor/hooks/useDoctorProfile";

export default function DoctorShell({ children }: { children: ReactNode }) {
  const { profile } = useDoctorProfile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("doctor-sidebar-collapsed");
    if (saved) setSidebarCollapsed(saved === "1");
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem("doctor-sidebar-collapsed", next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#111827]">
      <DoctorSidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#111827]">
        <div className="sticky top-0 z-40 shrink-0">
          <DoctorHeader profile={profile} />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
