"use server";

import  prisma  from "@/lib/prisma";
import { AdminInsuranceCompany } from "../types/adminInsuranceCompany";

export async function getInsuranceCompanies(
  status?: "PENDING" | "APPROVED" | "REJECTED"
): Promise<AdminInsuranceCompany[]> {
  try {
    const companies = await prisma.insuranceCompany.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: "desc" },
    });

    return companies as AdminInsuranceCompany[];
  } catch (error) {
    console.error("❌ Error fetching insurance companies:", error);
    throw new Error("Failed to fetch insurance companies");
  }
}
