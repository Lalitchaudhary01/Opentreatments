"use server";

import prisma from "@/lib/prisma";

export async function searchPlans(companyId: string, query: string) {
  try {
    return await prisma.plan.findMany({
      where: {
        companyId,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  } catch (error) {
    console.error("❌ Error searching plans:", error);
    throw new Error("Failed to search plans");
  }
}
