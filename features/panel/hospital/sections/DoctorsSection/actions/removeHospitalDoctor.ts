"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function removeHospitalDoctor(doctorId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });

  if (!hospital) throw new Error("Hospital not found");

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor || doctor.hospitalId !== hospital.id) {
    throw new Error("Forbidden");
  }

  return prisma.doctor.delete({
    where: { id: doctorId },
  });
}
