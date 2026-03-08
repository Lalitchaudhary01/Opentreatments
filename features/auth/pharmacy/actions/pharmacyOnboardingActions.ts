"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { PharmacyStatus } from "@/features/panel/pharmacy/pharmacy-profile/types/pharmacyProfile";
import { getServerSession } from "next-auth";

export type PharmacyOnboardingPayload = {
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  licenseNumber: string;
  gstNumber?: string;
};

export async function completePharmacyOnboarding(payload: PharmacyOnboardingPayload) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "PHARMACY") {
      return { ok: false as const, error: "Unauthorized" };
    }

    const existing = await prisma.pharmacy.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    const data = {
      name: payload.name.trim(),
      ownerName: payload.ownerName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      address: payload.address.trim() || null,
      city: payload.city.trim() || null,
      state: payload.state.trim() || null,
      country: payload.country.trim() || null,
      licenseNumber: payload.licenseNumber.trim(),
      gstNumber: payload.gstNumber?.trim() || null,
      status: PharmacyStatus.PENDING,
    };

    if (existing) {
      await prisma.pharmacy.update({
        where: { userId: session.user.id },
        data,
      });
    } else {
      await prisma.pharmacy.create({
        data: {
          userId: session.user.id,
          ...data,
        },
      });
    }

    return { ok: true as const };
  } catch (error) {
    console.error("completePharmacyOnboarding error:", error);
    return { ok: false as const, error: "Unable to submit pharmacy profile" };
  }
}

