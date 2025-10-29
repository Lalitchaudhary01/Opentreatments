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
  revalidatePath("/doctor/consultations");
  revalidatePath("/doctor/consultations/pending");
  revalidatePath("/doctor/consultations/approved");
  revalidatePath("/doctor/consultations/rejected");
   revalidatePath("/doctor/consultations/today"); // Add today's schedule
}
