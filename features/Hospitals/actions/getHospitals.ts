"use server";

import prisma from "@/lib/prisma";

interface GetHospitalsParams {
  search?: string;
  city?: string;
  specialization?: string;
}

export async function getHospitals(params: GetHospitalsParams = {}) {
  const { search, city, specialization } = params;

  return prisma.hospital.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { city: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        city ? { city: { equals: city, mode: "insensitive" } } : {},
        specialization
          ? {
              specializations: {
                some: { name: { equals: specialization, mode: "insensitive" } },
              },
            }
          : {},
      ],
    },
    include: {
      //@ts-ignore
      specializations: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
