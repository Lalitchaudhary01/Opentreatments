"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function DoctorLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait for session to load

    // Check if logged in and role is DOCTOR
    if (!session || session.user.role !== "DOCTOR") {
      router.replace("/auth"); // redirect if not authorized
    }
  }, [session, status, router]);

  if (!session || session.user.role !== "DOCTOR") {
    return <p>Redirecting...</p>; // optional loading
  }

  return <>{children}</>; // only DOCTOR can see children
}
