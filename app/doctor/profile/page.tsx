import { DoctorProfileView } from "@/features/panel/doctor/screens/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DoctorProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) {
    redirect("/doctor/overview");
  }

  return <DoctorProfileView profile={doctor as any} />;
}
