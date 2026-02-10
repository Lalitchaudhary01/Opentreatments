"use server";

import  prisma  from "@/lib/prisma";

export async function deleteMedicine(medicineId: string) {
  return prisma.medicine.delete({
    where: { id: medicineId },
  });
}
