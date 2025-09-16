// actions/getDoctorById.ts
"use server";

import prisma from "@/lib/prisma";
import { Doctor } from "@/types/doctor";

export async function getDoctorById(id: string): Promise<Doctor | null> {
  return prisma.doctor.findUnique({
    where: { id },
  });
}
