"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

type SettingsInput = {
  billingPrefix?: string;
  lowStockThreshold?: number;
  enableUPI?: boolean;
  roundOffBills?: boolean;
  allowSubstitutes?: boolean;
  requireRxForScheduleH?: boolean;
  sendOrderSms?: boolean;
};

export async function updatePharmacyPanelSettings(input: SettingsInput) {
  const pharmacy = await getSessionPharmacy();

  const settings = await prisma.pharmacySettings.upsert({
    where: { pharmacyId: pharmacy.id },
    update: {
      billingPrefix: input.billingPrefix,
      lowStockThreshold: input.lowStockThreshold,
      enableUPI: input.enableUPI,
      roundOffBills: input.roundOffBills,
      allowSubstitutes: input.allowSubstitutes,
      requireRxForScheduleH: input.requireRxForScheduleH,
      sendOrderSms: input.sendOrderSms,
    },
    create: {
      pharmacyId: pharmacy.id,
      billingPrefix: input.billingPrefix ?? "INV",
      lowStockThreshold: input.lowStockThreshold ?? 20,
      enableUPI: input.enableUPI ?? true,
      roundOffBills: input.roundOffBills ?? false,
      allowSubstitutes: input.allowSubstitutes ?? true,
      requireRxForScheduleH: input.requireRxForScheduleH ?? true,
      sendOrderSms: input.sendOrderSms ?? true,
    },
  });

  revalidatePath("/pharmacy/settings");
  return settings;
}

export async function getPharmacyPanelSettings() {
  const pharmacy = await getSessionPharmacy();

  return prisma.pharmacySettings.findUnique({
    where: { pharmacyId: pharmacy.id },
  });
}
