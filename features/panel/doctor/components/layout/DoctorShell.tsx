"use client";

import { ReactNode } from "react";
import DoctorSidebar from "./DoctorSidebar";
import DoctorHeader from "./DoctorHeader";
import { useDoctorProfile } from "@/features/panel/doctor/hooks/useDoctorProfile";

export default function DoctorShell({ children }: { children: ReactNode }) {
  const { profile } = useDoctorProfile();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DoctorSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <DoctorHeader profile={profile} />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
