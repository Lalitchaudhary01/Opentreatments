"use server";

import prisma from "@/lib/prisma";
import { PharmacyStatus } from "../types/adminPharmacy";

export async function updatePharmacyStatus(
  pharmacyId: string,
  status: PharmacyStatus
) {
  const updated = await prisma.pharmacy.update({
    where: { id: pharmacyId },
    data: { status },
  });

  return {
    id: updated.id,
    status: updated.status as PharmacyStatus,
    updatedAt: updated.updatedAt.toISOString(),
  };
}
