"use server";

import prisma from "@/lib/prisma";

export async function getPlans(companyId: string) {
  try {
    return await prisma.plan.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("❌ Error fetching plans:", error);
    throw new Error("Failed to fetch plans");
  }
}
