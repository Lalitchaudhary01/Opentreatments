"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { invalidateDoctorPanelCache } from "../../cache";
import { DoctorAvailabilityPayload } from "../types";

export async function saveDoctorAvailability(
  payload: DoctorAvailabilityPayload
): Promise<{ ok: boolean; error?: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "DOCTOR") {
    return { ok: false, error: "Unauthorized" };
  }

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, availability: true },
  });
  if (!doctor) return { ok: false, error: "Doctor profile not found" };

  const currentAvailability =
    doctor.availability && typeof doctor.availability === "object"
      ? (doctor.availability as Record<string, unknown>)
      : {};

  const nextAvailability = {
    ...currentAvailability,
    weeklyHours: payload.weeklyHours,
    breaks: payload.breaks,
    holidays: payload.holidays,
    slotConfig: payload.slotConfig,
  };

  await prisma.independentDoctor.update({
    where: { id: doctor.id },
    data: {
      availability: nextAvailability as Prisma.InputJsonValue,
    },
  });

  invalidateDoctorPanelCache({
    doctorId: doctor.id,
    paths: ["/doctor/availability", "/doctor/overview"],
  });

  return { ok: true };
}

