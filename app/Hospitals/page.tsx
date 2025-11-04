// app/hospital/dashboard/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DoctorLogoutButton from "@/components/layout/DoctorLogoutButton";
import {
  Building2,
  FileText,
  Eye,
  Edit3,
  Calendar,
  Mail,
  Phone,
  Activity,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default async function HospitalDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="max-w-md shadow-2xl border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-gray-100 p-4 border-2 border-gray-300">
                <Building2 className="h-8 w-8 text-gray-700" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Unauthorized Access
                </h2>
                <p className="text-gray-600">
                  Only hospitals can access this dashboard.
                </p>
              </div>
              <Link href="/">
                <Button variant="outline" className="border-gray-300">
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6 space-y-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-gray-900 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-black p-3 shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Welcome back!
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  {session.user.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 ml-16">
              {session.user.email && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 px-3 py-1.5 border-gray-300"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {session.user.email}
                </Badge>
              )}
              {session.user.phone && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 px-3 py-1.5 border-gray-300"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {session.user.phone}
                </Badge>
              )}
            </div>
          </div>
          <DoctorLogoutButton />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                    Total Patients
                  </p>
                  <h3 className="text-4xl font-bold mt-2 text-gray-900">
                    1,234
                  </h3>
                </div>
                <Users className="h-12 w-12 text-gray-900" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-900 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                    Appointments
                  </p>
                  <h3 className="text-4xl font-bold mt-2">89</h3>
                </div>
                <Calendar className="h-12 w-12 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                    Active Now
                  </p>
                  <h3 className="text-4xl font-bold mt-2 text-gray-900">42</h3>
                </div>
                <Activity className="h-12 w-12 text-gray-900" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-900 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                    Avg. Wait Time
                  </p>
                  <h3 className="text-4xl font-bold mt-2">15m</h3>
                </div>
                <Clock className="h-12 w-12 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-2 border-gray-900 shadow-xl bg-white">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-2xl flex items-center gap-2 text-gray-900">
              <TrendingUp className="h-6 w-6" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-base">
              Manage your hospital profile and appointments
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <Link href="/hospitals/profile/submit" className="group">
              <Card className="h-full border-2 border-gray-300 hover:border-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="rounded-lg bg-gray-900 p-3 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">
                        Submit Profile
                      </h3>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Create and submit your hospital profile
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/hospitals/profile/view" className="group">
              <Card className="h-full border-2 border-gray-300 hover:border-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="rounded-lg bg-gray-900 p-3 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">
                        View Profile
                      </h3>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Review your hospital information
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/hospitals/profile/edit" className="group">
              <Card className="h-full border-2 border-gray-300 hover:border-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="rounded-lg bg-gray-900 p-3 group-hover:scale-110 transition-transform duration-300">
                    <Edit3 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">
                        Edit Details
                      </h3>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Update your hospital information
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/hospitals/appointments" className="group">
              <Card className="h-full border-2 border-gray-300 hover:border-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="rounded-lg bg-gray-900 p-3 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">
                        Appointments
                      </h3>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Manage patient appointments
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
