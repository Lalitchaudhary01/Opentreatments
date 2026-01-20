"use server";

import  prisma  from "@/lib/prisma";
import { MedicineInput } from "../../types/pharmacyMedicine";

export async function importMedicines(
  pharmacyId: string,
  items: MedicineInput[]
) {
  return prisma.medicine.createMany({
    data: items.map((m) => ({
      ...m,
      pharmacyId,
    })),
    skipDuplicates: true,
  });
}
