"use client";

import { HospitalStatusBadge } from "../ui/badges";

export function HospitalHeader() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-6">
      <div className="font-semibold">Hospital Dashboard</div>
      <HospitalStatusBadge status="PENDING" />
    </header>
  );
}
