"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import slugify from "slugify";

export type LabOnboardingPayload = {
  ownerName: string;
  phone: string;
  registrationNumber: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode?: string;
  website?: string;
};

async function generateUniqueLabSlug(name: string) {
  const base = slugify(name, { lower: true, strict: true }) || "lab";
  let candidate = base;

  for (let i = 1; i <= 25; i += 1) {
    const exists = await prisma.labCompany.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
    candidate = `${base}-${i}`;
  }

  return `${base}-${Date.now()}`;
}

export async function completeLabOnboarding(payload: LabOnboardingPayload) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "LABORATORY") {
      return { ok: false as const, error: "Unauthorized" };
    }

    const ownerName = payload.ownerName.trim();
    const phone = payload.phone.trim();
    const registrationNumber = payload.registrationNumber.trim();
    const name = payload.name.trim();
    const email = payload.email.trim().toLowerCase();
    const address = payload.address.trim();
    const city = payload.city.trim();
    const state = payload.state.trim();
    const country = payload.country.trim();
    const pincode = payload.pincode?.trim() || null;
    const website = payload.website?.trim() || null;

    if (!ownerName || !phone || !registrationNumber || !name || !email || !address || !city || !state || !country) {
      return { ok: false as const, error: "Missing required laboratory fields" };
    }

    const existing = await prisma.labCompany.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { phone: true },
    });

    if (currentUser && currentUser.phone !== phone) {
      const phoneOwner = await prisma.user.findUnique({
        where: { phone },
        select: { id: true },
      });
      if (phoneOwner && phoneOwner.id !== session.user.id) {
        return { ok: false as const, error: "Phone number already used by another account" };
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: ownerName,
        phone,
      },
    });

    if (existing) {
      await prisma.labCompany.update({
        where: { userId: session.user.id },
        data: {
          name,
          registrationNumber,
          email,
          phone,
          address,
          city,
          state,
          pincode,
          country,
          website,
          status: "PENDING",
        },
      });
    } else {
      const slug = await generateUniqueLabSlug(name);

      await prisma.labCompany.create({
        data: {
          userId: session.user.id,
          name,
          slug,
          registrationNumber,
          email,
          phone,
          address,
          city,
          state,
          pincode,
          country,
          website,
          status: "PENDING",
        },
      });
    }

    return { ok: true as const };
  } catch (error) {
    console.error("completeLabOnboarding error:", error);
    return { ok: false as const, error: "Unable to submit laboratory profile" };
  }
}
