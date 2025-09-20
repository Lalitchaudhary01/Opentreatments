"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getMedicineById(medicineId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "PHARMACY") throw new Error("Forbidden");

  // check pharmacy
  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
  if (!pharmacy) throw new Error("Pharmacy not found");

  // fetch specific medicine
  const medicine = await prisma.medicine.findUnique({
    where: {
      id: medicineId,
      pharmacyId: pharmacy.id,
    },
    include: {
      stock: true,
      substitutes: true,
      substituteFor: true,
    },
  });

  if (!medicine) throw new Error("Medicine not found");
  return medicine;
}
