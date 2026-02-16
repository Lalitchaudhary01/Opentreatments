"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { StockType } from "../types/pharmacyMedicine";

export async function addMedicine(data: {
  name: string;
  genericName?: string;
  brand?: string;
  category?: string;
  dosageForm?: string;
  strength?: string;
  manufacturer?: string;
  description?: string;
  price: number;
  mrp?: number;
  gst?: number;

  // initial stock
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  purchasePrice?: number;
  sellingPrice?: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "PHARMACY") throw new Error("Forbidden");

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
  if (!pharmacy) throw new Error("Pharmacy not found");

  return prisma.medicine.create({
    data: {
      pharmacyId: pharmacy.id,
      name: data.name,
      genericName: data.genericName,
      brand: data.brand,
      category: data.category,
      dosageForm: data.dosageForm,
      strength: data.strength,
      manufacturer: data.manufacturer,
      description: data.description,
      price: data.price,
      mrp: data.mrp,
      gst: data.gst,
      stock: {
        create: {
          batchNumber: data.batchNumber,
          quantity: data.quantity,
          expiryDate: data.expiryDate,
          purchasePrice: data.purchasePrice,
          sellingPrice: data.sellingPrice,
          type: "INCOMING" as StockType,
          pharmacyId: pharmacy.id,
        },
      },
    },
  });
}
