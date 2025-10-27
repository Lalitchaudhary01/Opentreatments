// /features/user-insurance-companies/actions/getUserClaims.ts
import prisma from "@/lib/prisma"; // या जहाँ भी prisma client define है
import { UserClaim } from "../types/userInsuranceCompany";

export const getUserClaims = async (userId: string): Promise<UserClaim[]> => {
  const claims = await prisma.claim.findMany({
    where: { userId },
    include: { plan: true, company: true }, // optional, details for display
    orderBy: { createdAt: "desc" },
  });

  return claims.map((claim) => ({
    id: claim.id,
    userId: claim.userId,
    planId: claim.planId,
    companyId: claim.companyId,
    status: claim.status,
    billDetails: claim.billDetails,
    createdAt: claim.createdAt,
    updatedAt: claim.updatedAt,
  }));
};
