"use server";

import  prisma  from "@/lib/prisma";
import { AdminInsuranceCompany, AdminInsuranceCompanyStatus } from "../types/adminInsuranceCompany";

export async function getInsuranceCompanies(
  status?: "PENDING" | "APPROVED" | "REJECTED"
): Promise<AdminInsuranceCompany[]> {
  try {
    const companies = await prisma.insuranceCompany.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: "desc" },
    });

    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      email: company.email,
      phone: "", // Default value since it's not in the Prisma model
      address: "", // Default value since it's not in the Prisma model
      licenseNumber: "", // Default value since it's not in the Prisma model
      description: company.provider || undefined,
      status: company.status as AdminInsuranceCompanyStatus,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("❌ Error fetching insurance companies:", error);
    throw new Error("Failed to fetch insurance companies");
  }
}
