"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

export async function updateOfflinePatient(
  id: string,
  data: {
    prescription?: string;
    diagnosis?: string;
    followUpDate?: Date;
  }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Verify doctor owns this patient
    const doctor = await prisma.independentDoctor.findUnique({
      where: { userId: session.user.id },
    });
    if (!doctor) {
      return { success: false, error: "Doctor profile not found" };
    }

    // Check if patient exists and belongs to this doctor
    const patient = await prisma.offlineConsultation.findFirst({
      where: { 
        id,
        doctorId: doctor.id 
      },
    });

    if (!patient) {
      return { success: false, error: "Patient not found" };
    }

    // Update patient
    await prisma.offlineConsultation.update({
      where: { id },
      data: {
        ...(data.prescription !== undefined && { prescription: data.prescription }),
        ...(data.diagnosis !== undefined && { diagnosis: data.diagnosis }),
        ...(data.followUpDate !== undefined && { followUpDate: data.followUpDate }),
      },
    });

    // Revalidate paths
    revalidatePath("/doctor/offline-patients");
    revalidatePath("/doctor/dashboard");
    revalidatePath(`/doctor/offline-patients/${id}`);

    return { success: true, message: "Patient updated successfully" };

  } catch (error) {
    console.error("Error updating patient:", error);
    return { success: false, error: "Failed to update patient" };
  }
}