"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function searchMedicines(query: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "PHARMACY") throw new Error("Forbidden");

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
  if (!pharmacy) throw new Error("Pharmacy not found");

  return prisma.medicine.findMany({
    where: {
      pharmacyId: pharmacy.id,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { genericName: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { stock: true },
    orderBy: { name: "asc" },
  });
}
