"use server";

import prisma from "@/lib/prisma";
import type { IndependentDoctor } from "../types/independentDoctor";

export type GetDoctorsFilters = {
  name?: string;
  specialization?: string;
  specialties?: string[];
  city?: string;
};

export async function getDoctors(
  filters?: GetDoctorsFilters
): Promise<IndependentDoctor[]> {
  try {
    const where: any = {};

    if (filters?.name) {
      where.name = { contains: filters.name, mode: "insensitive" };
    }

    if (filters?.specialization) {
      where.specialization = {
        contains: filters.specialization,
        mode: "insensitive",
      };
    }

    if (filters?.specialties && filters.specialties.length > 0) {
      where.specialties = { hasSome: filters.specialties };
    }

    if (filters?.city) {
      where.city = { equals: filters.city, mode: "insensitive" };
    }

    const doctors = await prisma.independentDoctor.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        consultations: true, // optional: include consultations if needed
      },
    });

    //@ts-ignore
    return doctors as IndependentDoctor[];
  } catch (error) {
    console.error("❌ getDoctors error:", error);
    throw new Error("Failed to fetch doctors");
  }
}
