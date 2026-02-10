"use server";

import  prisma  from "@/lib/prisma";
import { PharmacyProfileInput } from "../../types/pharmacyProfile";

export async function updatePharmacyProfile(
  userId: string,
  data: Partial<PharmacyProfileInput>
) {
  return prisma.pharmacy.update({
    where: { userId },
    data,
  });
}
