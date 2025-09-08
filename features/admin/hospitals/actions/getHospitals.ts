"use server";

import prisma from "@/lib/prisma";
import { Hospital } from "../types/hospital";

export async function getHospitals(): Promise<Hospital[]> {
  try {
    //@ts-ignore
    return await prisma.hospital.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        services: true,
        facilities: true,
        insurances: true,
        doctors: true,
        procedures: true,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching hospitals:", error);
    throw new Error("Failed to fetch hospitals");
  }
}
