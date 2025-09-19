"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getPharmacyProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "PHARMACY") throw new Error("Forbidden");

  return prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
}
