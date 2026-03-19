"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export type PharmacyStoreProfileView = {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
  state: string;
  country: string;
  licenseNumber: string;
  gstNumber: string;
  bio: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export async function getPharmacyStoreProfileView(): Promise<PharmacyStoreProfileView | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "PHARMACY") return null;

  let profile:
    | {
        id: string;
        name: string;
        ownerName: string;
        email: string;
        phone: string;
        address: string | null;
        city: string | null;
        pinCode?: string | null;
        state: string | null;
        country: string | null;
        licenseNumber: string;
        gstNumber: string | null;
        bio?: string | null;
        status: "PENDING" | "APPROVED" | "REJECTED";
        createdAt: Date;
      }
    | null = null;

  try {
    profile = await prisma.pharmacy.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        ownerName: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        pinCode: true,
        state: true,
        country: true,
        licenseNumber: true,
        gstNumber: true,
        bio: true,
        status: true,
        createdAt: true,
      },
    });
  } catch (error) {
    const isMissingFieldInLegacyClient =
      error instanceof Prisma.PrismaClientValidationError &&
      (error.message.includes("Unknown field `bio`") ||
        error.message.includes("Unknown field `pinCode`"));
    if (!isMissingFieldInLegacyClient) throw error;

    profile = await prisma.pharmacy.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        ownerName: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        country: true,
        licenseNumber: true,
        gstNumber: true,
        status: true,
        createdAt: true,
      },
    });
  }

  if (!profile) return null;

  return {
    id: profile.id,
    name: profile.name ?? "",
    ownerName: profile.ownerName ?? "",
    email: profile.email ?? "",
    phone: profile.phone ?? "",
    address: profile.address ?? "",
    city: profile.city ?? "",
    pinCode: profile.pinCode ?? "",
    state: profile.state ?? "",
    country: profile.country ?? "",
    licenseNumber: profile.licenseNumber ?? "",
    gstNumber: profile.gstNumber ?? "",
    bio: profile.bio ?? "",
    status: profile.status,
    createdAt: profile.createdAt.toISOString(),
  };
}
