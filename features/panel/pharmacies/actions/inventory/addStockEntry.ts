"use server";

import prisma from "@/lib/prisma";
import { InventoryChangeType, StockType } from "@prisma/client";
import { StockEntryInput } from "../../types/pharmacyInventory";

export async function addStockEntry(pharmacyId: string, data: StockEntryInput) {
  return prisma.$transaction(async (tx) => {
    const entry = await tx.stockEntry.create({
      data: {
        pharmacyId,
        medicineId: data.medicineId,
        batchNumber: data.batchNumber,
        quantity: data.quantity,
        expiryDate: data.expiryDate,
        purchasePrice: data.purchasePrice,
        sellingPrice: data.sellingPrice,
        type: data.type ?? StockType.INCOMING,
      },
    });

    await tx.inventoryLog.create({
      data: {
        pharmacyId,
        medicineId: data.medicineId,
        stockEntryId: entry.id,
        changeType: InventoryChangeType.MANUAL_ADJUSTMENT,
        quantityChanged: data.quantity,
        note: "Stock added",
      },
    });

    return entry;
  });
}
