"use client";

import Hero from "@/features/home/components/Hero";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // Role check
    if (!session || session.user.role !== "USER") {
      if (session?.user.role === "DOCTOR") {
        router.replace("/doctor"); // DOCTOR ko doctor route pe bhejo
      } else {
        router.replace("/auth"); // not logged in
      }
    }
  }, [session, status, router]);

  if (!session || session.user.role !== "USER") {
    return <p>Redirecting...</p>; // loading / redirect state
  }

  return (
    <div>
      <Hero />
    </div>
  );
}
