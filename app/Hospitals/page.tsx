// app/hospital/dashboard/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Building2 } from "lucide-react";
import { HospitalShell } from "@/features/panel/hospital/components/layout";
import { HospitalDashboard } from "@/features/panel/hospital/screens/dashboard";

export default async function HospitalPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4FAFA] dark:bg-[#0A1414]">
        <Card className="max-w-md shadow-2xl border-2 border-[#00C6D2] backdrop-blur-md bg-white/60 dark:bg-[#102224]/60">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-gradient-to-br from-[#00C6D2] to-teal-500 p-4 shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-[#001B36] dark:text-white">
                  Unauthorized Access
                </h2>
                <p className="text-[#6C7A89] dark:text-gray-400">
                  Only hospitals can access this dashboard.
                </p>
              </div>
              <Link href="/">
                <Button className="bg-gradient-to-r from-[#00C6D2] via-teal-500 to-sky-500 text-white font-bold hover:shadow-xl transition-all duration-300">
                  Return Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <HospitalShell>
      <HospitalDashboard />
    </HospitalShell>
  );
}
