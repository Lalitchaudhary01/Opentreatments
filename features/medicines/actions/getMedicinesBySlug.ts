"use server";

import prisma from "@/lib/prisma";
import { MedicineDetail } from "../types/medicine";

export async function getMedicineBySlug(
  slug: string
): Promise<MedicineDetail | null> {
  const medicine = await prisma.medicine.findUnique({
    where: { slug },
    include: {
      pharmacy: true,
      substitutes: {
        include: {
          substitute: { include: { pharmacy: true } },
        },
      },
      priceTrends: { orderBy: { date: "desc" } },
    },
  });

  if (!medicine) return null;

  return {
    id: medicine.id,
    name: medicine.name,
    genericName: medicine.genericName,
    form: medicine.form,
    strength: medicine.strength,
    packSize: medicine.packSize,
    price: medicine.price,
    pharmacy: medicine.pharmacy,
    availability: medicine.availability,
    slug: medicine.slug,
    description: medicine.description ?? null,
    rxRequired: medicine.rxRequired ?? null,
    substitutes: medicine.substitutes.map((s) => ({
      id: s.substitute.id,
      name: s.substitute.name,
      form: s.substitute.form,
      strength: s.substitute.strength,
      price: s.substitute.price,
      pharmacy: s.substitute.pharmacy,
    })),
    priceTrends: medicine.priceTrends,
    nearbyPharmacies: [], // map integration later
  };
}
