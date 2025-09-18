"use server";

import prisma from "@/lib/prisma";
import { AdminHospital, HospitalStatus } from "../types/adminHospital";

export async function getHospitalById(
  id: string
): Promise<AdminHospital | null> {
  const h = await prisma.hospital.findUnique({ where: { id } });
  if (!h) return null;

  return {
    id: h.id,
    name: h.name,
    email: h.email,
    phone: h.phone || "",
    address: h.address || "",
    status: h.status as HospitalStatus,
    createdAt: h.createdAt,
  };
}
