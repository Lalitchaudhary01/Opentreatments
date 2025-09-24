import prisma from "@/lib/prisma";
import { InsuranceStatus } from "../types/insuranceProfile";

interface AdminUpdateInsuranceInput {
  companyId: string;
  status?: InsuranceStatus;
  name?: string;
  email?: string;
  delete?: boolean;
}

/**
 * Admin approves/rejects/updates/deletes company profile
 */
export async function adminUpdateInsurance(input: AdminUpdateInsuranceInput) {
  if (input.delete) {
    return prisma.insuranceCompany.delete({
      where: { id: input.companyId },
    });
  }

  return prisma.insuranceCompany.update({
    where: { id: input.companyId },
    data: {
      status: input.status,
      name: input.name,
      email: input.email,
      updatedAt: new Date(),
    },
  });
}
