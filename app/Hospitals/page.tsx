// app/hospital/dashboard/page.tsx

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DoctorLogoutButton from "@/components/layout/DoctorLogoutButton";

export default async function HospitalDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          ❌ Unauthorized: Only hospitals can access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
        <p className="text-gray-600">{session.user.email}</p>
        {session.user.phone && (
          <p className="text-gray-600">📞 {session.user.phone}</p>
        )}
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/Hospitals/profile/submit">
            <Button className="w-full">➕ Submit Hospital Profile</Button>
          </Link>
          <Link href="/Hospitals/profile/view">
            <Button className="w-full">👀 View Hospital Profile</Button>
          </Link>
          <Link href="/Hospitals/profile/edit">
            <Button className="w-full">✏️ Edit Hospital Details</Button>
          </Link>
          <Link href="/Hospitals/appointments">
            <Button className="w-full">📅 Manage Appointments</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Logout */}
      <div>
        <DoctorLogoutButton />
      </div>
    </div>
  );
}
