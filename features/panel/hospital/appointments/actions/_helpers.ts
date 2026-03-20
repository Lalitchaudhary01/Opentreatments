"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export async function getHospitalFromSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  if (session.user.role !== "HOSPITAL") {
    throw new Error("Only hospital account can perform this action");
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
    select: { id: true, status: true, name: true },
  });

  if (!hospital) {
    throw new Error("Hospital profile not found");
  }

  return hospital;
}
