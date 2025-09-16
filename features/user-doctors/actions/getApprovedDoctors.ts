"use server";

import prisma from "@/lib/prisma";
import { GetApprovedDoctorsResponse } from "../types/userDoctor";

export async function getApprovedDoctors(): Promise<GetApprovedDoctorsResponse> {
  const doctors = await prisma.independentDoctor.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });

  // Map only safe fields for user
  return doctors.map((doc) => ({
    id: doc.id,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    specialization: doc.specialization,
    specialties: doc.specialties ?? [], // ✅ Added
    experience: doc.experience ?? undefined,
    city: doc.city ?? undefined,
    profilePic: doc.profilePic ?? null,
    fees: doc.fees ?? null,
    rating: doc.rating ?? null,
    totalReviews: doc.totalReviews ?? null,
    languages: doc.languages ?? [],
  }));
}
