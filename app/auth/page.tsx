"use client";

import AuthForm from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

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
