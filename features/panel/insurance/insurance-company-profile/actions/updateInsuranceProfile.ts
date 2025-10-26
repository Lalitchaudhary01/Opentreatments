import prisma from "@/lib/prisma";
import { InsuranceProfile } from "../types/insuranceProfile";
import { InsuranceStatus } from "@prisma/client";

interface UpdateInsuranceProfileInput {
  userId: string;
  companyName?: string;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  documents?: string[];
}

/**
 * Company updates profile (only if APPROVED)
 */
export async function updateInsuranceProfile(
  input: UpdateInsuranceProfileInput
): Promise<InsuranceProfile | null> {
  const existing = await prisma.insuranceCompany.findUnique({
    where: { userId: input.userId },
  });

  if (!existing) throw new Error("Profile not found");
  if (existing.status !== InsuranceStatus.APPROVED)
    throw new Error("Cannot update profile unless APPROVED");

  const updated = await prisma.insuranceCompany.update({
    where: { userId: input.userId },
    data: {
      name: input.companyName ?? existing.name,
      email: input.contactEmail ?? existing.email,
      address: input.address ?? existing.address,
      contactPhone: input.contactPhone ?? existing.contactPhone,
      website: input.website ?? existing.website,
      updatedAt: new Date(),
    },
  });

  return {
    id: updated.id,
    userId: updated.userId,
    companyName: updated.name,
    registrationNumber: updated.registrationNumber || "",
    address: updated.address || "",
    contactEmail: updated.email,
    contactPhone: updated.contactPhone || "",
    website: updated.website || "",
    status: updated.status,
    documents: input.documents || [],
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  };
}
