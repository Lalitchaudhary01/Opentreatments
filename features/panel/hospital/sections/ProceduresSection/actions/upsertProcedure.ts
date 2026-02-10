"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";
import { UpsertProcedureInput } from "../types";

export async function upsertProcedure(
  id: string | null,
  data: UpsertProcedureInput
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  if (id) {
    await prisma.procedure.update({
      where: { id },
      data,
    });
  } else {
    await prisma.procedure.create({
      data: {
        ...data,
        hospitalId: hospital.id,
      },
    });
  }

  revalidatePath("/hospital/procedures");
}
