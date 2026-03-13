"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";

export async function getSessionPharmacy() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "PHARMACY") {
    throw new Error("Unauthorized");
  }

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
    select: { id: true, name: true, status: true },
  });

  if (!pharmacy) {
    throw new Error("Pharmacy profile not found");
  }

  return pharmacy;
}
