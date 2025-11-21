"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  Heart,
  User,
  MessageCircle,
  Users,
  ClipboardCheck,
  Settings,
  Edit,
  Eye,
  Calendar,
  CreditCard,
  BookOpen,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function DoctorDashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4FAFA] dark:bg-[#0A1414]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00C6D2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#001B36] dark:text-gray-200 font-semibold">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "DOCTOR") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4FAFA] dark:bg-[#0A1414]">
        <Card className="max-w-lg mx-4 shadow-lg backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#001B36] dark:text-white mb-3">
                  Access Restricted
                </h2>
                <p className="text-[#6C7A89] dark:text-gray-400 text-lg">
                  This area is exclusively for verified medical professionals.
                </p>
              </div>
              <Link href="/login">
                <Button className="w-full bg-[#00C6D2] hover:bg-[#00B4C0] text-white font-bold py-6 text-lg">
                  Return to Login
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
        <aside className="w-64 flex-shrink-0 bg-white/50 dark:bg-black/20 p-4 border-r border-white/80 dark:border-black/30 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-4 mb-8">
            <Heart className="text-[#00C6D2] text-3xl" />
            <h1 className="text-xl font-bold text-[#001B36] dark:text-white">
              OpenTreatment
            </h1>
          </div>

          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/doctor"
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
                href="/doctor/profile/view"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <User className="w-6 h-6" />
                <p className="text-base font-bold">Profile</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/consultations"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <MessageCircle className="w-6 h-6" />
                <p className="text-base font-bold">Consultations</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/patients"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Users className="w-6 h-6" />
                <p className="text-base font-bold">Patients</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/approvals"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <ClipboardCheck className="w-6 h-6" />
                <p className="text-base font-bold">Approvals</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/settings"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Settings className="w-6 h-6" />
                <p className="text-base font-bold">Settings</p>
              </Link>
            </li>
          </ul>

          <div className="mt-auto"></div>
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
                  placeholder="Search..."
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
                    Dr. {session.user.name}
                  </p>
                  <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                    Cardiologist
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="px-6 py-4 flex-1">
            {/* Welcome Section */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#001B36] dark:text-white">
                Welcome back, Dr. {session.user.name}!
              </h2>
              <p className="text-[#6C7A89] dark:text-gray-400 mt-1">
                Here's a summary of your activity today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Bookings */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                        Total Bookings
                      </p>
                      <p className="text-4xl font-bold text-[#001B36] dark:text-white mt-2">
                        1,254
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                      <BookOpen className="text-[#00C6D2] text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Approvals */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                        Pending Approvals
                      </p>
                      <p className="text-4xl font-bold text-[#001B36] dark:text-white mt-2">
                        12
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                      <ClipboardCheck className="text-[#00C6D2] text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Appointments */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                        Today's Appointments
                      </p>
                      <p className="text-4xl font-bold text-[#001B36] dark:text-white mt-2">
                        8
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                      <Calendar className="text-[#00C6D2] text-2xl" />
                    </div>
                  </CardContent>
                </Card>

                {/* Earnings */}
                <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardContent className="flex items-start justify-between p-0">
                    <div>
                      <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                        Earnings (Today)
                      </p>
                      <p className="text-4xl font-bold text-[#001B36] dark:text-white mt-2">
                        $2,800
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                      <CreditCard className="text-[#00C6D2] text-2xl" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Links and Schedule */}
              <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Links */}
                <Card className="col-span-1 lg:col-span-1 p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white">
                      Quick Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-3">
                    <Link
                      href="/doctor/profile/edit"
                      className="flex items-center p-4 rounded-2xl bg-[#00C6D2]/10 dark:bg-[#00C6D2]/20 hover:bg-[#00C6D2]/20 dark:hover:bg-[#00C6D2]/30 transition-colors"
                    >
                      <Edit className="text-[#00C6D2] mr-4 w-5 h-5" />
                      <span className="font-bold text-[#001B36] dark:text-white">
                        Edit Profile
                      </span>
                    </Link>

                    <Link
                      href="/doctor/profile/view"
                      className="flex items-center p-4 rounded-2xl bg-[#00C6D2]/10 dark:bg-[#00C6D2]/20 hover:bg-[#00C6D2]/20 dark:hover:bg-[#00C6D2]/30 transition-colors"
                    >
                      <Eye className="text-[#00C6D2] mr-4 w-5 h-5" />
                      <span className="font-bold text-[#001B36] dark:text-white">
                        View Profile
                      </span>
                    </Link>

                    <Link
                      href="/doctor/consultations"
                      className="flex items-center p-4 rounded-2xl bg-[#00C6D2]/10 dark:bg-[#00C6D2]/20 hover:bg-[#00C6D2]/20 dark:hover:bg-[#00C6D2]/30 transition-colors"
                    >
                      <MessageCircle className="text-[#00C6D2] mr-4 w-5 h-5" />
                      <span className="font-bold text-[#001B36] dark:text-white">
                        Consultations
                      </span>
                    </Link>
                  </CardContent>
                </Card>

                {/* Today's Schedule */}
                <Card className="col-span-1 lg:col-span-2 p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-[#001B36] dark:text-white">
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    {[
                      {
                        name: "Liam Johnson",
                        type: "Follow-up Visit",
                        time: "09:30 AM",
                      },
                      {
                        name: "Sophia Rodriguez",
                        type: "New Patient Consultation",
                        time: "10:15 AM",
                      },
                      {
                        name: "Ananya Sharma",
                        type: "Cardiology Check-up",
                        time: "11:30 AM",
                      },
                    ].map((appointment, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 rounded-2xl bg-gray-500/10 dark:bg-gray-500/20"
                      >
                        <div className="w-12 h-12 bg-slate-300 dark:bg-slate-600 rounded-full mr-4"></div>
                        <div className="flex-1">
                          <p className="font-bold text-[#001B36] dark:text-white">
                            {appointment.name}
                          </p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            {appointment.type}
                          </p>
                        </div>
                        <p className="font-bold text-[#00C6D2] text-lg">
                          {appointment.time}
                        </p>
                      </div>
                    ))}

                    <div className="text-center mt-4">
                      <Link
                        href="/doctor/consultations/today"
                        className="text-[#00C6D2] font-bold hover:underline"
                      >
                        View All Appointments
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
