"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { DoctorOnboardingFormState } from "../DoctorOnboardingSteps";

export async function completeDoctorOnboarding(
  body: DoctorOnboardingFormState
): Promise<{ ok: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { ok: false, error: "Unauthorized" };
    }

    if (session.user.role !== "DOCTOR") {
      return { ok: false, error: "Forbidden" };
    }

    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const phone = (body.phone || "").trim();
    const gender = (body.gender || "").trim();
    const medicalRegistrationNumber = (body.medicalRegistrationNumber || "").trim();
    const qualification = (body.qualification || "").trim();
    const graduationYear = (body.graduationYear || "").toString().trim();
    const experienceLabel = (body.experienceLabel || "").trim();
    const city = (body.city || "").trim();
    const pinCode = (body.pinCode || "").trim();
    const clinicName = (body.clinicName || "").trim();
    const address = (body.address || "").trim();
    const specialization = (body.specialization || "").trim();
    const languagesRaw = (body.languages || "").trim();

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !medicalRegistrationNumber ||
      !qualification ||
      !clinicName ||
      !city ||
      !specialization
    ) {
      return { ok: false, error: "Missing required onboarding fields" };
    }

    const existing = await prisma.independentDoctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (existing) {
      return { ok: true };
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const experienceMap: Record<string, number> = {
      "Less than 1 year": 0,
      "1–3 years": 2,
      "3–5 years": 4,
      "5–10 years": 7,
      "10–15 years": 12,
      "15–20 years": 17,
      "20+ years": 20,
    };
    const experience = experienceMap[experienceLabel] ?? undefined;
    const languages = languagesRaw
      ? languagesRaw
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean)
      : [];

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { phone: true },
    });

    if (currentUser && currentUser.phone !== phone) {
      const phoneOwner = await prisma.user.findUnique({
        where: { phone },
        select: { id: true },
      });
      if (phoneOwner && phoneOwner.id !== session.user.id) {
        return { ok: false, error: "Phone number already used by another account" };
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: fullName,
        phone,
      },
    });

    await prisma.independentDoctor.create({
      data: {
        userId: session.user.id,
        name: fullName,
        specialization,
        specialties: [specialization],
        experience,
        gender: gender || null,
        languages,
        city,
        badges: [],
        availability: {
          onboarding: {
            medicalRegistrationNumber,
            qualification,
            graduationYear,
            experienceLabel,
            clinicName,
            pinCode,
            address,
          },
        },
        status: "PENDING",
      },
    });

    return { ok: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false,
        error: "Duplicate value found. Please check phone/email fields.",
      };
    }
    console.error("Doctor onboarding submit failed:", error);
    return { ok: false, error: "Something went wrong while submitting onboarding" };
  }
}
