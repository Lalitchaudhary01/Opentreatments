"use server";

import prisma from "@/lib/prisma";
import { Pharmacy } from "../types/medicine";

export async function getNearbyPharmacies(
  medicineId: string
): Promise<Pharmacy[]> {
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId },
    include: { pharmacy: true },
  });

  if (!medicine || !medicine.pharmacy) return [];

  // Simple: return the pharmacy attached
  // Later: implement geo lookup if you store lat/long
  return [medicine.pharmacy];
}
