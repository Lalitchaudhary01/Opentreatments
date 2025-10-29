// app/doctor/consultations/pending/page.tsx
export const dynamic = "force-dynamic";
import DoctorConsultationCard from "@/features/panel/doctors/doctor-consultations/components/DoctorConsultationCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PendingConsultationsPage() {
  const pendingConsultations = await prisma.independentConsultation.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/doctor/consultations" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Pending Consultations</h1>
        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
          {pendingConsultations.length} requests
        </span>
      </div>

      {pendingConsultations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No pending consultations</p>
          <Link 
            href="/doctor/consultations" 
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Back to all consultations
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingConsultations.map((consultation) => (
            <DoctorConsultationCard
              key={consultation.id}
              consultation={{
                ...consultation,
                status: consultation.status as "PENDING" | "APPROVED" | "REJECTED",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}