"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HospitalStatus } from "../types/hospitalProfile";
import slugify from "slugify";

export async function submitHospitalProfile(data: {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  image?: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  // check if hospital already exists for this user
  const existing = await prisma.hospital.findFirst({
    where: { userId: session.user.id },
  });

  if (existing) {
    throw new Error("Hospital profile already exists");
  }

  const slug = slugify(data.name, { lower: true, strict: true });

  const profile = await prisma.hospital.create({
    data: {
      userId: session.user.id,
      name: data.name,
      slug,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      phone: data.phone,
      email: data.email,
      website: data.website,
      logo: data.logo,
      image: data.image,
      status: HospitalStatus.PENDING,
    },
  });

  return profile;
}
