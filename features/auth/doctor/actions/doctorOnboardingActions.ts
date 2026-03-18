"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { DoctorOnboardingFormState } from "../DoctorOnboardingSteps";

function isLegacyDoctorProfileSchemaError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientValidationError) {
    const msg = error.message || "";
    return (
      msg.includes("Unknown argument `phone`") ||
      msg.includes("Unknown argument `medicalRegistrationNumber`") ||
      msg.includes("Unknown argument `qualification`") ||
      msg.includes("Unknown argument `graduationYear`") ||
      msg.includes("Unknown argument `experienceLabel`") ||
      msg.includes("Unknown argument `clinicName`") ||
      msg.includes("Unknown argument `pinCode`")
    );
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // P2022 => column does not exist in current database
    return error.code === "P2022";
  }
  return false;
}

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

    const doctorName = (body.name || "").trim();
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
      !doctorName ||
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

    const fallbackNameFromEmail = session.user.email?.split("@")[0]?.trim() || "Doctor";
    const fullName = doctorName || session.user.name?.trim() || fallbackNameFromEmail;
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

    const onboardingSnapshot = {
      onboarding: {
        medicalRegistrationNumber,
        qualification,
        graduationYear,
        experienceLabel,
        clinicName,
        pinCode,
        address,
      },
    };

    const allDoctorData = {
      userId: session.user.id,
      phone,
      name: fullName,
      medicalRegistrationNumber,
      qualification,
      graduationYear: graduationYear || null,
      experienceLabel: experienceLabel || null,
      clinicName,
      pinCode: pinCode || null,
      address: address || null,
      specialization,
      specialties: [specialization],
      experience,
      gender: gender || null,
      languages,
      city,
      badges: [],
      status: "PENDING" as const,
    };

    const model = Prisma.dmmf.datamodel.models.find((m) => m.name === "IndependentDoctor");
    const supportedDoctorFields = new Set((model?.fields || []).map((f) => f.name));

    const baseDoctorData = Object.fromEntries(
      Object.entries(allDoctorData).filter(([key]) => supportedDoctorFields.has(key))
    );

    try {
      await prisma.independentDoctor.create({
        data: baseDoctorData as unknown as Prisma.IndependentDoctorCreateInput,
      });
    } catch (error) {
      if (!isLegacyDoctorProfileSchemaError(error)) {
        throw error;
      }

      // Legacy DB/client fallback: if detailed columns are unavailable, keep onboarding snapshot.
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
          availability: onboardingSnapshot,
          status: "PENDING",
        },
      });
    }

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
