"use server";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { AddHospitalInput, Hospital } from "../types/hospital";

export async function addHospital(data: AddHospitalInput): Promise<Hospital> {
  if (!data?.name) throw new Error("Hospital name is required");

  try {
    const baseSlug = slugify(data.name);
    let slug = baseSlug;
    const existing = await prisma.hospital.findUnique({ where: { slug } });
    if (existing) {
      slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;
    }

    const hospital = await prisma.hospital.create({
      data: {
        name: data.name,
        slug,
        description: data.description ?? null,
        address: data.address ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        country: data.country ?? null,
        phone: data.phone ?? null,
        email: data.email ?? null,
        website: data.website ?? null,
        logo: data.logo ?? null,
        image: data.image ?? null,
        verified: data.verified ?? false,
        emergencyAvailable: data.emergencyAvailable ?? false,
        bedCount: data.bedCount ?? null,
        availableBeds: data.availableBeds ?? null,
        rating: data.rating ?? null,
        totalReviews: data.totalReviews ?? null,
        type: data.type ?? null,

        facilities: {
          create:
            data.facilities?.map((f) => ({
              name: f.name,
              description: f.description ?? null,
            })) ?? [],
        },
        services: {
          create:
            data.services?.map((s) => ({
              name: s.name,
              cost: s.cost ?? null,
              description: s.description ?? null,
            })) ?? [],
        },
        insurances: {
          create:
            data.insurances?.map((i) => ({
              name: i.name,
              provider: i.provider ?? null,
              cashless: i.cashless ?? false,
            })) ?? [],
        },
        doctors: {
          create:
            data.doctors?.map((d) => ({
              name: d.name,
              specialization: d.specialization ?? "",
              experience: d.experience ?? null,
              profilePic: d.profilePic ?? null,
            })) ?? [],
        },
        procedures: {
          create:
            data.procedures?.map((p) => ({
              name: p.name,
              description: p.description ?? null,
              cost: p.cost ?? null,
              duration: p.duration ?? null,
            })) ?? [],
        },
      },
      include: {
        facilities: true,
        services: true,
        insurances: true,
        doctors: true,
        procedures: true,
      },
    });

    return hospital as unknown as Hospital;
  } catch (error) {
    console.error("❌ addHospital error:", error);
    throw new Error("Failed to add hospital");
  }
}
