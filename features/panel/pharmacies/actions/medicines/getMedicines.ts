"use server";

import  prisma  from "@/lib/prisma";

export async function getMedicines(pharmacyId: string) {
  return prisma.medicine.findMany({
    where: { pharmacyId },
    orderBy: { createdAt: "desc" },
  });
}
