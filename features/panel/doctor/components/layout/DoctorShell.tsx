"use client";

import { ReactNode } from "react";
import DoctorSidebar from "./DoctorSidebar";
import DoctorHeader from "./DoctorHeader";
import { useDoctorProfile } from "@/features/panel/doctor/hooks/useDoctorProfile";

export default function DoctorShell({ children }: { children: ReactNode }) {
  const { profile } = useDoctorProfile();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#111827]">
      <DoctorSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#111827]">
        <div className="sticky top-0 z-40 shrink-0">
          <DoctorHeader profile={profile} />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
