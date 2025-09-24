"use server";

import prisma from "@/lib/prisma";
import { InsuranceProfile, InsuranceStatus } from "../types/insuranceProfile";

export async function submitInsuranceProfile(
  data: Omit<InsuranceProfile, "id" | "status" | "createdAt" | "updatedAt">
) {
  try {
    const profile = await prisma.insuranceProfile.create({
      data: {
        companyName: data.companyName,
        registrationNumber: data.registrationNumber,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        address: data.address,
        website: data.website,
        establishedYear: data.establishedYear,
        licenseNumber: data.licenseNumber,
        logoUrl: data.logoUrl,
        description: data.description,
        status: InsuranceStatus.PENDING, // default when submitting
      },
    });

    return { success: true, profile };
  } catch (error) {
    console.error("Error submitting insurance profile:", error);
    return { success: false, error: "Failed to submit profile" };
  }
}
