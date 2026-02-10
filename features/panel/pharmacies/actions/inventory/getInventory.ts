"use server";

import  prisma  from "@/lib/prisma";

export async function getInventory(pharmacyId: string) {
  return prisma.stockEntry.findMany({
    where: { pharmacyId },
    include: {
      medicine: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
