"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  CreateHospitalFacilityInput,
  UpdateHospitalFacilityInput,
} from "../types/hospitalFacility";

// ✅ Add new facility
export async function addFacility(data: CreateHospitalFacilityInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.facility.create({
    data: {
      ...data,
      hospitalId: session.user.id,
    },
  });
}

// ✅ Fetch all facilities of logged-in hospital
export async function getFacilities() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.facility.findMany({
    where: { hospitalId: session.user.id },
    orderBy: { name: "asc" },
  });
}

// ✅ Update facility
export async function updateFacility(data: UpdateHospitalFacilityInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.facility.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
    },
  });
}

// ✅ Delete facility
export async function deleteFacility(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.facility.delete({
    where: { id },
  });
}
