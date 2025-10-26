import prisma from "@/lib/prisma";
import { InsuranceProfile } from "../types/insuranceProfile";
import { InsuranceStatus } from "@prisma/client"; // ✅ Use Prisma’s enum

/**
 * Fetch logged-in insurance company's profile
 */
export async function getInsuranceProfile(
  userId: string
): Promise<InsuranceProfile | null> {
  const profile = await prisma.insuranceCompany.findUnique({
    where: { userId },
    include: {
      user: true,
      plans: true,
      claims: true,
    },
  });

  if (!profile) return null;

  return {
    id: profile.id,
    userId: profile.userId,
    companyName: profile.name,
    registrationNumber: profile.registrationNumber || "",
    address: profile.address || "",
    contactEmail: profile.email,
    contactPhone: profile.contactPhone || "",
    website: profile.website || "",
    status: profile.status as InsuranceStatus, // ✅ matches Prisma type
    documents: [], // Populate with actual docs if stored
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}
