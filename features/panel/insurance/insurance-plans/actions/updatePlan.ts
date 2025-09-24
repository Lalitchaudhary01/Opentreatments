"use server";

import prisma from "@/lib/prisma";

interface UpdatePlanInput {
  name?: string;
  description?: string;
  coverageDetails?: Record<string, any>;
  premium?: number;
}

export async function updatePlan(planId: string, data: UpdatePlanInput) {
  try {
    const updatedPlan = await prisma.plan.update({
      where: { id: planId },
      data,
    });
    return updatedPlan;
  } catch (error) {
    console.error("❌ Error updating plan:", error);
    throw new Error("Failed to update plan");
  }
}
