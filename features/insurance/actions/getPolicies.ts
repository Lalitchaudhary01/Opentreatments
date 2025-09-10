"use server";

import prisma from "@/lib/prisma";
import { PolicySummary } from "../types/insurance";

export async function getPolicies(userId: string): Promise<PolicySummary[]> {
  try {
    const policies = await prisma.policy.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        provider: true,
        sumInsured: true,
        cashless: true,
      },
    });

    return policies;
  } catch (error) {
    console.error("❌ getPolicies error:", error);
    throw new Error("Failed to fetch policies");
  }
}
