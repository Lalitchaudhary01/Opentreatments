"use client";

import { ReactNode } from "react";
import DoctorSidebar from "./DoctorSidebar";
import DoctorHeader from "./DoctorHeader";

export default function DoctorShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DoctorSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <DoctorHeader />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
