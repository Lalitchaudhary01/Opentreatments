"use server";

import prisma from "@/lib/prisma";
import { GetApprovedDoctorsResponse } from "../types/userDoctor";

export async function getApprovedDoctors(): Promise<GetApprovedDoctorsResponse> {
  const doctors = await prisma.independentDoctor.findMany({
  where: { status: "APPROVED" },
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
    user: {                       // ✅ include user relation
      select: {
        email: true,
        phone: true                // ✅ get phone here
      },
    },
  },
});

return doctors.map((doc) => ({
  id: doc.id,
  name: doc.name,
  email: doc.user?.email ?? "",
  phone: doc.user?.phone ?? "",
  specialization: doc.specialization,
  specialties: doc.specialties ?? [],
  experience: doc.experience ?? undefined,
  city: doc.city ?? undefined,
  profilePic: doc.profilePic ?? null,
  fees: doc.fees ?? null,
  rating: doc.rating ?? null,
  totalReviews: doc.totalReviews ?? null,
  languages: doc.languages ?? [],
}));

