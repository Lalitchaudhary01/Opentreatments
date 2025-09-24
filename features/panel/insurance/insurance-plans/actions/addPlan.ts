"use server";

import prisma from "@/lib/prisma";

interface AddPlanInput {
  name: string;
  description?: string;
  coverageDetails: Record<string, any>; // JSON object
  premium: number;
}

export async function addPlan(companyId: string, data: AddPlanInput) {
  try {
    const plan = await prisma.plan.create({
      data: {
        companyId,
        name: data.name,
        description: data.description,
        coverageDetails: data.coverageDetails,
        premium: data.premium,
      },
    });
    return plan;
  } catch (error) {
    console.error("❌ Error adding plan:", error);
    throw new Error("Failed to add plan");
  }
}
