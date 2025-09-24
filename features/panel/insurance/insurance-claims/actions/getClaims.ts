"use server";

import prisma from "@/lib/prisma";
import { Claim } from "../types/insuranceClaim";

// Fetch all claims for logged-in company
export async function getClaims(companyId: string): Promise<Claim[]> {
  return await prisma.claim.findMany({
    where: { companyId },
    include: {
      plan: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
