"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";
import { UpsertEstimateInput } from "../types";

export async function upsertEstimate(
  id: string | null,
  data: UpsertEstimateInput
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  if (id) {
    await prisma.estimate.update({
      where: { id },
      data,
    });
  } else {
    await prisma.estimate.create({
      data: {
        ...data,
        hospitalId: hospital.id,
      },
    });
  }

  revalidatePath("/hospital/estimates");
}
