"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function searchMedicines(query: string) {
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

  return prisma.medicine.findMany({
    where: {
      pharmacyId: pharmacy.id,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: { createdAt: "desc" },
  });
}