"use client";

import { DoctorShell } from "@/features/panel/doctor/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Sora } from "next/font/google";
import PanelLoadingScreen from "@/components/layout/PanelLoadingScreen";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function DoctorLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait for session to load

    // Check only authentication here; role/profile checks happen in server pages.
    if (!session) {
      router.replace("/auth"); // redirect if not authorized
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <PanelLoadingScreen
        title="Loading Doctor Panel"
        subtitle="Verifying your account and preparing your dashboard"
      />
    );
  }

  if (!session) {
    return (
      <PanelLoadingScreen
        title="Redirecting to Login"
        subtitle="Please wait while we route you securely"
      />
    );
  }

  return <div className={sora.className}><DoctorShell>{children}</DoctorShell></div>;
}
