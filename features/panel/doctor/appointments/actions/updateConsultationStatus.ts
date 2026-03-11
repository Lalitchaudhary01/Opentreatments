// features/panel/doctors/doctor-consultations/actions/updateConsultationStatus.ts
"use server";
import prisma from "@/lib/prisma";
import { invalidateDoctorPanelCache } from "../../cache";

export async function updateConsultationStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
) {
  const updated = await prisma.independentConsultation.update({
    where: { id },
    data: { status },
    select: { doctorId: true },
  });

  invalidateDoctorPanelCache({
    doctorId: updated.doctorId,
    paths: ["/doctor/overview", "/doctor/appointments"],
  });
}
