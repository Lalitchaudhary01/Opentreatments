"use server";

import  prisma  from "@/lib/prisma";

export async function deleteStockEntry(stockEntryId: string) {
  return prisma.stockEntry.delete({
    where: { id: stockEntryId },
  });
}
