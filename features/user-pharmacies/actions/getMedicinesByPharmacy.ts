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

    return medicines.map((medicine) => ({
      id: medicine.id,
      name: medicine.name,
      description: medicine.description ?? undefined,
      price: medicine.price,
      stock: medicine.stock.reduce(
        (total, stockEntry) => total + stockEntry.quantity,
        0
      ),
      pharmacyId: medicine.pharmacyId,
      createdAt: medicine.createdAt.toISOString(),
      updatedAt: medicine.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error(
      `❌ Error in getMedicinesByPharmacy for pharmacy ${pharmacyId}:`,
      error
    );
    return [];
  }
}
