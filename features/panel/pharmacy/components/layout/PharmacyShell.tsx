"use client";

import { ReactNode, useEffect, useState } from "react";
import PharmacyHeader from "./PharmacyHeader";
import PharmacySidebar from "./PharmacySidebar";

export default function PharmacyShell({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("pharmacy-sidebar-collapsed");
    if (saved) setSidebarCollapsed(saved === "1");
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem("pharmacy-sidebar-collapsed", next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0B1120]">
      <PharmacySidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0B1120]">
        <div className="sticky top-0 z-40 shrink-0">
          <PharmacyHeader />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
