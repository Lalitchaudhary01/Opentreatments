"use client";

import { ReactNode } from "react";

export default function SectionStatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 flex items-start justify-between">
      <div>
        <p className="text-sm font-bold text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#00C6D2]/10 text-[#00C6D2]">
        {icon}
      </div>
    </div>
  );
}
