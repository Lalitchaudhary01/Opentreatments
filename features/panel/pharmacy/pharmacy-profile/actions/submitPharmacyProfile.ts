"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { PharmacyStatus } from "../types/pharmacyProfile";


export async function submitPharmacyProfile(data: {
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
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "PHARMACY") throw new Error("Forbidden");

  // check if already submitted
  const existing = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
  });
  if (existing) throw new Error("Pharmacy profile already exists");

  return prisma.pharmacy.create({
    data: {
      userId: session.user.id,
      name: data.name,
      ownerName: data.ownerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      licenseNumber: data.licenseNumber,
      gstNumber: data.gstNumber,
      status: PharmacyStatus.PENDING,
    },
  });
}
