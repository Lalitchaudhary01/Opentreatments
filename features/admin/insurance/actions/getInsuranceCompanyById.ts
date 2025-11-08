"use server";

import prisma from "@/lib/prisma";
import { AdminInsuranceCompany } from "../types/adminInsuranceCompany";

export async function getInsuranceCompanyById(
  id: string
): Promise<AdminInsuranceCompany | null> {
  const c = await prisma.insuranceCompany.findUnique({ where: { id } });
  if (!c) return null;

  return {
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.contactPhone ?? null,
    address: c.address ?? null,
    licenseNumber: c.registrationNumber ?? null,
    website: c.website ?? null,
    status: c.status as any,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}
