"use server";

import prisma from "@/lib/prisma";
import { MedicineSummary } from "../types/medicine";

export async function getSubstitutes(
  medicineId: string
): Promise<MedicineSummary[]> {
  const subs = await prisma.substitute.findMany({
    where: { medicineId },
    include: {
      substitute: { include: { pharmacy: true } },
    },
  });

  return subs.map((s) => ({
    id: s.substitute.id,
    name: s.substitute.name,
    form: s.substitute.form,
    strength: s.substitute.strength,
    packSize: s.substitute.packSize,
    price: s.substitute.price,
    pharmacy: s.substitute.pharmacy,
    availability: s.substitute.availability,
  }));
}
