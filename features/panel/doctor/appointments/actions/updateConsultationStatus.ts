// features/panel/doctors/doctor-consultations/actions/updateConsultationStatus.ts
"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateConsultationStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
) {
  await prisma.independentConsultation.update({
    where: { id },
    data: { status },
  });

  // Revalidate all consultation pages
  revalidatePath("/doctor/appointments");
  revalidatePath("/doctor/appointments/pending");
  revalidatePath("/doctor/appointments/approved");
  revalidatePath("/doctor/appointments/rejected");
  revalidatePath("/doctor/appointments/today");
}
