"use server";

import prisma from "@/lib/prisma";
import type { IndependentDoctor } from "../types/independentDoctor";

export type UpdateDoctorInput = Partial<
  Omit<
    IndependentDoctor,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "consultations"
    | "rating"
    | "totalReviews"
  >
> & { id: string }; // id is required to know which doctor to update

export async function updateDoctor(
  data: UpdateDoctorInput
): Promise<IndependentDoctor> {
  if (!data?.id) throw new Error("Doctor ID is required");

  try {
    // Fetch existing doctor
    const existingDoctor = await prisma.independentDoctor.findUnique({
      where: { id: data.id },
    });

    if (!existingDoctor) {
      throw new Error("Doctor not found");
    }

    // Update only fields passed in data, keep others unchanged
    const updatedDoctor = await prisma.independentDoctor.update({
      where: { id: data.id },
      data: {
        name: data.name ?? existingDoctor.name,
        specialization: data.specialization ?? existingDoctor.specialization,
        specialties: data.specialties ?? existingDoctor.specialties,
        languages: data.languages ?? existingDoctor.languages,
        experience: data.experience ?? existingDoctor.experience,
        gender: data.gender ?? existingDoctor.gender,
        profilePic: data.profilePic ?? existingDoctor.profilePic,
        fees: data.fees ?? existingDoctor.fees,
        badges: data.badges ?? existingDoctor.badges,
        city: data.city ?? existingDoctor.city,
        availability: data.availability ?? existingDoctor.availability,
        // rating and totalReviews intentionally omitted
      },
    });

    //@ts-ignore
    return updatedDoctor as IndependentDoctor;
  } catch (error) {
    console.error("❌ updateDoctor error:", error);
    throw new Error("Failed to update doctor");
  }
}
