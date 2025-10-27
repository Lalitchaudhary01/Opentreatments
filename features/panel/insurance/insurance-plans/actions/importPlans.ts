"use server";

import prisma from "@/lib/prisma";

interface ImportPlanInput {
  name: string;
  description?: string;
  coverageDetails: Record<string, any>;
  premium: number;
  coverageAmount: number;
}

export async function importPlans(companyId: string, plans: ImportPlanInput[]) {
  try {
    const createdPlans = await prisma.plan.createMany({
      data: plans.map((plan) => ({
        ...plan,
        companyId,
      })),
    });
    return createdPlans;
  } catch (error) {
    console.error("❌ Error importing plans:", error);
    throw new Error("Failed to import plans");
  }
}
