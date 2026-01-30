"use server";

import prisma from "@/lib/prisma";
import { InventoryChangeType } from "@prisma/client";

export async function reduceStockOnSale(
  pharmacyId: string,
  stockEntryId: string,
  quantity: number
) {
  return prisma.$transaction(async (tx) => {
    const entry = await tx.stockEntry.findUniqueOrThrow({
      where: { id: stockEntryId },
    });

    if (entry.quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    const updated = await tx.stockEntry.update({
      where: { id: stockEntryId },
      data: {
        quantity: { decrement: quantity },
      },
    });

    await tx.inventoryLog.create({
      data: {
        pharmacyId,
        medicineId: entry.medicineId,
        stockEntryId: entry.id,
        changeType: InventoryChangeType.SALE,
        quantityChanged: quantity,
        note: "Reduced on sale",
      },
    });

    return updated;
  });
}
