"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { HospitalStatus } from "../types/hospitalProfile";

export async function adminUpdateHospital(
  hospitalId: string,
  action: {
    status?: HospitalStatus;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    logo?: string;
    image?: string;
    delete?: boolean;
  }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (action.delete) {
    await prisma.hospital.delete({ where: { id: hospitalId } });
    return { success: true, message: "Hospital deleted" };
  }

  const updated = await prisma.hospital.update({
    where: { id: hospitalId },
    data: {
        //@ts-ignore
      status: action.status,
      name: action.name,
      address: action.address,
      city: action.city,
      state: action.state,
      country: action.country,
      phone: action.phone,
      email: action.email,
      website: action.website,
      logo: action.logo,
      image: action.image,
    },
  });

  return updated;
}
