"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  AdminInsuranceCompany,
  AdminInsuranceCompanyStatus,
} from "../types/adminInsuranceCompany";

export async function updateInsuranceCompanyStatus(
  id: string,
  status: AdminInsuranceCompanyStatus
): Promise<AdminInsuranceCompany> {
  const u = await prisma.insuranceCompany.update({
    where: { id },
    data: { status },
  });

  // Optional but useful: refresh admin list page(s)
  revalidatePath("/admin/insurance");
  revalidatePath("/admin/insurance/companies");

  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.contactPhone ?? null,
    address: u.address ?? null,
    licenseNumber: u.registrationNumber ?? null,
    website: u.website ?? null,
    status: u.status as AdminInsuranceCompanyStatus,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  };
}
