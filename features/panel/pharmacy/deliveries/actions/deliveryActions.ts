"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

type DeliveryConfigInput = {
  homeDeliveryOn?: boolean;
  maxRadiusKm?: number;
  baseFee?: number;
  freeAboveAmount?: number | null;
  avgEtaMins?: number;
};

export async function updatePharmacyDeliveryConfig(input: DeliveryConfigInput) {
  const pharmacy = await getSessionPharmacy();

  const config = await prisma.pharmacyDeliveryConfig.upsert({
    where: { pharmacyId: pharmacy.id },
    update: {
      homeDeliveryOn: input.homeDeliveryOn,
      maxRadiusKm: input.maxRadiusKm,
      baseFee: input.baseFee,
      freeAboveAmount: input.freeAboveAmount ?? null,
      avgEtaMins: input.avgEtaMins,
    },
    create: {
      pharmacyId: pharmacy.id,
      homeDeliveryOn: input.homeDeliveryOn ?? false,
      maxRadiusKm: input.maxRadiusKm ?? 5,
      baseFee: input.baseFee ?? 0,
      freeAboveAmount: input.freeAboveAmount ?? null,
      avgEtaMins: input.avgEtaMins ?? 30,
    },
  });

  revalidatePath("/pharmacy/deliveries");
  return config;
}

export async function getPharmacyDeliveryConfig() {
  const pharmacy = await getSessionPharmacy();

  return prisma.pharmacyDeliveryConfig.findUnique({
    where: { pharmacyId: pharmacy.id },
  });
}
