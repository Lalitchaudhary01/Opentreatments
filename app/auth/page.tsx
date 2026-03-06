"use client";

import nextDynamic from "next/dynamic";
import { Suspense } from "react";

const AuthForm = nextDynamic(() => import("@/features/auth/components/LoginForm"), {
  ssr: false,
  loading: () => <div className="text-sm text-slate-500">Loading auth...</div>,
});

export const dynamic = "force-dynamic"; // ⚡ disables pre-rendering

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Suspense>
        <AuthForm />
      </Suspense>
    </div>
  );
}
