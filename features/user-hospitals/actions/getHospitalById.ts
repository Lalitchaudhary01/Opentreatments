"use server";
import prisma from "@/lib/prisma";
import { UserHospital } from "../types/userHospital";

export async function getHospitalById(
  id: string
): Promise<UserHospital | null> {
  const hospital = await prisma.hospital.findUnique({
    where: { id },
    include: {
      services: {
        select: {
          id: true,
          name: true,
          cost: true,
          description: true,
          category: true,
          duration: true,
        },
      },
    },
  });

  if (!hospital || hospital.status !== "APPROVED") {
    return null; // only approved hospitals are visible to users
  }

  return {
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
    doctors: [],
    procedures: hospital.services
      .filter((service) => service.category === "Procedure")
      .map((service) => ({
        id: service.id,
        name: service.name,
        cost: service.cost ?? undefined,
        duration: service.duration ?? undefined,
      })),
    services: hospital.services?.map((service) => ({
      id: service.id,
      name: service.name,
      cost: service.cost ?? undefined,
      description: service.description ?? undefined,
    })),
    facilities: [],
  };
}
