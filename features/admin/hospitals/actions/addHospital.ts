"use server";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { Hospital } from "../types/hospital";

interface AddHospitalInput {
  name: string;
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

export async function addHospital(data: AddHospitalInput): Promise<Hospital> {
  try {
    const slug = slugify(data.name);

    const hospital = await prisma.hospital.create({
      data: {
        ...data,
        slug,
      },
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
    console.error("❌ Error adding hospital:", error);
    throw new Error("Failed to add hospital");
  }
}
