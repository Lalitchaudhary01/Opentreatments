"use server";

import prisma from "@/lib/prisma";
import { AdminLab, LabStatus } from "../types/adminLab";

export async function getLabs(status?: LabStatus): Promise<AdminLab[]> {
  const labs = await prisma.labCompany.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  return labs.map((lab) => ({
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
  }));
}
