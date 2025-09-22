"use server";

import prisma from "@/lib/prisma";
import { AdminPharmacy } from "../types/adminPharmacy";

export async function getPharmacyById(
  id: string
): Promise<AdminPharmacy | null> {
  const p = await prisma.pharmacy.findUnique({
    where: { id },
  });

  if (!p) return null;

  return {
    id: p.id,
    name: p.name,
    ownerName: p.ownerName,
    email: p.email,
    phone: p.phone,
    address: p.address ?? "",
    city: p.city ?? "",
    state: p.state ?? "",
    country: p.country ?? "",
    licenseNumber: p.licenseNumber,
    gstNumber: p.gstNumber ?? "",
    status: p.status as any,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}
