"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { CreateHospitalDoctorInput } from "../types";

export async function updateHospitalDoctor(
  doctorId: string,
  data: Partial<CreateHospitalDoctorInput>
) {
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

  return prisma.doctor.update({
    where: { id: doctorId },
    data,
  });
}
