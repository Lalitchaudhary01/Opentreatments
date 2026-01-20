"use server";

import  prisma  from "@/lib/prisma";

export async function getMedicineById(id: string) {
  return prisma.medicine.findUnique({
    where: { id },
  });
}
