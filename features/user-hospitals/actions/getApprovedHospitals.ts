"use server";
import prisma from "@/lib/prisma";
import { UserHospital } from "../types/userHospital";

export async function getApprovedHospitals(): Promise<UserHospital[]> {
  const hospitals = await prisma.hospital.findMany({
    where: { status: "APPROVED" },
    include: {
      doctors: { select: { id: true, name: true, specialization: true } },
      procedures: {
        select: { id: true, name: true, cost: true, duration: true },
      },
      services: {
        select: { id: true, name: true, cost: true, description: true },
      },
      facilities: {
        select: { id: true, name: true, description: true },
      },
    },
  });

  return hospitals.map((hospital) => ({
    id: hospital.id,
    name: hospital.name,
    slug: hospital.slug,
    address: hospital.address ?? undefined,
    city: hospital.city ?? undefined,
    state: hospital.state ?? undefined,
    country: hospital.country ?? undefined,
    phone: hospital.phone ?? undefined,
    email: hospital.email ?? undefined,
    website: hospital.website ?? undefined,
    logo: hospital.logo ?? undefined,
    image: hospital.image ?? undefined,
    verified: hospital.verified,
    status: hospital.status,
    doctors: hospital.doctors,
    procedures: hospital.procedures.map((procedure) => ({
      id: procedure.id,
      name: procedure.name,
      cost: procedure.cost ?? undefined,
      duration: procedure.duration ?? undefined,
    })),
    services: hospital.services?.map((service) => ({
      id: service.id,
      name: service.name,
      cost: service.cost ?? undefined,
      description: service.description ?? undefined,
    })),
    facilities: hospital.facilities?.map((facility) => ({
      id: facility.id,
      name: facility.name,
      description: facility.description ?? undefined,
    })),
  }));
}
