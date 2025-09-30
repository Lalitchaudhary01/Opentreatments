// /user-pharmacies/actions/getApprovedPharmacies.ts
"use server";

import prisma from "@/lib/prisma";
import { UserPharmacy } from "../types/userPharmacy";

export async function getApprovedPharmacies(): Promise<UserPharmacy[]> {
  try {
    const pharmacies = await prisma.pharmacy.findMany({
      where: { status: "APPROVED" },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return pharmacies;
  } catch (error) {
    console.error("❌ Error in getApprovedPharmacies:", error);
    return [];
  }
}
