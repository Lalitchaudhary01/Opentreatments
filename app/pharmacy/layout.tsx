"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sora } from "next/font/google";

import { PharmacyShell } from "@/features/panel/pharmacy";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function PharmacyLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/auth");
    }
  }, [session, status, router]);

  if (!session) {
    return <p className="p-6 text-sm text-slate-500">Redirecting...</p>;
  }

  return (
    <div className={sora.className}>
      <PharmacyShell>{children}</PharmacyShell>
    </div>
  );
}
