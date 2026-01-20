"use server";

import  prisma  from "@/lib/prisma";
import { MedicineInput } from "../../types/pharmacyMedicine";

export async function updateMedicine(
  medicineId: string,
  data: Partial<MedicineInput>
) {
  return prisma.medicine.update({
    where: { id: medicineId },
    data,
  });
}
