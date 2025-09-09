"use server";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { AddHospitalInput } from "../types/hospital";

export interface UpdateHospitalInput extends Partial<AddHospitalInput> {
  id: string;
}

export async function updateHospital(data: UpdateHospitalInput) {
  if (!data?.id) throw new Error("Hospital id is required");

  try {
    // handle slug if name changed
    let slugUpdate: string | undefined = undefined;
    if (data.name) {
      const baseSlug = slugify(data.name);
      // check if some other hospital already uses that slug
      const conflict = await prisma.hospital.findFirst({
        where: { slug: baseSlug, NOT: { id: data.id } },
      });
      slugUpdate = conflict
        ? `${baseSlug}-${Date.now().toString().slice(-5)}`
        : baseSlug;
    }

    const updateData: any = {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(slugUpdate ? { slug: slugUpdate } : {}),
      ...(data.description !== undefined
        ? { description: data.description ?? null }
        : {}),
      ...(data.address !== undefined ? { address: data.address ?? null } : {}),
      ...(data.city !== undefined ? { city: data.city ?? null } : {}),
      ...(data.state !== undefined ? { state: data.state ?? null } : {}),
      ...(data.country !== undefined ? { country: data.country ?? null } : {}),
      ...(data.phone !== undefined ? { phone: data.phone ?? null } : {}),
      ...(data.email !== undefined ? { email: data.email ?? null } : {}),
      ...(data.website !== undefined ? { website: data.website ?? null } : {}),
      ...(data.logo !== undefined ? { logo: data.logo ?? null } : {}),
    };

    // relations: if arrays are provided, replace them (deleteMany -> create)
    if (Array.isArray(data.facilities)) {
      updateData.facilities = {
        deleteMany: {},
        create: data.facilities.map((f) => ({
          name: f.name,
          description: f.description ?? null,
        })),
      };
    }
    if (Array.isArray(data.services)) {
      updateData.services = {
        deleteMany: {},
        create: data.services.map((s) => ({
          name: s.name,
          cost: s.cost ?? null,
          description: s.description ?? null,
        })),
      };
    }
    if (Array.isArray(data.insurances)) {
      updateData.insurances = {
        deleteMany: {},
        create: data.insurances.map((i) => ({
          name: i.name,
          provider: i.provider ?? null,
        })),
      };
    }
    if (Array.isArray(data.doctors)) {
      updateData.doctors = {
        deleteMany: {},
        create: data.doctors.map((d) => ({
          name: d.name,
          specialization: d.specialization ?? null,
          experience: d.experience ?? null,
          profilePic: d.profilePic ?? null,
        })),
      };
    }
    if (Array.isArray(data.procedures)) {
      updateData.procedures = {
        deleteMany: {},
        create: data.procedures.map((p) => ({
          name: p.name,
          description: p.description ?? null,
          cost: p.cost ?? null,
          duration: p.duration ?? null,
        })),
      };
    }

    const hospital = await prisma.hospital.update({
      where: { id: data.id },
      data: updateData,
      include: {
        facilities: true,
        services: true,
        insurances: true,
        doctors: true,
        procedures: true,
      },
    });

    return hospital;
  } catch (error) {
    console.error("❌ updateHospital error:", error);
    throw new Error("Failed to update hospital");
  }
}
