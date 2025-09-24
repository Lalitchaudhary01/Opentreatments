"use server";

import prisma from "@/lib/prisma";

export async function deletePlan(planId: string) {
  try {
    await prisma.plan.delete({
      where: { id: planId },
    });
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting plan:", error);
    throw new Error("Failed to delete plan");
  }
}
