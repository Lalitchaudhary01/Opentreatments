import prisma from "@/lib/prisma";
import { SubmitDoctorProfileInput, DoctorStatus } from "../types";

export async function submitDoctorProfileService(
  userId: string,
  data: Partial<SubmitDoctorProfileInput>
) {
  if (!data.name || !data.specialization) {
    throw new Error("Name and specialization are required");
  }

  const existing = await prisma.independentDoctor.findUnique({
    where: { userId },
  });

  if (existing) {
    throw new Error("Profile already exists.");
  }

  return prisma.independentDoctor.create({
    data: {
      userId,
      name: data.name,
      specialties: data.specialties || [],
      specialization: data.specialization,
      experience: data.experience,
      gender: data.gender,
      profilePic: data.profilePic,
      fees: data.fees,
      languages: data.languages || [],
      availability: data.availability,
      badges: data.badges || [],
      city: data.city,
      status: DoctorStatus.PENDING,
    },
  });
}