// actions/getDoctorById.ts
"use server";

import prisma from "@/lib/prisma";
import { AdminDoctor } from "../types/adminDoctor";

export async function getDoctorById(id: string): Promise<AdminDoctor | null> {
  //@ts-ignore
  return prisma.doctor.findUnique({
    where: { id },
  });
}
