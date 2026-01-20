"use server";

import  prisma  from "@/lib/prisma";
import { MedicineInput } from "../../types/pharmacyMedicine";

export async function addMedicine(
  pharmacyId: string,
  data: MedicineInput
) {
  return prisma.medicine.create({
    data: {
      ...data,
      pharmacyId,
    },
  });
}
