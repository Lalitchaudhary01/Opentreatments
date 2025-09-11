// /features/doctors/actions/getDoctors.ts
"use server";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { IndependentDoctor } from "../types/IndependentDoctor";

export async function getDoctors(): Promise<IndependentDoctor[]> {
  try {
    const doctors = await prisma.independentDoctor.findMany({
      orderBy: {
        name: "asc",
      },
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
    //@ts-ignore
    return doctors.map((doctor) => ({
      ...doctor,
      slug: slugify(doctor.name), // ✅ manually create slug
    }));
  } catch (error) {
    console.error("❌ getDoctors error:", error);
    throw new Error("Failed to fetch doctors");
  }
}
