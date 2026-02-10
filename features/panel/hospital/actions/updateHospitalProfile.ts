"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { SubmitHospitalProfileInput } from "../types";

export async function updateHospitalProfile(
  data: Partial<SubmitHospitalProfileInput>
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.hospital.update({
    where: { userId: session.user.id },
    data,
  });
}
