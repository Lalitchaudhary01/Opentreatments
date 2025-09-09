"use server";

import prisma from "@/lib/prisma";
import type { Hospital } from "../types/hospital";

export interface GetHospitalsOptions {
  search?: string; // search by name
  city?: string;
  serviceName?: string; // filter hospitals that have this service
  skip?: number;
  take?: number;
}

export async function getHospitals(
  opts: GetHospitalsOptions = {}
): Promise<Hospital[]> {
  try {
    const where: any = {};

    if (opts.search) {
      where.name = { contains: opts.search, mode: "insensitive" };
    }

    if (opts.city) {
      where.city = { equals: opts.city, mode: "insensitive" };
    }

    if (opts.serviceName) {
      where.services = {
        some: { name: { contains: opts.serviceName, mode: "insensitive" } },
      };
    }

    const hospitals = await prisma.hospital.findMany({
      where,
      skip: opts.skip ?? 0,
      take: opts.take ?? 20,
      orderBy: { createdAt: "desc" },
      include: {
        // light include for listing
        services: { select: { id: true, name: true, cost: true } },
        facilities: { select: { id: true, name: true } },
        insurances: { select: { id: true, name: true } },
      },
    });

    return hospitals as unknown as Hospital[];
  } catch (error) {
    console.error("❌ getHospitals error:", error);
    throw new Error("Failed to fetch hospitals");
  }
}
