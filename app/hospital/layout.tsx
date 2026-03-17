"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sora } from "next/font/google";

import { HospitalShell } from "@/features/panel/hospital/components/layout";
import PanelLoadingScreen from "@/components/layout/PanelLoadingScreen";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function HospitalLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/auth");
      return;
    }
    if (session.user.role !== "HOSPITAL") {
      router.replace("/auth");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <PanelLoadingScreen
        title="Loading Hospital Panel"
        subtitle="Syncing hospital profile and preparing dashboard"
      />
    );
  }

  if (!session || session.user.role !== "HOSPITAL") {
    return (
      <PanelLoadingScreen
        title="Redirecting to Login"
        subtitle="Please wait while we route you securely"
      />
    );
  }

  return <div className={sora.className}><HospitalShell>{children}</HospitalShell></div>;
}
