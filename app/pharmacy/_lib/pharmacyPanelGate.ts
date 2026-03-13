import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";

export async function getPharmacyPanelGate() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth");
  if (session.user.role !== "PHARMACY") redirect("/auth");

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
    select: { id: true, status: true, name: true },
  });

  if (!pharmacy) redirect("/auth?mode=pharmacy-details");

  const [catalogCount, inventoryCount, ordersCount] = await Promise.all([
    prisma.medicine.count({ where: { pharmacyId: pharmacy.id } }),
    prisma.stockEntry.count({ where: { pharmacyId: pharmacy.id } }),
    prisma.order.count({ where: { pharmacyId: pharmacy.id } }),
  ]);

  const firstTimeOperationalState =
    catalogCount === 0 && inventoryCount === 0 && ordersCount === 0;

  return {
    pharmacy,
    firstTimeOperationalState,
  };
}
