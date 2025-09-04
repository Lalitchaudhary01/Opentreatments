"use client";

import AuthForm from "@/features/auth/components/LoginForm";

export const dynamic = "force-dynamic"; // ⚡ disables pre-rendering

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm />
    </div>
  );
}
