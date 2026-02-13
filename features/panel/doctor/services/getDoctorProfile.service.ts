import prisma from "@/lib/prisma";

export async function getDoctorProfileService(userId: string) {
  return prisma.independentDoctor.findUnique({
    where: { userId },
  });
}