"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  HospitalInsurance,
  CreateHospitalInsuranceInput,
  UpdateHospitalInsuranceInput,
} from "../types/hospitalInsurance";

// ✅ Fetch all insurances for logged-in hospital
export async function getInsurances(): Promise<HospitalInsurance[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  return prisma.insurance.findMany({
    where: { hospitalId: hospital.id },
  });
}

// ✅ Add insurance
export async function addInsurance(
  data: CreateHospitalInsuranceInput
): Promise<HospitalInsurance> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  return prisma.insurance.create({
    data: {
      ...data,
      cashless: data.cashless ?? false,
      hospitalId: hospital.id,
    },
  });
}

// ✅ Update insurance
export async function updateInsurance(
  data: UpdateHospitalInsuranceInput
): Promise<HospitalInsurance> {
  return prisma.insurance.update({
    where: { id: data.id },
    data: {
      name: data.name,
      provider: data.provider,
      cashless: data.cashless,
    },
  });
}

// ✅ Delete insurance
export async function deleteInsurance(id: string): Promise<void> {
  await prisma.insurance.delete({
    where: { id },
  });
}
