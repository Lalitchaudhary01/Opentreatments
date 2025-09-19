// "use server";

// import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { HospitalStatus } from "../types/hospitalProfile";

// export async function updateHospitalProfile(data: {
//   name?: string;
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

//   const existing = await prisma.hospital.findFirst({
//     where: { userId: session.user.id },
//   });

//   if (!existing) throw new Error("Profile not found");

//   if (existing.status !== HospitalStatus.APPROVED) {
//     throw new Error("Profile can only be updated when APPROVED");
//   }

//   const updated = await prisma.hospital.update({
//     where: { id: existing.id }, // ✅ safe update with unique ID
//     data,
//   });

//   return updated;
// }

"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HospitalStatus } from "../types/hospitalProfile";

export async function updateHospitalProfile(data: {
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

  doctors?: {
    id?: string; // 👈 include id for existing doctors
    name: string;
    specialization: string;
    experience?: number;
    profilePic?: string;
  }[];
  procedures?: {
    id?: string;
    name: string;
    description?: string;
    cost?: number;
    duration?: string;
  }[];
  services?: {
    id?: string;
    name: string;
    description?: string;
    cost?: number;
  }[];
  facilities?: { id?: string; name: string; description?: string }[];
  insurances?: {
    id?: string;
    name: string;
    provider?: string;
    cashless?: boolean;
  }[];
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  const existing = await prisma.hospital.findFirst({
    where: { userId: session.user.id },
  });

  if (!existing) throw new Error("Profile not found");

  if (existing.status !== HospitalStatus.APPROVED) {
    throw new Error("Profile can only be updated when APPROVED");
  }

  const updated = await prisma.hospital.update({
    where: { id: existing.id },
    data: {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      phone: data.phone,
      email: data.email,
      website: data.website,
      logo: data.logo,
      image: data.image,

      // -------- Nested Updates ----------
      doctors: data.doctors
        ? {
            deleteMany: {}, // remove old
            create: data.doctors.map((d) => ({
              name: d.name,
              specialization: d.specialization,
              experience: d.experience,
              profilePic: d.profilePic,
            })),
          }
        : undefined,

      procedures: data.procedures
        ? {
            deleteMany: {},
            create: data.procedures.map((p) => ({
              name: p.name,
              description: p.description,
              cost: p.cost,
              duration: p.duration,
            })),
          }
        : undefined,

      services: data.services
        ? {
            deleteMany: {},
            create: data.services.map((s) => ({
              name: s.name,
              description: s.description,
              cost: s.cost,
            })),
          }
        : undefined,

      facilities: data.facilities
        ? {
            deleteMany: {},
            create: data.facilities.map((f) => ({
              name: f.name,
              description: f.description,
            })),
          }
        : undefined,

      Insurance: data.insurances
        ? {
            deleteMany: {},
            create: data.insurances.map((i) => ({
              name: i.name,
              provider: i.provider,
              cashless: i.cashless,
            })),
          }
        : undefined,
    },
    include: {
      doctors: true,
      procedures: true,
      services: true,
      facilities: true,
      Insurance: true,
    },
  });

  return updated;
}
