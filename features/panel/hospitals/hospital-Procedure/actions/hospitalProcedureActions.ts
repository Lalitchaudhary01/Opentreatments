"use server";

import prisma from "@/lib/prisma";
import { HospitalProcedure } from "../types/hospitalProcedure";

// ✅ Add new procedure
export async function addProcedure(
  hospitalId: string,
  data: Omit<HospitalProcedure, "id" | "hospitalId">
): Promise<HospitalProcedure> {
  const procedure = await prisma.procedure.create({
    data: {
      ...data,
      hospitalId,
    },
  });
  return procedure;
}

// ✅ Get all procedures of hospital
export async function getProcedures(
  hospitalId: string
): Promise<HospitalProcedure[]> {
  return prisma.procedure.findMany({
    where: { hospitalId },
    orderBy: { name: "asc" },
  });
}

// ✅ Update procedure
export async function updateProcedure(
  id: string,
  data: Partial<Omit<HospitalProcedure, "id" | "hospitalId">>
): Promise<HospitalProcedure> {
  return prisma.procedure.update({
    where: { id },
    data,
  });
}

// ✅ Delete procedure
export async function deleteProcedure(id: string): Promise<void> {
  await prisma.procedure.delete({ where: { id } });
}
