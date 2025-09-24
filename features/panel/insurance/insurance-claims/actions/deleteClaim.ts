"use server";

import prisma from "@/lib/prisma";

// User cancels/deletes claim
export async function deleteClaim(claimId: string): Promise<void> {
  await prisma.claim.delete({
    where: { id: claimId },
  });
}
