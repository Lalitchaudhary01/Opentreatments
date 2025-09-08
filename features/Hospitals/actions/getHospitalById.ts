"use server";

import prisma from "@/lib/prisma";

export async function getHospitalById(id: string) {
  return prisma.hospital.findUnique({
    where: { id },
    //@ts-ignore
    include: { specializations: true },
  });
}
