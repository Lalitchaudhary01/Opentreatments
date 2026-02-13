"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  adminUpdateDoctorService,
  adminDeleteDoctorService,
  adminUpdateDoctorStatusService
} from "../services/adminUpdateDoctorProfile.service";
import { DoctorStatus, AdminUpdateDoctorInput } from "../types";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized – Admin only");
  }

  return session;
}

export async function adminUpdateDoctor(
  data: AdminUpdateDoctorInput
) {
  await ensureAdmin();
  const { doctorId, ...rest } = data;
  return adminUpdateDoctorService(doctorId, rest);
}

export async function adminDeleteDoctor(doctorId: string) {
  await ensureAdmin();
  return adminDeleteDoctorService(doctorId);
}

export async function adminUpdateDoctorStatus(
  doctorId: string,
  status: DoctorStatus
) {
  await ensureAdmin();
  return adminUpdateDoctorStatusService(doctorId, status);
}