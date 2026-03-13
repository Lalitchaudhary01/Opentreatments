"use server";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

export async function getPharmacyAnalyticsSnapshot() {
  const pharmacy = await getSessionPharmacy();

  const [ordersCount, activeOffers, customersCount, lowStockCount, topMedicines] =
    await Promise.all([
      prisma.order.count({ where: { pharmacyId: pharmacy.id } }),
      prisma.pharmacyOffer.count({
        where: { pharmacyId: pharmacy.id, isActive: true },
      }),
      prisma.pharmacyCustomer.count({ where: { pharmacyId: pharmacy.id } }),
      prisma.stockEntry.count({
        where: { pharmacyId: pharmacy.id, quantity: { lte: 20 } },
      }),
      prisma.medicine.findMany({
        where: { pharmacyId: pharmacy.id },
        select: { id: true, name: true, price: true, category: true },
        orderBy: { updatedAt: "desc" },
        take: 10,
      }),
    ]);

  return {
    ordersCount,
    activeOffers,
    customersCount,
    lowStockCount,
    topMedicines,
  };
}
