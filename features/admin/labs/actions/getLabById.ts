"use server";

import prisma from "@/lib/prisma";
import { AdminLab, LabStatus } from "../types/adminLab";

export async function getLabById(labId: string): Promise<AdminLab | null> {
  const lab = await prisma.labCompany.findUnique({
    where: { id: labId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!lab) return null;

  return {
    id: lab.id,
    name: lab.name,
    ownerName: lab.user?.name ?? "",
    email: lab.email,
    phone: lab.phone ?? "",
    registrationNumber: lab.registrationNumber ?? "",
    address: lab.address,
    city: lab.city ?? "",
    state: lab.state ?? "",
    country: lab.country ?? "",
    pincode: lab.pincode ?? "",
    status: lab.status as LabStatus,
    createdAt: lab.createdAt.toISOString(),
    updatedAt: lab.updatedAt.toISOString(),
  };
}
