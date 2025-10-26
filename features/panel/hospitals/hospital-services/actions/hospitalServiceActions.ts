"use server";

import prisma from "@/lib/prisma";
import {
  HospitalService,
  CreateHospitalServiceInput,
  UpdateHospitalServiceInput,
} from "../types/hospitalServices";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Get logged-in hospitalId from session
 */
async function getHospitalIdFromSession(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL" || !session.user.id) {
    throw new Error("Unauthorized: Hospital login required");
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });

  if (!hospital) {
    throw new Error("Hospital profile not found");
  }

  return hospital.id;
}

/**
 * Add new hospital service
 */
export async function addService(
  data: CreateHospitalServiceInput
): Promise<HospitalService> {
  const hospitalId = await getHospitalIdFromSession();

  const service = await prisma.service.create({
    data: {
      ...data,
      hospitalId,
    },
  });

  return service;
}

/**
 * Get all services of logged-in hospital
 */
export async function getServices(): Promise<HospitalService[]> {
  const hospitalId = await getHospitalIdFromSession();

  const services = await prisma.service.findMany({
    where: { hospitalId },
    orderBy: { name: "asc" },
  });

  return services;
}

/**
 * Update service info
 */
export async function updateService(
  id: string,
  data: UpdateHospitalServiceInput
): Promise<HospitalService> {
  const hospitalId = await getHospitalIdFromSession();

  const updated = await prisma.service.update({
    where: { id, hospitalId },
    data,
  });

  return updated;
}

/**
 * Delete a service
 */
export async function deleteService(id: string): Promise<{ success: boolean }> {
  const hospitalId = await getHospitalIdFromSession();

  await prisma.service.delete({
    where: { id, hospitalId },
  });

  return { success: true };
}
