"use client";

import { ReactNode, useEffect, useState } from "react";
import HospitalHeader from "./HospitalHeader";
import HospitalSidebar from "./HospitalSidebar";

export default function HospitalShell({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("hospital-sidebar-collapsed");
    if (saved) setSidebarCollapsed(saved === "1");
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem("hospital-sidebar-collapsed", next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className="hospital-theme flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#0b1120]">
      <HospitalSidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <main className="flex h-screen flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-[#0b1120]">
        <div className="sticky top-0 z-40 shrink-0">
          <HospitalHeader />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
