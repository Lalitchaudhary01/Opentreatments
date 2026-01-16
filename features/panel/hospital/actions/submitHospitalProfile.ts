"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { SubmitHospitalProfileInput } from "../types";

export async function submitHospitalProfile(data: SubmitHospitalProfileInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const existing = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });

  if (existing) throw new Error("Hospital profile already exists.");

  return prisma.hospital.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });
}
