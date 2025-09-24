"use server";

import  prisma  from "@/lib/prisma";
import { AdminInsuranceCompany } from "../types/adminInsuranceCompany";

export async function getInsuranceCompanyById(
  id: string
): Promise<AdminInsuranceCompany | null> {
  try {
    const company = await prisma.insuranceCompany.findUnique({
      where: { id },
    });

    return company as AdminInsuranceCompany | null;
  } catch (error) {
    console.error(`❌ Error fetching insurance company with id=${id}:`, error);
    throw new Error("Failed to fetch insurance company");
  }
}
