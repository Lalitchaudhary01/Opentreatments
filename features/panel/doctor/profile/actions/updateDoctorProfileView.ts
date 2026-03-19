"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

type UpdateDoctorProfileViewInput = {
  name?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  bio?: string;
  specialization?: string;
  qualification?: string;
  medicalCouncil?: string;
  medicalRegistrationNumber?: string;
  languages?: string[];
  experienceLabel?: string;
  clinicName?: string;
  city?: string;
  pinCode?: string;
  address?: string;
};

export async function updateDoctorProfileView(data: UpdateDoctorProfileViewInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { ok: false, error: "Unauthorized" };
  }

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });
  if (!doctor) return { ok: false, error: "Doctor profile not found" };

  const updatePayload: Record<string, unknown> = {};

  if (typeof data.phone === "string") updatePayload.phone = data.phone.trim();
  if (typeof data.name === "string") updatePayload.name = data.name.trim();
  if (typeof data.gender === "string") updatePayload.gender = data.gender.trim() || null;
  if (typeof data.bio === "string") updatePayload.bio = data.bio.trim() || null;
  if (typeof data.specialization === "string") updatePayload.specialization = data.specialization.trim();
  if (typeof data.qualification === "string") updatePayload.qualification = data.qualification.trim() || null;
  if (typeof data.medicalCouncil === "string") updatePayload.medicalCouncil = data.medicalCouncil.trim() || null;
  if (typeof data.medicalRegistrationNumber === "string") {
    updatePayload.medicalRegistrationNumber = data.medicalRegistrationNumber.trim() || null;
  }
  if (Array.isArray(data.languages)) updatePayload.languages = data.languages;
  if (typeof data.experienceLabel === "string") updatePayload.experienceLabel = data.experienceLabel.trim() || null;
  if (typeof data.clinicName === "string") updatePayload.clinicName = data.clinicName.trim() || null;
  if (typeof data.city === "string") updatePayload.city = data.city.trim() || null;
  if (typeof data.pinCode === "string") updatePayload.pinCode = data.pinCode.trim() || null;
  if (typeof data.address === "string") updatePayload.address = data.address.trim() || null;

  if (typeof data.dob === "string") {
    const val = data.dob.trim();
    updatePayload.dob = val ? new Date(val) : null;
  }

  await prisma.independentDoctor.update({
    where: { userId: session.user.id },
    data: updatePayload,
  });

  return { ok: true };
}
