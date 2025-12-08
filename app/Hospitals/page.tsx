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
  Search,
  Bell,
  Heart,
  User,
  MessageCircle,
  ClipboardCheck,
  Settings,
  MapPin,
  Globe,
  Stethoscope,
  Pill,
  Shield,
  CheckCircle,
} from "lucide-react";

export default async function HospitalDashboardPage() {
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F4FAFA] dark:bg-[#0A1414]">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#00C6D2]/20 dark:bg-[#00C6D2]/30 rounded-full blur-[150px] -translate-y-1/4 translate-x-1/4 opacity-50 dark:opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00C6D2]/20 dark:bg-[#00C6D2]/30 rounded-full blur-[150px] translate-y-1/4 -translate-x-1/4 opacity-50 dark:opacity-40"></div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white/50 dark:bg-black/20 p-4 border-r border-white/80 dark:border-black/30">
          <div className="flex items-center gap-2 px-4 py-4 mb-8">
            <Heart className="text-[#00C6D2] text-3xl" />
            <h1 className="text-xl font-bold text-[#001B36] dark:text-white">
              HealthSys
            </h1>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/hospital/dashboard"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 bg-[#00C6D2]/20 text-[#00C6D2]"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                <p className="text-base font-bold">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/profile"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Building2 className="w-6 h-6" />
                <p className="text-base font-bold">Hospital Profile</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/doctors"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <User className="w-6 h-6" />
                <p className="text-base font-bold">Doctors</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/procedures"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Stethoscope className="w-6 h-6" />
                <p className="text-base font-bold">Procedures</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/services"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Activity className="w-6 h-6" />
                <p className="text-base font-bold">Services</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/facilities"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Pill className="w-6 h-6" />
                <p className="text-base font-bold">Facilities</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/insurance"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Shield className="w-6 h-6" />
                <p className="text-base font-bold">Insurance</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/approvals"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <ClipboardCheck className="w-6 h-6" />
                <p className="text-base font-bold">Approval Status</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/settings"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Settings className="w-6 h-6" />
                <p className="text-base font-bold">Settings</p>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          {/* Header */}
          <header className="flex items-center p-6 pb-4 flex-shrink-0 z-10">
            <div className="flex-1 max-w-xl">
              <div className="flex w-full items-stretch rounded-2xl h-12">
                <div className="text-[#6C7A89] dark:text-gray-400 flex border-r-0 border-none bg-white/60 dark:bg-[#102224]/60 items-center justify-center pl-4 rounded-l-2xl backdrop-blur-md border border-white/80 dark:border-[#193436]/80">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-2xl text-[#001B36] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-[#00C6D2]/50 border-none bg-white/60 dark:bg-[#102224]/60 h-full placeholder:text-[#6C7A89] dark:placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal backdrop-blur-md border border-white/80 dark:border-[#193436]/80 border-l-0"
                  placeholder="Search for doctors, procedures..."
                />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
              <button className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <Bell className="text-2xl text-[#6C7A89] dark:text-gray-400" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#F4FAFA] dark:border-[#0A1414]"></div>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-[#001B36] dark:text-white">
                    {session.user.name}
                  </p>
                  <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                    Hospital Admin
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="px-6 py-4 flex-1">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#001B36] dark:text-white">
                  Hospital Dashboard
                </h2>
                <p className="text-[#6C7A89] dark:text-gray-400 mt-1">
                  Welcome back! Here's your hospital overview.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-400/20 text-yellow-800 dark:bg-yellow-500/30 dark:text-yellow-300 rounded-full">
                <Clock className="w-4 h-4" />
                <p className="font-bold text-sm">PENDING APPROVAL</p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Patients */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                        Total Patients
                      </p>
                      <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                        1,234
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                      <Users className="text-[#00C6D2] text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                {/* Appointments */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-gradient-to-br from-[#00C6D2] to-teal-500 text-white">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-white/80">
                        Appointments
                      </p>
                      <p className="text-3xl font-bold text-white mt-2">89</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30">
                      <Calendar className="text-white text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                {/* Active Now */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                        Active Now
                      </p>
                      <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                        42
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                      <Activity className="text-[#00C6D2] text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                {/* Avg. Wait Time */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-gradient-to-br from-[#00C6D2] to-teal-500 text-white">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-white/80">
                        Avg. Wait Time
                      </p>
                      <p className="text-3xl font-bold text-white mt-2">15m</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30">
                      <Clock className="text-white text-2xl" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Hospital Information */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12">
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white">
                        Hospital Information
                      </CardTitle>
                      <Badge className="bg-yellow-400/20 text-yellow-800 dark:bg-yellow-500/30 dark:text-yellow-300 px-3 py-1">
                        Pending Approval
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[#001B36] dark:text-white">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            123 Health Ave, Suite 100, San Francisco, CA 94102,
                            USA
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Website</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            www.evergreenhospital.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            +1 (415) 555-1234
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            contact@evergreenhospital.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C6D2] to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#001B36] dark:text-white">
                    Quick Actions
                  </CardTitle>
                </div>
                <CardDescription className="text-base text-[#6C7A89] dark:text-gray-400 font-semibold">
                  Manage your hospital profile and operations
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
                {/* Submit Profile */}
                <Link href="/hospitals/profile/submit" className="group">
                  <Card className="h-full p-6 rounded-2xl border-2 border-[#00C6D2]/30 hover:border-[#00C6D2] transition-all bg-white/60 dark:bg-[#102224]/60 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-[#00C6D2] to-teal-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-[#001B36] dark:text-white">
                            Submit Profile
                          </h3>
                          <ArrowRight className="h-5 w-5 text-[#00C6D2] group-hover:translate-x-2 transition-all" />
                        </div>
                        <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                          Create and submit your hospital profile
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* View Profile */}
                <Link href="/hospitals/profile/view" className="group">
                  <Card className="h-full p-6 rounded-2xl border-2 border-[#00C6D2]/30 hover:border-[#00C6D2] transition-all bg-white/60 dark:bg-[#102224]/60 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-[#00C6D2] to-teal-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-[#001B36] dark:text-white">
                            View Profile
                          </h3>
                          <ArrowRight className="h-5 w-5 text-[#00C6D2] group-hover:translate-x-2 transition-all" />
                        </div>
                        <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                          Review your hospital information
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Edit Details */}
                <Link href="/hospitals/profile/edit" className="group">
                  <Card className="h-full p-6 rounded-2xl border-2 border-[#00C6D2]/30 hover:border-[#00C6D2] transition-all bg-white/60 dark:bg-[#102224]/60 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-[#00C6D2] to-teal-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Edit3 className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-[#001B36] dark:text-white">
                            Edit Details
                          </h3>
                          <ArrowRight className="h-5 w-5 text-[#00C6D2] group-hover:translate-x-2 transition-all" />
                        </div>
                        <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                          Update your hospital information
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Appointments */}
                <Link href="/hospitals/appointments" className="group">
                  <Card className="h-full p-6 rounded-2xl border-2 border-[#00C6D2]/30 hover:border-[#00C6D2] transition-all bg-white/60 dark:bg-[#102224]/60 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-[#00C6D2] to-teal-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-[#001B36] dark:text-white">
                            Appointments
                          </h3>
                          <ArrowRight className="h-5 w-5 text-[#00C6D2] group-hover:translate-x-2 transition-all" />
                        </div>
                        <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                          Manage patient appointments
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
