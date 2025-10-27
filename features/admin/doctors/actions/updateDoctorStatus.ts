"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  DoctorStatus,
  UpdateDoctorStatusInput,
  DeleteDoctorInput,
} from "../types/adminDoctor";

export async function updateDoctorStatus(data: UpdateDoctorStatusInput) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin only");
  }

  const { doctorId, status } = data;

  const updated = await prisma.independentDoctor.update({
    where: { id: doctorId },
    data: { status },
  });

  return updated;
}

export async function deleteDoctor(data: DeleteDoctorInput) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin only");
  }

  const { doctorId } = data;

  await prisma.independentDoctor.delete({
    where: { id: doctorId },
  });

  return { success: true };
}
