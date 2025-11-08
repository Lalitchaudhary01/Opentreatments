"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { InsuranceStatus } from "@prisma/client";

/**
 * Input aapke client form se aayega (userId client se NA bhejein)
 */
export type SubmitInsuranceProfileInput = {
  companyName: string;
  registrationNumber?: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  documents?: string[]; // agar aap alag table/file storage use karte ho to adjust
};

export async function submitInsuranceProfile(
  data: SubmitInsuranceProfileInput
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  // Optional: ensure user has not already submitted (1 profile per user)
  const existing = await prisma.insuranceCompany.findFirst({
    where: { userId: session.user.id },
  });
  if (existing) {
    throw new Error("Profile already submitted.");
  }

  // Basic validation
  if (
    !data.companyName ||
    !data.address ||
    !data.contactEmail ||
    !data.contactPhone
  ) {
    throw new Error("Required fields missing.");
  }

  const profile = await prisma.insuranceCompany.create({
    data: {
      userId: session.user.id, // ✅ user from session (not client)
      name: data.companyName,
      registrationNumber: data.registrationNumber || null,
      email: data.contactEmail,
      contactPhone: data.contactPhone,
      address: data.address,
      website: data.website || null,
      status: InsuranceStatus.PENDING, // default
      // documents: <— if you have a relation/table, insert there
    },
  });

  return profile;
}
