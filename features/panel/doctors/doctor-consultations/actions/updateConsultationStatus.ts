// features/consultations/actions/updateConsultationStatus.ts
"use server";

import prisma from "@/lib/prisma";

export async function updateConsultationStatus(
  consultationId: string,
  status: "APPROVED" | "REJECTED"
) {
  try {
    const updated = await prisma.independentConsultation.update({
      where: { id: consultationId },
      data: { status },
    });
    return { success: true, consultation: updated };
  } catch (err) {
    console.error("Error updating consultation:", err);
    return { success: false, error: "Failed to update consultation" };
  }
}
