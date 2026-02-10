"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";
import { CreateFacilityInput } from "../types";

export async function addFacility(data: CreateFacilityInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  const created = await prisma.facility.create({
    data: {
      name: data.name,
      description: data.description,
      hospitalId: hospital.id,
    },
  });

  revalidatePath("/hospital/facilities");
  return created;
}
