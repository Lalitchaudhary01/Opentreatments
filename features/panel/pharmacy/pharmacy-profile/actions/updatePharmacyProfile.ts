"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function updatePharmacyProfile(data: {
  name?: string;
  ownerName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  gstNumber?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "PHARMACY") throw new Error("Forbidden");

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
  if (!pharmacy) throw new Error("Pharmacy profile not found");
  if (pharmacy.status !== "APPROVED") {
    throw new Error("Cannot update unless APPROVED");
  }

  return prisma.pharmacy.update({
    where: { userId: session.user.id },
    data,
  });
}
