"use server";

import { PrescriptionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

type CreatePrescriptionInput = {
  rxNumber: string;
  customerId?: string;
  orderId?: string;
  source?: string;
  notes?: string;
  imageUrl?: string;
};

export async function createPharmacyPrescription(input: CreatePrescriptionInput) {
  const pharmacy = await getSessionPharmacy();

  const rxNumber = input.rxNumber.trim();
  if (!rxNumber) throw new Error("Rx number is required");

  const prescription = await prisma.pharmacyPrescription.create({
    data: {
      pharmacyId: pharmacy.id,
      rxNumber,
      customerId: input.customerId || null,
      orderId: input.orderId || null,
      source: input.source?.trim() || "MANUAL",
      notes: input.notes?.trim() || null,
      imageUrl: input.imageUrl?.trim() || null,
      status: PrescriptionStatus.PENDING,
    },
  });

  revalidatePath("/pharmacy/prescriptions");
  revalidatePath("/pharmacy/overview");

  return prescription;
}

export async function updatePharmacyPrescriptionStatus(
  prescriptionId: string,
  status: PrescriptionStatus,
  notes?: string
) {
  await getSessionPharmacy();

  const updated = await prisma.pharmacyPrescription.update({
    where: { id: prescriptionId },
    data: {
      status,
      notes: notes?.trim() || undefined,
      verifiedAt: status === PrescriptionStatus.VERIFIED ? new Date() : null,
    },
  });

  revalidatePath("/pharmacy/prescriptions");
  revalidatePath("/pharmacy/overview");

  return updated;
}

export async function getPharmacyPrescriptions() {
  const pharmacy = await getSessionPharmacy();

  return prisma.pharmacyPrescription.findMany({
    where: { pharmacyId: pharmacy.id },
    include: {
      customer: {
        select: { id: true, name: true, phone: true },
      },
    },
    orderBy: { uploadedAt: "desc" },
    take: 100,
  });
}
