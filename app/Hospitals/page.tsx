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
  Sparkles,
} from "lucide-react";
import Header from "@/components/layout/Header";

export default async function HospitalDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <Card className="max-w-md shadow-2xl border-2 border-cyan-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 p-4 shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                  Unauthorized Access
                </h2>
                <p className="text-slate-600">
                  Only hospitals can access this dashboard.
                </p>
              </div>
              <Link href="/">
                <Button className="bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500 text-white font-bold hover:shadow-xl transition-all duration-300">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 via-teal-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 via-sky-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto p-6 space-y-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <Header showNav={false} />
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-cyan-200 pb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-sky-500 p-4 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Building2 className="h-10 w-10 text-white relative z-10" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-50 to-teal-50 border-2 border-cyan-300 rounded-full mb-2 shadow-lg">
                  <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
                  <span className="bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent font-bold text-sm">
                    Hospital Portal
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                  Welcome back!
                </h1>
                <p className="text-xl text-slate-600 font-bold mt-1">
                  {session.user.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 ml-16">
              {session.user.email && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 px-4 py-2 border-2 border-cyan-300 bg-white/80 backdrop-blur-sm shadow-md"
                >
                  <Mail className="h-4 w-4 text-cyan-600" />
                  <span className="text-slate-700 font-semibold">
                    {session.user.email}
                  </span>
                </Badge>
              )}
              {session.user.phone && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 px-4 py-2 border-2 border-teal-300 bg-white/80 backdrop-blur-sm shadow-md"
                >
                  <Phone className="h-4 w-4 text-teal-600" />
                  <span className="text-slate-700 font-semibold">
                    {session.user.phone}
                  </span>
                </Badge>
              )}
            </div>
          </div>
          {/* <DoctorLogoutButton /> */}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat Card 1 */}
          <Card className="border-2 border-cyan-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-bold uppercase tracking-wider">
                    Total Patients
                  </p>
                  <h3 className="text-5xl font-black mt-2 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    1,234
                  </h3>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stat Card 2 */}
          <Card className="border-2 border-teal-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-500 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-50 text-sm font-bold uppercase tracking-wider">
                    Appointments
                  </p>
                  <h3 className="text-5xl font-black mt-2 text-white drop-shadow-lg">
                    89
                  </h3>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/30">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stat Card 3 */}
          <Card className="border-2 border-sky-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-bold uppercase tracking-wider">
                    Active Now
                  </p>
                  <h3 className="text-5xl font-black mt-2 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    42
                  </h3>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stat Card 4 */}
          <Card className="border-2 border-teal-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-cyan-500 via-teal-500 to-sky-500 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-50 text-sm font-bold uppercase tracking-wider">
                    Avg. Wait Time
                  </p>
                  <h3 className="text-5xl font-black mt-2 text-white drop-shadow-lg">
                    15m
                  </h3>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/30">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-2 border-cyan-200 shadow-2xl bg-white/90 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl" />
          <CardHeader className="border-b border-cyan-100 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                Quick Actions
              </CardTitle>
            </div>
            <CardDescription className="text-base text-slate-600 font-semibold">
              Manage your hospital profile and appointments
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 relative z-10">
            {/* Action Card 1 */}
            <Link href="/hospitals/profile/submit" className="group">
              <Card className="h-full border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <CardContent className="pt-6 flex items-start gap-4 relative z-10">
                  <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-xl bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                        Submit Profile
                      </h3>
                      <ArrowRight className="h-5 w-5 text-cyan-500 group-hover:translate-x-2 transition-all" />
                    </div>
                    <p className="text-sm text-slate-600 font-semibold">
                      Create and submit your hospital profile
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Action Card 2 */}
            <Link href="/hospitals/profile/view" className="group">
              <Card className="h-full border-2 border-teal-200 hover:border-teal-400 hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <CardContent className="pt-6 flex items-start gap-4 relative z-10">
                  <div className="rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-xl bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                        View Profile
                      </h3>
                      <ArrowRight className="h-5 w-5 text-teal-500 group-hover:translate-x-2 transition-all" />
                    </div>
                    <p className="text-sm text-slate-600 font-semibold">
                      Review your hospital information
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Action Card 3 */}
            <Link href="/hospitals/profile/edit" className="group">
              <Card className="h-full border-2 border-sky-200 hover:border-sky-400 hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <CardContent className="pt-6 flex items-start gap-4 relative z-10">
                  <div className="rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Edit3 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-xl bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                        Edit Details
                      </h3>
                      <ArrowRight className="h-5 w-5 text-sky-500 group-hover:translate-x-2 transition-all" />
                    </div>
                    <p className="text-sm text-slate-600 font-semibold">
                      Update your hospital information
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Action Card 4 */}
            <Link href="/hospitals/appointments" className="group">
              <Card className="h-full border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <CardContent className="pt-6 flex items-start gap-4 relative z-10">
                  <div className="rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-sky-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-xl bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                        Appointments
                      </h3>
                      <ArrowRight className="h-5 w-5 text-cyan-500 group-hover:translate-x-2 transition-all" />
                    </div>
                    <p className="text-sm text-slate-600 font-semibold">
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
