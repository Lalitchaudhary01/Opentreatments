"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { UserConsultationInput } from "../types/userConsultation";

export async function bookConsultation(input: UserConsultationInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  // ✅ create consultation
  const consultation = await prisma.independentConsultation.create({
    data: {
      doctorId: input.doctorId,
      userId: session.user.id,
      slot: new Date(input.slot),
      duration: input.duration ?? 30,
      mode: input.mode ?? "online",
      notes: input.notes ?? "",
      status: "PENDING",
      paymentStatus: "unpaid",
    },
  });

  return consultation;
}
