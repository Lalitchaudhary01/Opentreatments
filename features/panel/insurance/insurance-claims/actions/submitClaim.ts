"use server";

import prisma from "@/lib/prisma";
import { Claim, BillDetails } from "../types/insuranceClaim";

// User submits a claim for a plan under a company
export async function submitClaim(
  userId: string,
  companyId: string,
  planId: string,
  billDetails: BillDetails
): Promise<Claim> {
  return await prisma.claim.create({
    data: {
      userId,
      companyId,
      planId,
      billDetails,
      status: "PENDING",
    },
  });
}
