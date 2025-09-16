"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SubmitDoctorProfileInput, DoctorStatus } from "../types/doctorProfile";

export async function submitDoctorProfile(data: SubmitDoctorProfileInput) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  // ensure doctor not already submitted
  const existing = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  if (existing) {
    throw new Error("Profile already exists.");
  }

  const doctor = await prisma.independentDoctor.create({
    data: {
      userId: session.user.id,
      name: data.name,
      specialties: data.specialties,
      specialization: data.specialization,
      experience: data.experience,
      gender: data.gender,
      profilePic: data.profilePic,
      fees: data.fees,
      languages: data.languages,
      availability: data.availability,
      badges: data.badges || [],
      city: data.city,
      status: DoctorStatus.PENDING,
    },
  });

  return doctor;
}
