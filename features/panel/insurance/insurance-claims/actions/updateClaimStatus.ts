"use server";

import prisma from "@/lib/prisma";
import { ClaimStatus, Claim } from "../types/insuranceClaim";

// Company approves/rejects a claim
export async function updateClaimStatus(
  claimId: string,
  status: ClaimStatus
): Promise<Claim> {
  return await prisma.claim.update({
    where: { id: claimId },
    data: { status },
  });
}
