"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AdminUpdateHospitalInput } from "../types";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized – Admin only");
  }
}

export async function adminUpdateHospital(data: AdminUpdateHospitalInput) {
  await ensureAdmin();

  const { hospitalId, ...rest } = data;

  return prisma.hospital.update({
    where: { id: hospitalId },
    data: rest,
  });
}
