"use server";
import prisma from "@/lib/prisma";
import type { Hospital } from "../types/hospital";

export async function getHospitalBySlug(
  slug: string
): Promise<Hospital | null> {
  if (!slug) return null;
  try {
    const hospital = await prisma.hospital.findUnique({
      where: { slug },
      include: {
        facilities: true,
        services: true,
        insurances: true,
        doctors: true,
        procedures: true,
      },
    });

    return hospital as Hospital | null;
  } catch (error) {
    console.error("❌ getHospitalBySlug error:", error);
    return null;
  }
}
