"use server";

import prisma from "@/lib/prisma";
import { HospitalEstimate } from "../types/hospitalEstimate";

// ✅ Add Estimate
export async function addEstimate(
  data: Omit<HospitalEstimate, "id" | "createdAt" | "updatedAt">
) {
  return prisma.estimate.create({
    data,
  });
}

// ✅ Get all estimates for a hospital
export async function getEstimates(hospitalId: string) {
  return prisma.estimate.findMany({
    where: { hospitalId },
    include: {
      procedure: true,
      insurance: true,
    },
  });
}

// ✅ Update estimate
export async function updateEstimate(
  id: string,
  data: Partial<
    Omit<HospitalEstimate, "id" | "hospitalId" | "createdAt" | "updatedAt">
  >
) {
  return prisma.estimate.update({
    where: { id },
    data,
  });
}

// ✅ Delete estimate
export async function deleteEstimate(id: string) {
  return prisma.estimate.delete({
    where: { id },
  });
}
