"use server";

import prisma from "@/lib/prisma";
import { PharmacyStatus, AdminPharmacy } from "../types/adminPharmacy";

export async function getPharmacies(
  status?: PharmacyStatus
): Promise<AdminPharmacy[]> {
  const pharmacies = await prisma.pharmacy.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
  });

  return pharmacies.map((p) => ({
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
    status: p.status as PharmacyStatus,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
}
