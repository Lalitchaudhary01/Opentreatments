import {
  PendingView,
  ApprovedView,
  RejectedView,
} from "@/features/panel/doctor/screens/status";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export default async function DoctorStatusPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) return <PendingView />;

  switch (doctor.status) {
    case "APPROVED":
      return <ApprovedView />;
    case "REJECTED":
      return <RejectedView />;
    default:
      return <PendingView />;
  }
}
