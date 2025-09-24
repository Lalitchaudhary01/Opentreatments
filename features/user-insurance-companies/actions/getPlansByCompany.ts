import { InsurancePlan } from "@/features/panel/insurance/insurance-plans/types/insurancePlan";
import prisma from "@/lib/prisma";

export async function getPlansByCompany(
  companyId: string
): Promise<InsurancePlan[]> {
  return prisma.plan.findMany({
    where: { companyId },
  });
}
