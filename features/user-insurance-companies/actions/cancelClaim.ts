import prisma from "@/lib/prisma";

export async function cancelClaim(claimId: string, userId: string) {
  // Only allow cancel if claim belongs to user
  return prisma.claim.deleteMany({
    where: { id: claimId, userId },
  });
}
