// app/doctor/consultations/page.tsx
export const dynamic = "force-dynamic";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Search,
  Bell,
  Heart,
  User,
  MessageCircle,
  Users,
  ClipboardCheck,
  Settings,
  Calendar,
  Clock,
  Plus,
  Pill,
  Eye,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default async function DoctorConsultationsPage() {
  // Get today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Counts for badges
  const todayCount = await prisma.independentConsultation.count({
    where: {
      status: "APPROVED",
      slot: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const pendingCount = await prisma.independentConsultation.count({
    where: { status: "PENDING" },
  });

  const approvedCount = await prisma.independentConsultation.count({
    where: { status: "APPROVED" },
  });

  const rejectedCount = await prisma.independentConsultation.count({
    where: { status: "REJECTED" },
  });

  // Get upcoming consultations for today and tomorrow
  // Using correct relations based on your Prisma schema
  const upcomingConsultations = await prisma.independentConsultation.findMany({
    where: {
      status: "APPROVED",
      slot: {
        gte: today,
      },
    },
    include: {
      user: {
        // Using 'user' instead of 'patient' if that's the correct relation
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      slot: "asc",
    },
    take: 5,
  });

  // Get recent consultation history
  const consultationHistory = await prisma.independentConsultation.findMany({
    where: {
      status: "APPROVED",
      slot: {
        lt: today,
      },
    },
    include: {
      user: {
        // Using 'user' instead of 'patient'
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      slot: "desc",
    },
    take: 5,
  });

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
                href="/doctor/dashboard"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                <p className="text-base font-bold">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/profile"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <User className="w-6 h-6" />
                <p className="text-base font-bold">Profile</p>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/consultations"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 bg-[#00C6D2]/20 text-[#00C6D2]"
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

          {/* Support Section */}
          <div className="mt-auto p-4 bg-[#00C6D2]/10 dark:bg-[#00C6D2]/20 rounded-lg text-center">
            <p className="text-[#001B36] dark:text-white font-bold">
              Need assistance?
            </p>
            <p className="text-[#6C7A89] dark:text-gray-400 text-sm mt-1 mb-3">
              Our support team is here to help.
            </p>
            <button className="w-full h-10 rounded-2xl bg-[#00C6D2] text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Contact Support
            </button>
          </div>
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
                  placeholder="Search for patients, consultations..."
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
                    Dr. Evelyn Reed
                  </p>
                  <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                    Cardiologist
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Consultation Content */}
          <div className="px-6 py-4 flex-1">
            {/* Header with Stats */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#001B36] dark:text-white">
                Consultation Dashboard
              </h2>
              <button className="flex items-center gap-2 h-11 px-6 rounded-2xl bg-[#00C6D2] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                <Plus className="w-5 h-5" />
                New Consultation
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Today's Schedule */}
                <Link href="/doctor/consultations/today">
                  <div className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 hover:shadow-lg transition-all cursor-pointer hover:border-[#00C6D2]/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Today's Schedule
                        </p>
                        <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                          {todayCount}
                        </p>
                        <p className="text-xs text-[#6C7A89] dark:text-gray-400 mt-1">
                          Approved for today
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                        <Calendar className="text-[#00C6D2] text-2xl" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Pending */}
                <Link href="/doctor/consultations/pending">
                  <div className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 hover:shadow-lg transition-all cursor-pointer hover:border-[#00C6D2]/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Pending
                        </p>
                        <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                          {pendingCount}
                        </p>
                        <p className="text-xs text-[#6C7A89] dark:text-gray-400 mt-1">
                          Review requests
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                        <Clock className="text-[#00C6D2] text-2xl" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Approved */}
                <Link href="/doctor/consultations/approved">
                  <div className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 hover:shadow-lg transition-all cursor-pointer hover:border-[#00C6D2]/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Approved
                        </p>
                        <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                          {approvedCount}
                        </p>
                        <p className="text-xs text-[#6C7A89] dark:text-gray-400 mt-1">
                          Scheduled consultations
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                        <CheckCircle className="text-[#00C6D2] text-2xl" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Rejected */}
                <Link href="/doctor/consultations/rejected">
                  <div className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 hover:shadow-lg transition-all cursor-pointer hover:border-[#00C6D2]/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Rejected
                        </p>
                        <p className="text-3xl font-bold text-[#001B36] dark:text-white mt-2">
                          {rejectedCount}
                        </p>
                        <p className="text-xs text-[#6C7A89] dark:text-gray-400 mt-1">
                          Declined requests
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-gradient-to-br from-white/30 to-white/0 border border-white/50 dark:border-white/10">
                        <XCircle className="text-[#00C6D2] text-2xl" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Upcoming Consultations */}
              <div className="col-span-12 p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                <h3 className="text-2xl font-bold text-[#001B36] dark:text-white mb-4">
                  Upcoming Consultations
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Patient Name
                        </th>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Date & Time
                        </th>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Visit Type
                        </th>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Status
                        </th>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400 text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      {upcomingConsultations.map((consultation) => (
                        <tr
                          key={consultation.id}
                          className="hover:bg-[#00C6D2]/5 dark:hover:bg-[#00C6D2]/10"
                        >
                          <td className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded-full flex-shrink-0"></div>
                            <span className="font-semibold text-[#001B36] dark:text-white">
                              {consultation.user?.name || "Unknown Patient"}
                            </span>
                          </td>
                          <td className="p-4 text-[#6C7A89] dark:text-gray-300">
                            {new Date(consultation.slot).toLocaleDateString()},{" "}
                            {new Date(consultation.slot).toLocaleTimeString()}
                          </td>
                          <td className="p-4 text-[#6C7A89] dark:text-gray-300">
                            {consultation.consultationType || "Follow-up"}
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 text-xs font-bold text-yellow-800 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-800/40 rounded-full">
                              Upcoming
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="h-10 px-5 rounded-2xl bg-[#00C6D2] text-white font-bold text-sm hover:opacity-90 transition-opacity">
                              Start Consultation
                            </button>
                          </td>
                        </tr>
                      ))}
                      {upcomingConsultations.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-4 text-center text-[#6C7A89] dark:text-gray-400"
                          >
                            No upcoming consultations
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Consultation History */}
              <div className="col-span-12 p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-[#001B36] dark:text-white">
                    Consultation History
                  </h3>
                  <div className="flex items-center gap-4">
                    <input
                      className="h-10 rounded-2xl bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 text-sm text-[#6C7A89] dark:text-gray-400 focus:ring-[#00C6D2]/50 focus:border-[#00C6D2]/50 px-3"
                      type="date"
                    />
                    <select className="h-10 rounded-2xl bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 text-sm text-[#6C7A89] dark:text-gray-400 focus:ring-[#00C6D2]/50 focus:border-[#00C6D2]/50 px-3">
                      <option>All Patients</option>
                      {/* Add patient options here */}
                    </select>
                    <select className="h-10 rounded-2xl bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80 text-sm text-[#6C7A89] dark:text-gray-400 focus:ring-[#00C6D2]/50 focus:border-[#00C6D2]/50 px-3">
                      <option>All Types</option>
                      <option>Initial</option>
                      <option>Follow-up</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Patient
                        </th>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Diagnosis Summary
                        </th>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Prescription
                        </th>
                        <th className="py-3 px-4 text-sm font-bold text-[#6C7A89] dark:text-gray-400">
                          Follow-up Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      {consultationHistory.map((consultation) => (
                        <tr
                          key={consultation.id}
                          className="hover:bg-[#00C6D2]/5 dark:hover:bg-[#00C6D2]/10"
                        >
                          <td className="p-4 font-semibold text-[#001B36] dark:text-white">
                            {consultation.user?.name || "Unknown Patient"}
                          </td>
                          <td className="p-4 text-[#6C7A89] dark:text-gray-300 max-w-sm">
                            {consultation.notes || "No notes available"}
                          </td>
                          <td className="p-4">
                            <span className="flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-[#00C6D2] bg-[#00C6D2]/10 dark:bg-[#00C6D2]/20 rounded-full">
                              <Pill className="w-4 h-4" />
                              Viewed
                            </span>
                          </td>
                          <td className="p-4 text-[#6C7A89] dark:text-gray-300">
                            {consultation.followUpDate
                              ? new Date(
                                  consultation.followUpDate
                                ).toLocaleDateString()
                              : "Not scheduled"}
                          </td>
                        </tr>
                      ))}
                      {consultationHistory.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-4 text-center text-[#6C7A89] dark:text-gray-400"
                          >
                            No consultation history
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
