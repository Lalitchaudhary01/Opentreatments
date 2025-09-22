"use server";

import prisma from "@/lib/prisma";
import { UserMedicine } from "../types/userPharmacy";

export async function getMedicinesByPharmacy(
  pharmacyId: string
): Promise<UserMedicine[]> {
  try {
    const medicines = await prisma.medicine.findMany({
      where: { pharmacyId },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
      },
    });

    return medicines;
  } catch (error) {
    console.error(
      `❌ Error in getMedicinesByPharmacy for pharmacy ${pharmacyId}:`,
      error
    );
    return [];
  }
}
