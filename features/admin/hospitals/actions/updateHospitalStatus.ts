"use server";

import prisma from "@/lib/prisma";
import { HospitalStatus } from "../types/adminHospital";

/**
 * Update hospital status or delete
 */
export async function updateHospitalStatus(
  id: string,
  status: HospitalStatus | "DELETE"
) {
  if (status === "DELETE") {
    await prisma.hospital.delete({
      where: { id },
    });
    return { success: true, message: "Hospital deleted" };
  }

  const updated = await prisma.hospital.update({
    where: { id },
    data: { status },
  });

  return { success: true, hospital: updated };
}
