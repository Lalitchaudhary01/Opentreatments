"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  AdminInsuranceCompany,
  AdminInsuranceCompanyStatus,
} from "../types/adminInsuranceCompany";

export async function getInsuranceCompanies(
  status?: AdminInsuranceCompanyStatus
): Promise<AdminInsuranceCompany[]> {
  const companies = await prisma.insuranceCompany.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
  });

  return companies.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.contactPhone ?? null, // ✅ correct mapping
    address: c.address ?? null, // ✅ correct mapping
    licenseNumber: c.registrationNumber ?? null, // ✅ correct mapping
    website: c.website ?? null,
    status: c.status as AdminInsuranceCompanyStatus,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));
}
