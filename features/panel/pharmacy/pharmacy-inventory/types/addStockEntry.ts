"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { StockType } from "../types/pharmacyInventory";

export async function addStockEntry(data: {
  medicineId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  purchasePrice?: number;
  sellingPrice?: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "PHARMACY") {
    throw new Error("Unauthorized");
  }

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
  if (!pharmacy) throw new Error("Pharmacy not found");

  return prisma.stockEntry.create({
    data: {
      pharmacyId: pharmacy.id,
      medicineId: data.medicineId,
      batchNumber: data.batchNumber,
      quantity: data.quantity,
      expiryDate: data.expiryDate,
      purchasePrice: data.purchasePrice,
      sellingPrice: data.sellingPrice,
      type: StockType.INCOMING,
    },
  });
}
