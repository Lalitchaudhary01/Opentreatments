import prisma from "@/lib/prisma";
import { UserClaim } from "../types/userInsuranceCompany";

interface SubmitClaimInput {
  userId: string;
  companyId: string;
  planId: string;
  billDetails: any;
}

export async function submitClaim(data: SubmitClaimInput): Promise<UserClaim> {
  const claim = await prisma.claim.create({
    data: {
      userId: data.userId,
      companyId: data.companyId,
      planId: data.planId,
      billDetails: data.billDetails,
    },
  });
  return claim;
}
