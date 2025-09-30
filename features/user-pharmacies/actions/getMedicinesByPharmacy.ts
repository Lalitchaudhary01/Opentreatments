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
        description: true,
        price: true,
        stock: true,
        pharmacyId: true,
        createdAt: true,
        updatedAt: true,
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
