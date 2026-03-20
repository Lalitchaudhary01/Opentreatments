"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { UserConsultationInput } from "../types/userConsultation";

export async function bookConsultation(input: UserConsultationInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  if (!input.doctorId?.trim()) {
    throw new Error("Doctor is required");
  }

  const slot = new Date(input.slot);
  if (Number.isNaN(slot.getTime())) {
    throw new Error("Invalid slot date");
  }

  const mode = input.mode === "offline" ? "offline" : "online";

  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: input.doctorId },
    select: { id: true, status: true },
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  if (doctor.status !== "APPROVED") {
    throw new Error("This doctor is not available for booking yet");
  }

  const consultation = await prisma.independentConsultation.create({
    data: {
      doctorId: input.doctorId,
      userId: session.user.id,
      slot,
      duration: input.duration ?? 30,
      mode,
      notes: input.notes ?? "",
      status: "PENDING",
      paymentStatus: "unpaid",
    },
  });

  return consultation;
}
