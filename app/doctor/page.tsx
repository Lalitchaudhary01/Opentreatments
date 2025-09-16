// app/doctor/dashboard/page.tsx

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoctorLogoutButton from "@/components/layout/DoctorLogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DoctorDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "DOCTOR") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          ❌ Unauthorized: Only doctors can access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Welcome, Dr. {session.user.name}</h1>
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
          <Link href="/doctor/profile/submit">
            <Button className="w-full">➕ Submit Profile</Button>
          </Link>
          <Link href="/doctor/profile/view">
            <Button className="w-full">👀 View Profile</Button>
          </Link>
          <Link href="/doctor/profile/edit">
            <Button className="w-full">✏️ Edit Profile</Button>
          </Link>
          <Link href="/doctor/consultations">
            <Button className="w-full">📅 Consultations</Button>
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
