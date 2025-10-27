import { InsurancePlan } from "@/features/panel/insurance/insurance-plans/types/insurancePlan";
import prisma from "@/lib/prisma";

export async function getPlansByCompany(
  companyId: string
): Promise<InsurancePlan[]> {
  const plans = await prisma.plan.findMany({
    where: { companyId },
    include: {
      claims: true,
    },
  });

  return plans.map((plan) => ({
    ...plan,
    coverageDetails: plan.coverageDetails as any,
  }));
}
