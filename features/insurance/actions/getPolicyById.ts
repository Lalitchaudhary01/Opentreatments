"use server";

import prisma from "@/lib/prisma";
import { Policy } from "../types/insurance";

export async function getPolicyById(policyId: string): Promise<Policy | null> {
  try {
    const policy = await prisma.policy.findUnique({
      where: { id: policyId },
    });

    if (!policy) return null;

    return {
      ...policy,
      startDate: policy.startDate.toISOString(),
      endDate: policy.endDate.toISOString(),
      createdAt: policy.createdAt.toISOString(),
      updatedAt: policy.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("❌ getPolicyById error:", error);
    throw new Error("Failed to fetch policy");
  }
}
