"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AuthCard({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-background text-foreground justify-center items-center relative">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg">
        {children}
      </div>
    </div>
  );
}
