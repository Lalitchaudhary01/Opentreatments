"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

type CreateOfferInput = {
  name: string;
  offerType: string;
  discountValue: number;
  minOrderValue?: number;
  startDate?: Date;
  endDate?: Date;
};

export async function createPharmacyOffer(input: CreateOfferInput) {
  const pharmacy = await getSessionPharmacy();

  const offer = await prisma.pharmacyOffer.create({
    data: {
      pharmacyId: pharmacy.id,
      name: input.name.trim(),
      offerType: input.offerType.trim() || "PERCENTAGE",
      discountValue: input.discountValue,
      minOrderValue: input.minOrderValue ?? null,
      startDate: input.startDate ?? null,
      endDate: input.endDate ?? null,
      isActive: true,
    },
  });

  revalidatePath("/pharmacy/pricing");
  revalidatePath("/pharmacy/overview");

  return offer;
}

export async function setPharmacyOfferStatus(offerId: string, isActive: boolean) {
  await getSessionPharmacy();

  const updated = await prisma.pharmacyOffer.update({
    where: { id: offerId },
    data: { isActive },
  });

  revalidatePath("/pharmacy/pricing");
  return updated;
}

export async function getPharmacyOffers() {
  const pharmacy = await getSessionPharmacy();

  return prisma.pharmacyOffer.findMany({
    where: { pharmacyId: pharmacy.id },
    orderBy: { createdAt: "desc" },
  });
}
