// features/IndependentDoctors/actions/getDoctorById.ts
"use server";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { IndependentDoctor } from "../types/IndependentDoctor";

export async function getDoctorById(
  id: string
): Promise<IndependentDoctor | null> {
  if (!id) throw new Error("Doctor ID is required");

  try {
    const doctor = await prisma.independentDoctor.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        specialization: true,
        specialties: true,
        languages: true,
        experience: true,
        gender: true,
        profilePic: true,
        fees: true,
        rating: true,
        totalReviews: true,
        badges: true,
        city: true,
        availability: true,
      },
    });

    if (!doctor) return null;

    // ✅ Optional: slug create kar ke return object me add kar sakte ho agar UI use karta hai
    return {
      ...doctor,
      slug: slugify(doctor.name),
    };
  } catch (error) {
    console.error("❌ getDoctorById error:", error);
    throw new Error("Failed to fetch doctor details");
  }
}
