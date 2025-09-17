// app/doctor/consultations/page.tsx
import DoctorConsultationCard from "@/features/panel/doctors/doctor-consultations/components/DoctorConsultationCard";
import prisma from "@/lib/prisma";

export default async function DoctorConsultationsPage() {
  const pendingConsultations = await prisma.independentConsultation.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const approvedConsultations = await prisma.independentConsultation.findMany({
    where: { status: "APPROVED" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const rejectedConsultations = await prisma.independentConsultation.findMany({
    where: { status: "REJECTED" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-2">Pending Consultations</h1>
        {pendingConsultations.length === 0 ? (
          <p>No pending consultations.</p>
        ) : (
          pendingConsultations.map((c) => (
            <DoctorConsultationCard key={c.id} consultation={c} />
          ))
        )}
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-2">Approved Consultations</h1>
        {approvedConsultations.length === 0 ? (
          <p>No approved consultations.</p>
        ) : (
          approvedConsultations.map((c) => (
            <DoctorConsultationCard key={c.id} consultation={c} />
          ))
        )}
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-2">Rejected Consultations</h1>
        {rejectedConsultations.length === 0 ? (
          <p>No rejected consultations.</p>
        ) : (
          rejectedConsultations.map((c) => (
            <DoctorConsultationCard key={c.id} consultation={c} />
          ))
        )}
      </section>
    </div>
  );
}
