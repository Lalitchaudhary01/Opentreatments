"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateFacilityInput } from "../types";

export async function updateFacility(id: string, data: CreateFacilityInput) {
  const updated = await prisma.facility.update({
    where: { id },
    data,
  });

  revalidatePath("/hospital/facilities");
  return updated;
}
