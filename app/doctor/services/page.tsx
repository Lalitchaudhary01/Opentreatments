import { DoctorServicesScreen } from "@/features/panel/doctor/service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export default async function DoctorServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, status: true },
  });
  if (!doctor) redirect("/doctor/profile/submit");
  if (doctor.status !== "APPROVED") redirect("/doctor/approvals");

  const [consultCount, walkinCount] = await Promise.all([
    prisma.independentConsultation.count({ where: { doctorId: doctor.id } }),
    prisma.offlineConsultation.count({ where: { doctorId: doctor.id } }),
  ]);

  const firstTime = consultCount + walkinCount === 0;
  return <DoctorServicesScreen firstTime={firstTime} />;
}
