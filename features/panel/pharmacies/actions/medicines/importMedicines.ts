"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function importMedicines(medicines: any[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "PHARMACY") {
    throw new Error("Unauthorized");
  }

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });

  if (!pharmacy) {
    throw new Error("Pharmacy not found");
  }

  return prisma.medicine.createMany({
    data: medicines.map((med) => ({
      ...med,
      pharmacyId: pharmacy.id,
    })),
  });
}