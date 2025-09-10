"use server";

import prisma from "@/lib/prisma";
import { PricePoint } from "../types/medicine";

export async function getPriceTrends(
  medicineId: string
): Promise<PricePoint[]> {
  return prisma.priceTrend.findMany({
    where: { medicineId },
    orderBy: { date: "asc" },
  });
}
