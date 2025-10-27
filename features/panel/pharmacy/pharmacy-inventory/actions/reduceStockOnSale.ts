"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { InventoryChangeType, StockType } from "@prisma/client";

export async function reduceStockOnSale(data: {
  stockEntryId: string;
  quantity: number;
  reason: InventoryChangeType; // SALE, DAMAGE, EXPIRE, MANUAL_ADJUSTMENT
  note?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "PHARMACY") {
    throw new Error("Unauthorized");
  }

  const stock = await prisma.stockEntry.findUnique({
    where: { id: data.stockEntryId },
  });
  if (!stock) throw new Error("Stock entry not found");
  if (stock.quantity < data.quantity) throw new Error("Not enough stock");

  const updatedStock = await prisma.stockEntry.update({
    where: { id: stock.id },
    data: {
      quantity: { decrement: data.quantity },
      type: StockType.OUTGOING,
    },
  });

  // Log this change
  await prisma.inventoryLog.create({
    data: {
      stockEntryId: stock.id,
      medicineId: stock.medicineId,
      pharmacyId: stock.pharmacyId,
      changeType: data.reason,
      quantityChanged: data.quantity,
      note: data.note,
    },
  });

  return updatedStock;
}
