"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Consultation } from "../types/consultation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BookConsultationInput {
  doctorId: string;
  slot: Date;
  duration?: number;
  mode?: "online" | "offline";
  fee?: number;
  notes?: string;
}

export async function bookConsultation(
  input: BookConsultationInput
): Promise<{
  success: boolean;
  consultation?: Consultation;
  message?: string;
}> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const consultation = await prisma.independentConsultation.create({
      data: {
        doctorId: input.doctorId,
        userId, // 👈 yahan se direct auth ka userId
        slot: input.slot,
        duration: input.duration ?? null,
        mode: input.mode ?? "online",
        fee: input.fee ?? null,
        notes: input.notes ?? null,
      },
    });

    revalidatePath(`/consultations/${input.doctorId}`);

    return { success: true, consultation };
  } catch (error: any) {
    console.error("❌ Error booking consultation:", error);
    return {
      success: false,
      message:
        error.message || "Something went wrong while booking consultation",
    };
  }
}
