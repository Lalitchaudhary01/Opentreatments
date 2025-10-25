"use server";

import prisma from "@/lib/prisma";
import { AdminHospital, HospitalStatus } from "../types/adminHospital";

export async function getHospitals(
  status?: HospitalStatus
): Promise<AdminHospital[]> {
  const hospitals = await prisma.hospital.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
  });

  return hospitals.map((h) => ({
    id: h.id,
    name: h.name,
    email: h.email || "",
    phone: h.phone || "",
    address: h.address || "",
    status: h.status as HospitalStatus,
    createdAt: h.createdAt,
  }));
}
