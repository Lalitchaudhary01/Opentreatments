"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

type BookHospitalConsultationInput = {
  hospitalId: string;
  slot: string | Date;
  duration?: number;
  mode?: "online" | "offline";
  department?: string;
  doctorName?: string;
  notes?: string;
  fee?: number;
};

export async function bookHospitalConsultation(input: BookHospitalConsultationInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  if (!input.hospitalId) {
    throw new Error("Hospital ID is required");
  }

  const slotDate = new Date(input.slot);
  if (Number.isNaN(slotDate.getTime())) {
    throw new Error("Invalid appointment slot");
  }

  const hospital = await prisma.hospital.findUnique({
    where: { id: input.hospitalId },
    select: { id: true, status: true },
  });

  if (!hospital || hospital.status !== "APPROVED") {
    throw new Error("Hospital not available for bookings");
  }

  const consultation = await prisma.hospitalConsultation.create({
    data: {
      hospitalId: hospital.id,
      userId: session.user.id,
      slot: slotDate,
      duration: input.duration ?? 30,
      status: "PENDING",
      mode: input.mode ?? "online",
      fee: input.fee ?? null,
      department: input.department?.trim() || null,
      doctorName: input.doctorName?.trim() || null,
      notes: input.notes?.trim() || null,
    },
  });

  revalidatePath("/user/hospitals");
  revalidatePath(`/user/hospitals/${input.hospitalId}`);
  revalidatePath("/hospital/appointments");

  return consultation;
}
