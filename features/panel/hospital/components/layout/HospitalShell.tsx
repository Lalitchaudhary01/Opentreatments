import { ReactNode } from "react";
import HospitalSidebar from "./HospitalSidebar";
import { HospitalHeader } from "./HospitalHeader";

export default function HospitalShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <HospitalSidebar />
      <div className="flex-1 flex flex-col">
        <HospitalHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
