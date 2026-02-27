"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getPatientCountsForDoctor() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (!doctor) throw new Error("Doctor profile not found");

  const [onlineCount, offlineCount] = await Promise.all([
    prisma.independentConsultation.count({
      where: { doctorId: doctor.id, status: "APPROVED" },
    }),
    prisma.offlineConsultation.count({
      where: { doctorId: doctor.id },
    }),
  ]);

  return {
    onlineCount,
    offlineCount,
    totalPatients: onlineCount + offlineCount,
  };
}
