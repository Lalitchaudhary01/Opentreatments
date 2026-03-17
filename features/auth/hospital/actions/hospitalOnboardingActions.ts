"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import slugify from "slugify";

export type HospitalOnboardingPayload = {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website?: string;
};

async function generateUniqueHospitalSlug(name: string) {
  const base = slugify(name, { lower: true, strict: true }) || "hospital";
  let candidate = base;

  for (let i = 1; i <= 25; i += 1) {
    const exists = await prisma.hospital.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
    candidate = `${base}-${i}`;
  }

  return `${base}-${Date.now()}`;
}

export async function completeHospitalOnboarding(payload: HospitalOnboardingPayload) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "HOSPITAL") {
      return { ok: false as const, error: "Unauthorized" };
    }

    const name = payload.name.trim();
    const contactPerson = payload.contactPerson.trim();
    const phone = payload.phone.trim();
    const email = payload.email.trim().toLowerCase();
    const address = payload.address.trim();
    const city = payload.city.trim();
    const state = payload.state.trim();
    const country = payload.country.trim();
    const website = payload.website?.trim() || null;

    if (!name || !contactPerson || !phone || !email || !address || !city || !state || !country) {
      return { ok: false as const, error: "Missing required hospital fields" };
    }

    const existing = await prisma.hospital.findUnique({
      where: { userId: session.user.id },
      select: { id: true, slug: true },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: contactPerson, phone },
    });

    if (existing) {
      await prisma.hospital.update({
        where: { userId: session.user.id },
        data: {
          name,
          email,
          phone,
          address,
          city,
          state,
          country,
          website,
          status: "PENDING",
        },
      });
    } else {
      const slug = await generateUniqueHospitalSlug(name);

      await prisma.hospital.create({
        data: {
          userId: session.user.id,
          name,
          slug,
          email,
          phone,
          address,
          city,
          state,
          country,
          website,
          status: "PENDING",
        },
      });
    }

    return { ok: true as const };
  } catch (error) {
    console.error("completeHospitalOnboarding error:", error);
    return { ok: false as const, error: "Unable to submit hospital profile" };
  }
}
