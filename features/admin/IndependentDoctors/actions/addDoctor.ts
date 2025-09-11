"use server";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { IndependentDoctor } from "../types/independentDoctor";

export type AddDoctorInput = Partial<
  Omit<
    IndependentDoctor,
    | "id"
    | "rating"
    | "totalReviews"
    | "createdAt"
    | "updatedAt"
    | "consultations"
    
  >
>;

export async function addDoctor(
  data: AddDoctorInput
): Promise<IndependentDoctor> {
  if (!data?.name) throw new Error("Doctor name is required");
  if (!data?.specialization) throw new Error("Specialization is required");
  if (!data?.specialties || data.specialties.length === 0)
    throw new Error("At least one specialty is required");
  if (!data?.languages || data.languages.length === 0)
    throw new Error("At least one language is required");

  try {
    // Optional: generate a slug for doctor if you need unique URLs
    const baseSlug = slugify(data.name);
    let slug = baseSlug;
    const existing = await prisma.independentDoctor.findUnique({
      where: { id: slug },
    });
    if (existing) {
      slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;
    }

    const doctor = await prisma.independentDoctor.create({
      data: {
        name: data.name,
        specialization: data.specialization,
        specialties: data.specialties,
        languages: data.languages,
        experience: data.experience ?? null,
        gender: data.gender ?? null,
        profilePic: data.profilePic ?? null,
        fees: data.fees ?? null,
        rating: data.rating ?? 0,
        totalReviews: data.totalReviews ?? 0,
        badges: data.badges ?? [],
        city: data.city ?? null,
        availability: data.availability ?? [],
      },
    });

    //@ts-ignore
    return doctor as IndependentDoctor;
  } catch (error) {
    console.error("❌ addDoctor error:", error);
    throw new Error("Failed to add doctor");
  }
}
