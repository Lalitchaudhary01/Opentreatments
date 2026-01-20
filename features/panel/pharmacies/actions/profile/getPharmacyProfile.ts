"use server";

import  prisma  from "@/lib/prisma";

export async function getPharmacyProfile(userId: string) {
  return prisma.pharmacy.findUnique({
    where: { userId },
  });
}
