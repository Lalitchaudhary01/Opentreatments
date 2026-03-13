"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

type CreateBranchInput = {
  name: string;
  phone?: string;
  city?: string;
  address?: string;
};

export async function createPharmacyBranch(input: CreateBranchInput) {
  const pharmacy = await getSessionPharmacy();

  const branch = await prisma.pharmacyBranch.create({
    data: {
      pharmacyId: pharmacy.id,
      name: input.name.trim(),
      phone: input.phone?.trim() || null,
      city: input.city?.trim() || null,
      address: input.address?.trim() || null,
      isActive: true,
    },
  });

  revalidatePath("/pharmacy/multistore");
  return branch;
}

export async function setPharmacyBranchStatus(branchId: string, isActive: boolean) {
  await getSessionPharmacy();

  const branch = await prisma.pharmacyBranch.update({
    where: { id: branchId },
    data: { isActive },
  });

  revalidatePath("/pharmacy/multistore");
  return branch;
}

export async function getPharmacyBranches() {
  const pharmacy = await getSessionPharmacy();

  return prisma.pharmacyBranch.findMany({
    where: { pharmacyId: pharmacy.id },
    orderBy: { createdAt: "desc" },
  });
}
