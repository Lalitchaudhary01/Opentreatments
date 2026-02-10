"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";
import { UpsertServiceInput } from "../types";

export async function upsertService(
  id: string | null,
  data: UpsertServiceInput
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  if (id) {
    await prisma.service.update({
      where: { id },
      data,
    });
  } else {
    await prisma.service.create({
      data: {
        ...data,
        hospitalId: hospital.id,
      },
    });
  }

  revalidatePath("/hospital/services");
}
