"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";
import { UpsertInsuranceInput } from "../types";

export async function upsertInsurance(
  id: string | null,
  data: UpsertInsuranceInput
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  if (id) {
    await prisma.insurance.update({
      where: { id },
      data,
    });
  } else {
    await prisma.insurance.create({
      data: {
        ...data,
        cashless: data.cashless ?? false,
        hospitalId: hospital.id,
      },
    });
  }

  revalidatePath("/hospital/insurance");
}
