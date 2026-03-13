"use server";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

export async function getPharmacyEarningsSummary() {
  const pharmacy = await getSessionPharmacy();

  const sales = await prisma.pharmacySale.findMany({
    where: { pharmacyId: pharmacy.id, status: "COMPLETED" },
    select: {
      total: true,
      soldAt: true,
      paymentMethod: true,
    },
    orderBy: { soldAt: "desc" },
    take: 500,
  });

  const totalRevenue = sales.reduce((acc, item) => acc + item.total, 0);
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const weekMs = 7 * 24 * 60 * 60 * 1000;

  const todayRevenue = sales
    .filter((item) => item.soldAt >= todayStart)
    .reduce((acc, item) => acc + item.total, 0);

  const last7DaysRevenue = sales
    .filter((item) => now - item.soldAt.getTime() <= weekMs)
    .reduce((acc, item) => acc + item.total, 0);

  const paymentMix = sales.reduce<Record<string, number>>((acc, item) => {
    acc[item.paymentMethod] = (acc[item.paymentMethod] || 0) + item.total;
    return acc;
  }, {});

  return {
    totalRevenue,
    todayRevenue,
    last7DaysRevenue,
    paymentMix,
    totalSales: sales.length,
  };
}
