"use server"
import prisma from "@/lib/prisma";
import { UserHospital } from "../types/userHospital";

export async function getApprovedHospitals(): Promise<UserHospital[]> {
  const hospitals = await prisma.hospital.findMany({
    where: { status: "APPROVED" },
    include: {
      doctors: { select: { id: true, name: true, specialization: true } },
      procedures: {
        select: { id: true, name: true, cost: true, duration: true },
      },
    },
  });

  return hospitals;
}
