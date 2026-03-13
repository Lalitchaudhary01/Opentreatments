"use server";

import { SalePaymentMethod, SaleStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

type SaleItemInput = {
  medicineId?: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
};

type CreateSaleInput = {
  customerId?: string;
  paymentMethod: SalePaymentMethod;
  discount?: number;
  tax?: number;
  items: SaleItemInput[];
};

export async function createPharmacySale(input: CreateSaleInput) {
  const pharmacy = await getSessionPharmacy();

  if (!input.items.length) throw new Error("At least one sale item is required");

  const subtotal = input.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const discount = Math.max(0, input.discount || 0);
  const tax = Math.max(0, input.tax || 0);
  const total = Math.max(0, subtotal - discount + tax);

  const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;

  const sale = await prisma.pharmacySale.create({
    data: {
      pharmacyId: pharmacy.id,
      customerId: input.customerId || null,
      invoiceNumber,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod: input.paymentMethod,
      status: SaleStatus.COMPLETED,
      items: {
        create: input.items.map((item) => ({
          medicineId: item.medicineId || null,
          medicineName: item.medicineName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.quantity * item.unitPrice,
        })),
      },
    },
    include: { items: true },
  });

  revalidatePath("/pharmacy/billing");
  revalidatePath("/pharmacy/earnings");
  revalidatePath("/pharmacy/analytics");
  revalidatePath("/pharmacy/overview");

  return sale;
}

export async function getPharmacySales(limit = 50) {
  const pharmacy = await getSessionPharmacy();

  return prisma.pharmacySale.findMany({
    where: { pharmacyId: pharmacy.id },
    include: {
      items: true,
      customer: { select: { id: true, name: true, phone: true } },
    },
    orderBy: { soldAt: "desc" },
    take: limit,
  });
}
