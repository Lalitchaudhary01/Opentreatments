"use server";

import  prisma  from "@/lib/prisma";
import { AdminInsuranceCompany, AdminInsuranceCompanyStatus } from "../types/adminInsuranceCompany";

export async function updateInsuranceCompanyStatus(
  id: string,
  status: AdminInsuranceCompanyStatus
): Promise<AdminInsuranceCompany> {
  try {
    const updatedCompany = await prisma.insuranceCompany.update({
      where: { id },
      data: { status },
    });

    return updatedCompany as AdminInsuranceCompany;
  } catch (error) {
    console.error(`❌ Error updating insurance company status for id=${id}:`, error);
    throw new Error("Failed to update insurance company status");
  }
}
