// features/panel/doctors/doctor-consultations/actions/updateConsultationStatus.ts
"use server";
import prisma from "@/lib/prisma";

export async function updateConsultationStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
) {
  await prisma.independentConsultation.update({
    where: { id },
    data: { status },
  });
}
