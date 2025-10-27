import prisma from "@/lib/prisma";
import { UserCompany } from "../types/userInsuranceCompany";

export async function getApprovedInsuranceCompanies(): Promise<UserCompany[]> {
  const companies = await prisma.insuranceCompany.findMany({
    where: { status: "APPROVED" },
    include: {
      plans: {
        include: {
          claims: true,
        },
      },
    },
  });

  return companies.map((c) => ({
    id: c.id,
    name: c.name,
    address: c.address || "",
    email: c.email,
    phone: c.contactPhone || "",
    status: "APPROVED" as const,
    plans: c.plans.map((plan) => ({
      ...plan,
      coverageDetails: plan.coverageDetails as any,
    })),
  }));
}
