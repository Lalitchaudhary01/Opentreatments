"use client";

import { ReactNode, useEffect, useState } from "react";
import LabHeader from "./LabHeader";
import LabSidebar from "./LabSidebar";

export default function LabShell({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("lab-sidebar-collapsed");
    if (saved) setSidebarCollapsed(saved === "1");
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem("lab-sidebar-collapsed", next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className="lab-theme flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#0B1120]">
      <LabSidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <main className="flex h-screen flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-[#0B1120]">
        <div className="sticky top-0 z-40 shrink-0">
          <LabHeader />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
