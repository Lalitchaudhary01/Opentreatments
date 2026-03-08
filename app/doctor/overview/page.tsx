import DoctorOverviewPage from "@/features/panel/doctor/overview/component/dashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";


export default async function DoctorDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { status: true },
  });

  if (!doctor) redirect("/doctor/profile/submit");

  return <DoctorOverviewPage/>;
}
