"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { invalidatePharmacyPanelCache } from "../../cache";

export async function deleteStockEntry(stockEntryId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "PHARMACY") {
    throw new Error("Unauthorized");
  }

  const stock = await prisma.stockEntry.findUnique({
    where: { id: stockEntryId },
  });
  if (!stock) throw new Error("Stock entry not found");

  // Optional: delete logs also if needed
  await prisma.inventoryLog.deleteMany({
    where: { stockEntryId },
  });

  const deleted = await prisma.stockEntry.delete({
    where: { id: stockEntryId },
  });

  invalidatePharmacyPanelCache({
    pharmacyId: stock.pharmacyId,
    paths: ["/pharmacy/overview", "/pharmacy/inventory", "/pharmacy/catalog"],
  });

  return deleted;
}
