"use client";

import { ReactNode } from "react";

export default function GradientCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm backdrop-blur-md bg-gradient-to-br from-[#00C6D2]/20 to-teal-500/20 border border-white/50 dark:border-white/10 ${className}`}
    >
      {children}
    </div>
  );
}
