"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { invalidatePharmacyPanelCache } from "../../cache";

export async function deleteMedicine(medicineId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "PHARMACY") throw new Error("Forbidden");

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
  if (!pharmacy) throw new Error("Pharmacy not found");

  const deleted = await prisma.medicine.delete({
    where: {
      id: medicineId,
      pharmacyId: pharmacy.id,
    },
  });

  invalidatePharmacyPanelCache({
    pharmacyId: pharmacy.id,
    paths: ["/pharmacy/overview", "/pharmacy/catalog", "/pharmacy/inventory"],
  });

  return deleted;
}
