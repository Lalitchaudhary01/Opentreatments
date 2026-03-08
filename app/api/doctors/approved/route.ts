import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isRecoverablePrismaError(error: unknown): boolean {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return false;
  return (
    error.code === "P2021" || // table missing
    error.code === "P5010" // fetch failed (accelerate/network)
  );
}

export async function GET() {
  try {
    const doctors = await prisma.independentDoctor.findMany({
      where: { 
        status: "APPROVED"
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        specialization: true,
        specialties: true,
        experience: true,
        city: true,
        profilePic: true,
        fees: true,
        rating: true,
        totalReviews: true,
        languages: true,
        userId: true,
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
      },
    });

    const mappedDoctors = doctors.map((doc) => ({
        id: doc.id,
        name: doc.name || "Unknown Doctor",
        email: doc.user?.email ?? "",
        phone: doc.user?.phone ?? "",
        specialization: doc.specialization || "",
        specialties: Array.isArray(doc.specialties) ? doc.specialties : [],
        experience: doc.experience ?? undefined,
        city: doc.city ?? undefined,
        profilePic: doc.profilePic ?? null,
        fees: doc.fees ?? null,
        rating: doc.rating ?? null,
        totalReviews: doc.totalReviews ?? null,
        languages: Array.isArray(doc.languages) ? doc.languages : [],
      }));

    return NextResponse.json(mappedDoctors);
  } catch (error: any) {
    console.error("Error in GET /api/doctors/approved:", {
      message: error?.message || "Unknown error",
      code: error?.code,
      name: error?.name,
    });

    // Keep doctors listing stable even when DB is temporarily unavailable.
    if (isRecoverablePrismaError(error)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

