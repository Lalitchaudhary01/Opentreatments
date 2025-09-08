"use server";

import prisma from "@/lib/prisma";
import { Hospital } from "../types/hospital";

interface UpdateHospitalInput {
  id: string;
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
}

export async function updateHospital(
  data: UpdateHospitalInput
): Promise<Hospital> {
  try {
    const { id, ...updateData } = data;

    const hospital = await prisma.hospital.update({
      where: { id },
      data: updateData,
      include: {
        services: true,
        facilities: true,
        insurances: true,
        doctors: true,
        procedures: true,
      },
    });
    //@ts-ignore
    return hospital;
  } catch (error) {
    console.error("❌ Error updating hospital:", error);
    throw new Error("Failed to update hospital");
  }
}
