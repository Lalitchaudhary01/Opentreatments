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
    where: { id: existing.id }, // ✅ safe update with unique ID
    data,
  });

  return updated;
}
