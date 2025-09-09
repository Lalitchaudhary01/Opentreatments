"use server";

import prisma from "@/lib/prisma";

export async function deleteHospital(id: string) {
  if (!id) throw new Error("Hospital id is required");

  try {
    // delete child records first to avoid FK constraint errors (if cascade not configured)
    await prisma.$transaction([
      prisma.procedure.deleteMany({ where: { hospitalId: id } }),
      prisma.doctor.deleteMany({ where: { hospitalId: id } }),
      prisma.insurance.deleteMany({ where: { hospitalId: id } }),
      prisma.service.deleteMany({ where: { hospitalId: id } }),
      prisma.facility.deleteMany({ where: { hospitalId: id } }),
      prisma.hospital.delete({ where: { id } }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("❌ deleteHospital error:", error);
    throw new Error("Failed to delete hospital");
  }
}
