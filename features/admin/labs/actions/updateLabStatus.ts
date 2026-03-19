"use server";

import prisma from "@/lib/prisma";
import { LabStatus } from "../types/adminLab";

export async function updateLabStatus(labId: string, status: LabStatus | "DELETE") {
  if (status === "DELETE") {
    await prisma.labCompany.delete({
      where: { id: labId },
    });
    return { success: true, message: "Laboratory deleted" };
  }

  const updated = await prisma.labCompany.update({
    where: { id: labId },
    data: { status },
  });

  return {
    id: updated.id,
    status: updated.status as LabStatus,
    updatedAt: updated.updatedAt.toISOString(),
  };
}
