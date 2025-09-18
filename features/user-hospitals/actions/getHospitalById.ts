"use server";
import prisma from "@/lib/prisma";
import { UserHospital } from "../types/userHospital";

export async function getHospitalById(
  id: string
): Promise<UserHospital | null> {
  const hospital = await prisma.hospital.findUnique({
    where: { id },
    include: {
      doctors: { select: { id: true, name: true, specialization: true } },
      procedures: {
        select: { id: true, name: true, cost: true, duration: true },
      },
    },
  });

  if (!hospital || hospital.status !== "APPROVED") {
    return null; // only approved hospitals are visible to users
  }

  return hospital;
}
