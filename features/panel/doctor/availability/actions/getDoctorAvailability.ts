"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { DoctorAvailabilityPayload } from "../types";

export async function getDoctorAvailability(): Promise<DoctorAvailabilityPayload | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "DOCTOR") return null;

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { availability: true },
  });
  if (!doctor?.availability || typeof doctor.availability !== "object") return null;

  const availability = doctor.availability as Record<string, unknown>;
  const weeklyHours = Array.isArray(availability.weeklyHours) ? availability.weeklyHours : null;
  const breaks = Array.isArray(availability.breaks) ? availability.breaks : null;
  const holidays = Array.isArray(availability.holidays) ? availability.holidays : null;
  const slotConfig =
    availability.slotConfig && typeof availability.slotConfig === "object"
      ? availability.slotConfig
      : null;

  if (!weeklyHours || !breaks || !holidays || !slotConfig) return null;

  return {
    weeklyHours: weeklyHours as DoctorAvailabilityPayload["weeklyHours"],
    breaks: breaks as DoctorAvailabilityPayload["breaks"],
    holidays: holidays as DoctorAvailabilityPayload["holidays"],
    slotConfig: slotConfig as DoctorAvailabilityPayload["slotConfig"],
  };
}

