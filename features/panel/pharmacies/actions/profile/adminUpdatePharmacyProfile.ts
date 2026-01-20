"use server";

import  prisma  from "@/lib/prisma";
import { PharmacyStatus } from "@prisma/client";

export async function adminUpdatePharmacyProfile(
  pharmacyId: string,
  data: {
    status?: PharmacyStatus;
    adminNotes?: string;
  }
) {
  return prisma.pharmacy.update({
    where: { id: pharmacyId },
    data,
  });
}
