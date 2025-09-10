"use server";

import prisma from "@/lib/prisma";

export async function deletePolicy(policyId: string): Promise<boolean> {
  try {
    await prisma.policy.delete({
      where: { id: policyId },
    });
    return true;
  } catch (error) {
    console.error("❌ deletePolicy error:", error);
    return false;
  }
}
