"use server";

import  prisma  from "@/lib/prisma";
import { PharmacyProfileInput } from "../../types/pharmacyProfile";

export async function submitPharmacyProfile(
  userId: string,
  data: PharmacyProfileInput
) {
  return prisma.pharmacy.create({
    data: {
      ...data,
      userId,
    },
  });
}
