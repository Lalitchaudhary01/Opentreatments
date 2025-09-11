"use server";

import prisma from "@/lib/prisma";
import type { IndependentDoctor } from "../types/independentDoctor";

export async function getDoctorById(
  id: string
): Promise<IndependentDoctor | null> {
  if (!id) throw new Error("Doctor ID is required");

  try {
    const doctor = await prisma.independentDoctor.findUnique({
      where: { id },
      include: {
        consultations: true, // optional: include consultations if needed
      },
    });

    if (!doctor) return null;

    //@ts-ignore
    return doctor as IndependentDoctor;
  } catch (error) {
    console.error("❌ getDoctorById error:", error);
    throw new Error("Failed to fetch doctor");
  }
}
