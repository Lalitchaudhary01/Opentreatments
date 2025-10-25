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

    return {
      id: updatedCompany.id,
      name: updatedCompany.name,
      email: updatedCompany.email,
      phone: "", // Default value since it's not in the Prisma model
      address: "", // Default value since it's not in the Prisma model
      licenseNumber: "", // Default value since it's not in the Prisma model
      description: updatedCompany.provider || undefined,
      status: updatedCompany.status as AdminInsuranceCompanyStatus,
      createdAt: updatedCompany.createdAt.toISOString(),
      updatedAt: updatedCompany.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`❌ Error updating insurance company status for id=${id}:`, error);
    throw new Error("Failed to update insurance company status");
  }
}
