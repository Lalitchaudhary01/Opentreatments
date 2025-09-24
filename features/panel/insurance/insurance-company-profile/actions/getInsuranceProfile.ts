import prisma from "@/lib/prisma";
import { InsuranceProfile } from "../types/insuranceProfile";

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
    registrationNumber: profile.userId, // replace with actual field if exists
    address: profile.user?.address || "",
    contactEmail: profile.email,
    contactPhone: profile.user?.phone || "",
    website: profile.user?.website || "",
    status: profile.status,
    documents: [], // Populate with actual docs if stored
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}
