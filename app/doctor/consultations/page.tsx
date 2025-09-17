// app/doctor/consultations/page.tsx
import DoctorConsultationCard from "@/features/panel/doctors/doctor-consultations/components/DoctorConsultationCard";
import prisma from "@/lib/prisma";

export default async function DoctorConsultationsPage() {
  const consultations = await prisma.independentConsultation.findMany({
    where: { status: "PENDING" },
    include: { user: true }, // user ka data bhi chahiye
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Pending Consultations</h1>
      {consultations.length === 0 && <p>No pending consultations.</p>}
      {consultations.map((c) => (
        <DoctorConsultationCard key={c.id} consultation={c} />
      ))}
    </div>
  );
}
