// app/doctor/consultations/page.tsx
export const dynamic = "force-dynamic";
import Link from "next/link";
import prisma from "@/lib/prisma";

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Consultations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Schedule Card */}
        <Link href="/doctor/consultations/today">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer hover:border-blue-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-blue-800">
                  Today's Schedule
                </h2>
                <p className="text-blue-600 mt-2">
                  Approved consultations for today
                </p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-lg">
                {todayCount}
              </div>
            </div>
          </div>
        </Link>

        {/* Pending Card */}
        <Link href="/doctor/consultations/pending">
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer hover:border-orange-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-orange-800">Pending</h2>
                <p className="text-orange-600 mt-2">
                  Review new consultation requests
                </p>
              </div>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold text-lg">
                {pendingCount}
              </div>
            </div>
          </div>
        </Link>

        {/* Approved Card */}
        <Link href="/doctor/consultations/approved">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer hover:border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-green-800">Approved</h2>
                <p className="text-green-600 mt-2">
                  All scheduled consultations
                </p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-lg">
                {approvedCount}
              </div>
            </div>
          </div>
        </Link>

        {/* Rejected Card */}
        <Link href="/doctor/consultations/rejected">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer hover:border-red-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-red-800">Rejected</h2>
                <p className="text-red-600 mt-2">Declined requests</p>
              </div>
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold text-lg">
                {rejectedCount}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
