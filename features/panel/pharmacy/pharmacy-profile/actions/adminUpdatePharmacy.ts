"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { PharmacyStatus } from "../types/pharmacyProfile";


export async function adminUpdatePharmacy(
  pharmacyId: string,
  action: {
    status?: PharmacyStatus;
    delete?: boolean;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "ADMIN") throw new Error("Forbidden");

  if (action.delete) {
    return prisma.pharmacy.delete({
      where: { id: pharmacyId },
    });
  }

  return prisma.pharmacy.update({
    where: { id: pharmacyId },
    data: {
      status: action.status,
    },
  });
}
