"use server";

import prisma from "@/lib/prisma";
import { Hospital } from "../types/hospital";

export async function getHospitalById(id: string): Promise<Hospital | null> {
  try {
    //@ts-ignore
    return await prisma.hospital.findUnique({
      where: { id },
      include: {
        services: true,
        facilities: true,
        insurances: true,
        doctors: true,
        procedures: true,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching hospital by ID:", error);
    throw new Error("Failed to fetch hospital");
  }
}
