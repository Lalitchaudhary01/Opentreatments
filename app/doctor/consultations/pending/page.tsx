// app/doctor/consultations/pending/page.tsx
export const dynamic = "force-dynamic";
import DoctorConsultationCard from "@/features/panel/doctors/doctor-consultations/components/DoctorConsultationCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Search,
  Bell,
  Heart,
  User,
  MessageCircle,
  Users,
  ClipboardCheck,
  Settings,
} from "lucide-react";

export default async function PendingConsultationsPage() {
  const pendingConsultations = await prisma.independentConsultation.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
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
                  placeholder="Search pending consultations..."
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

          {/* Content */}
          <div className="px-6 py-4 flex-1">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/doctor/consultations"
                className="p-2 hover:bg-[#00C6D2]/10 rounded-2xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#00C6D2]" />
              </Link>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-[#001B36] dark:text-white">
                  Pending Consultations
                </h1>
              </div>
              <span className="bg-orange-100 text-orange-800 dark:bg-orange-800/40 dark:text-orange-100 px-4 py-2 rounded-full text-sm font-medium">
                {pendingConsultations.length} requests
              </span>
            </div>

            {pendingConsultations.length === 0 ? (
              <div className="text-center py-16 backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 rounded-2xl border border-white/80 dark:border-[#193436]/80">
                <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-[#6C7A89] dark:text-gray-400 text-lg mb-4">
                  No pending consultations
                </p>
                <Link
                  href="/doctor/consultations"
                  className="text-[#00C6D2] hover:text-[#00B4C0] font-semibold"
                >
                  Back to all consultations
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 rounded-2xl border border-white/80 dark:border-[#193436]/80 hover:shadow-lg transition-all"
                  >
                    <DoctorConsultationCard
                      consultation={{
                        ...consultation,
                        status: consultation.status as
                          | "PENDING"
                          | "APPROVED"
                          | "REJECTED",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
