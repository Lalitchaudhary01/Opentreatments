"use server";

import prisma from "@/lib/prisma";
import { InsuranceStatus } from "@prisma/client";
import { InsuranceProfile } from "../types/insuranceProfile";

/**
 * Submit new insurance company profile
 */
export async function submitInsuranceProfile(
  data: Omit<InsuranceProfile, "id" | "status" | "createdAt" | "updatedAt">
) {
  try {
    const profile = await prisma.insuranceCompany.create({
      data: {
        userId: data.userId,
        name: data.companyName,
        registrationNumber: data.registrationNumber || null,
        email: data.contactEmail,
        contactPhone: data.contactPhone,
        address: data.address,
        website: data.website,
        status: InsuranceStatus.PENDING, // default when submitting
      },
    });

    return { success: true, profile };
  } catch (error) {
    console.error("Error submitting insurance profile:", error);
    return { success: false, error: "Failed to submit profile" };
  }
}
