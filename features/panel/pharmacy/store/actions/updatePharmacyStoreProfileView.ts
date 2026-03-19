"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { invalidatePharmacyPanelCache } from "../../cache";

export type UpdatePharmacyStoreProfileInput = {
  name: string;
  ownerName: string;
  phone: string;
  address: string;
  city: string;
  pinCode?: string;
  state: string;
  country: string;
  gstNumber?: string;
  bio?: string;
};

export async function updatePharmacyStoreProfileView(input: UpdatePharmacyStoreProfileInput) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "PHARMACY") {
      return { ok: false as const, error: "Unauthorized" };
    }

    const pharmacy = await prisma.pharmacy.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!pharmacy) return { ok: false as const, error: "Pharmacy profile not found" };

    const nextPhone = input.phone.trim();

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { phone: true },
    });

    if (currentUser && currentUser.phone !== nextPhone) {
      const phoneOwner = await prisma.user.findUnique({
        where: { phone: nextPhone },
        select: { id: true },
      });
      if (phoneOwner && phoneOwner.id !== session.user.id) {
        return { ok: false as const, error: "Phone number already used by another account" };
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: input.ownerName.trim(),
        phone: nextPhone,
      },
    });

    let updated: { id: string };
    try {
      updated = await prisma.pharmacy.update({
        where: { userId: session.user.id },
        data: {
          name: input.name.trim(),
          ownerName: input.ownerName.trim(),
          phone: nextPhone,
          address: input.address.trim() || null,
          city: input.city.trim() || null,
          pinCode: input.pinCode?.trim() || null,
          state: input.state.trim() || null,
          country: input.country.trim() || null,
          gstNumber: input.gstNumber?.trim() || null,
          bio: input.bio?.trim() || null,
        },
        select: { id: true },
      });
    } catch (error) {
      const isMissingFieldInLegacyClient =
        error instanceof Prisma.PrismaClientValidationError &&
        (error.message.includes("Unknown argument `bio`") ||
          error.message.includes("Unknown argument `pinCode`"));
      if (!isMissingFieldInLegacyClient) throw error;

      updated = await prisma.pharmacy.update({
        where: { userId: session.user.id },
        data: {
          name: input.name.trim(),
          ownerName: input.ownerName.trim(),
          phone: nextPhone,
          address: input.address.trim() || null,
          city: input.city.trim() || null,
          state: input.state.trim() || null,
          country: input.country.trim() || null,
          gstNumber: input.gstNumber?.trim() || null,
        },
        select: { id: true },
      });
    }

    invalidatePharmacyPanelCache({
      pharmacyId: updated.id,
      paths: ["/pharmacy/store", "/pharmacy/store-profile", "/pharmacy/overview", "/pharmacy/settings"],
    });

    return { ok: true as const };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { ok: false as const, error: "Duplicate value found. Please check phone/email fields." };
    }
    return { ok: false as const, error: "Unable to update pharmacy profile" };
  }
}
