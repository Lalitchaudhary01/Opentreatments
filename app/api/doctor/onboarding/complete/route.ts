import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "DOCTOR") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

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
      return NextResponse.json(
        { error: "Missing required onboarding fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.independentDoctor.findUnique({
      where: { userId: session.user.id },
    });

    if (existing) {
      return NextResponse.json({
        message: "Profile already exists",
        doctorId: existing.id,
      });
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
        return NextResponse.json(
          { error: "Phone number already used by another account" },
          { status: 400 }
        );
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: fullName,
        phone,
      },
    });

    const doctor = await prisma.independentDoctor.create({
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

    return NextResponse.json({
      message: "Doctor profile submitted for admin approval",
      doctorId: doctor.id,
      status: doctor.status,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Duplicate value found. Please check phone/email fields." },
        { status: 400 }
      );
    }
    console.error("Doctor onboarding submit failed:", error);
    return NextResponse.json(
      { error: "Something went wrong while submitting onboarding" },
      { status: 500 }
    );
  }
}
