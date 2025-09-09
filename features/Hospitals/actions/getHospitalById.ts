"use server";

import prisma from "@/lib/prisma";
import type { Hospital } from "../types/hospital";

export async function getHospitalById(id: string): Promise<Hospital | null> {
  if (!id) return null;
  try {
    const hospital = await prisma.hospital.findUnique({
      where: { id },
      include: {
        services: true,
        facilities: true,
        insurances: true,
        doctors: true,
        procedures: true,
      },
    });

    return hospital as unknown as Hospital | null;
  } catch (error) {
    console.error("❌ getHospitalById error:", error);
    throw new Error("Failed to fetch hospital");
  }
}
