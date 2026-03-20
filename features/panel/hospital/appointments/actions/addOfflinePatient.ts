"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getHospitalFromSession } from "./_helpers";

type AddHospitalOfflineInput = {
  patientName: string;
  patientId?: string | null;
  patientAge?: number | null;
  patientGender?: string | null;
  phoneNumber?: string | null;
  department?: string | null;
  doctorName?: string | null;
  consultationType?: string | null;
  complaint: string;
  prescription?: string | null;
  followUpDate?: string | Date | null;
  visitTime?: string | Date | null;
};

export async function addHospitalOfflinePatient(input: AddHospitalOfflineInput) {
  try {
    const hospital = await getHospitalFromSession();
    const offlineDelegate = (prisma as unknown as {
      hospitalOfflineConsultation?: {
        create?: typeof prisma.hospitalOfflineConsultation.create;
      };
    }).hospitalOfflineConsultation;

    const patientName = (input.patientName || "").trim();
    const complaint = (input.complaint || "").trim();
    const phone = (input.phoneNumber || "").trim() || null;

    if (patientName.length < 2) {
      return { success: false, error: "Patient name must be at least 2 characters" };
    }

    if (!complaint) {
      return { success: false, error: "Complaint is required" };
    }

    if (phone && !/^\+?[0-9]{10,14}$/.test(phone)) {
      return { success: false, error: "Phone number format is invalid" };
    }

    if (!offlineDelegate?.create) {
      return {
        success: false,
        error:
          "Hospital appointment model is not available in current Prisma client. Run prisma generate and restart dev server.",
      };
    }

    const record = await offlineDelegate.create({
      data: {
        hospitalId: hospital.id,
        patientName,
        patientId: input.patientId?.trim() || null,
        patientAge: input.patientAge ?? null,
        patientGender: input.patientGender?.trim() || null,
        phoneNumber: phone,
        department: input.department?.trim() || null,
        doctorName: input.doctorName?.trim() || null,
        consultationType: input.consultationType?.trim() || null,
        complaint,
        prescription: input.prescription?.trim() || null,
        followUpDate: input.followUpDate ? new Date(input.followUpDate) : null,
        visitTime: input.visitTime ? new Date(input.visitTime) : new Date(),
      },
    });

    revalidatePath("/hospital/appointments");
    revalidatePath("/hospital/dashboard");

    return { success: true, data: record };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    if (err?.code === "P2021") {
      return { success: false, error: "Hospital consultation table missing. Please run Prisma push/migration." };
    }
    return { success: false, error: err?.message || "Failed to add offline patient" };
  }
}
