"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sora } from "next/font/google";

import PanelLoadingScreen from "@/components/layout/PanelLoadingScreen";
import { LabShell } from "@/features/panel/lab";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function LabLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/auth");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <PanelLoadingScreen
        title="Loading Lab Panel"
        subtitle="Syncing profile and preparing diagnostics console"
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

  return (
    <div className={sora.className}>
      <LabShell>{children}</LabShell>
    </div>
  );
}
