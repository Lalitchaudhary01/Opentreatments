"use server";

import  prisma  from "@/lib/prisma";

export async function searchMedicines(
  pharmacyId: string,
  query: string
) {
  return prisma.medicine.findMany({
    where: {
      pharmacyId,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { genericName: { contains: query, mode: "insensitive" } },
        { brand: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 20,
  });
}
