// app/doctor/consultations/today/page.tsx
export const dynamic = "force-dynamic";
import DoctorConsultationCard from "@/features/panel/doctors/doctor-consultations/components/DoctorConsultationCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default async function TodaySchedulePage() {
  // Get today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayConsultations = await prisma.independentConsultation.findMany({
    where: { 
      status: "APPROVED",
      slot: {
        gte: today,
        lt: tomorrow
      }
    },
    include: { user: true },
    orderBy: { slot: "asc" }, // Sort by time
  });

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/doctor/consultations" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Today's Schedule</h1>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {todayConsultations.length} consultations
        </span>
      </div>

      {/* Today's Date */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-800">Today's Date</p>
            <p className="text-lg font-bold text-blue-900">{formatDate(today)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-blue-800">Total Appointments</p>
            <p className="text-lg font-bold text-blue-900">{todayConsultations.length}</p>
          </div>
        </div>
      </div>

      {todayConsultations.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No consultations scheduled for today</p>
          <Link 
            href="/doctor/consultations" 
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Back to all consultations
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {todayConsultations.map((consultation) => (
            <div key={consultation.id} className="relative">
              {/* Time Badge */}
              <div className="absolute -top-2 -left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                {formatTime(consultation.slot)}
              </div>
              <DoctorConsultationCard
                consultation={{
                  ...consultation,
                  status: consultation.status as "PENDING" | "APPROVED" | "REJECTED",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}