// "use server";

// import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth-options";
// import { HospitalStatus } from "../types/hospitalProfile";
// import slugify from "slugify";

// export async function submitHospitalProfile(data: {
//   name: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   phone?: string;
//   email?: string;
//   website?: string;
//   logo?: string;
//   image?: string;
// }) {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "HOSPITAL") {
//     throw new Error("Unauthorized");
//   }

//   // check if hospital already exists for this user
//   const existing = await prisma.hospital.findFirst({
//     where: { userId: session.user.id },
//   });

//   if (existing) {
//     throw new Error("Hospital profile already exists");
//   }

//   const slug = slugify(data.name, { lower: true, strict: true });

//   const profile = await prisma.hospital.create({
//     data: {
//       userId: session.user.id,
//       name: data.name,
//       slug,
//       address: data.address,
//       city: data.city,
//       state: data.state,
//       country: data.country,
//       phone: data.phone,
//       email: data.email,
//       website: data.website,
//       logo: data.logo,
//       image: data.image,
//       status: HospitalStatus.PENDING,
//     },
//   });

//   return profile;
// }

"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import slugify from "slugify";

export async function submitHospitalProfile(data: {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  image?: string;

  doctors: {
    name: string;
    specialization: string;
    experience?: number;
    profilePic?: string;
  }[];
  procedures: {
    name: string;
    description?: string;
    cost?: number;
    duration?: string;
  }[];
  services: { name: string; description?: string; cost?: number }[];
  facilities: { name: string; description?: string }[];
  insurances: { name: string; provider?: string; cashless?: boolean }[];
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  const slug = slugify(data.name, { lower: true, strict: true });

  const hospital = await prisma.hospital.create({
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
      status: "PENDING",

      doctors: { create: data.doctors },
      procedures: { create: data.procedures },
      services: { create: data.services },
      facilities: { create: data.facilities },
      Insurance: { create: data.insurances },
    },
    include: {
      doctors: true,
      procedures: true,
      services: true,
      facilities: true,
      Insurance: true,
    },
  });

  return hospital;
}
