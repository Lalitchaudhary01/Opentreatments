import prisma from "@/lib/prisma";
import { SubmitDoctorProfileInput } from "../types";

export async function updateDoctorProfileService(
  userId: string,
  data: Partial<SubmitDoctorProfileInput>
) {
  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId },
  });

  if (!doctor) {
    throw new Error("Profile not found.");
  }

  if (doctor.status !== "APPROVED") {
    throw new Error("Only APPROVED doctors can edit their profile.");
  }

  return prisma.independentDoctor.update({
    where: { userId },
    data,
  });
}