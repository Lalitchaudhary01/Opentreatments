"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getHospitalFromSession } from "./_helpers";

type CreateHospitalAppointmentInput = {
  patientName: string;
  patientId: string;
  patientAge?: number | null;
  patientGender?: string | null;
  phoneNumber?: string | null;
  followUpDate?: string | null;
  doctor: string;
  department: string;
  date: string;
  timeSlot: string;
  consultationType: string;
  notes?: string;
};

function parseSlot(date: string, timeSlot: string) {
  const base = (date || "").trim();
  const slot = (timeSlot || "").trim().toUpperCase();
  const match = slot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (!base || !match) return null;

  const hour12 = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3];
  if (Number.isNaN(hour12) || Number.isNaN(minute)) return null;

  let hour = hour12 % 12;
  if (meridiem === "PM") hour += 12;

  const d = new Date(`${base}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;

  d.setHours(hour, minute, 0, 0);
  return d;
}

export async function createHospitalAppointment(input: CreateHospitalAppointmentInput) {
  try {
    const hospital = await getHospitalFromSession();
    const offlineDelegate = (prisma as unknown as {
      hospitalOfflineConsultation?: {
        create?: typeof prisma.hospitalOfflineConsultation.create;
      };
    }).hospitalOfflineConsultation;

    const patientName = (input.patientName || "").trim();
    const patientId = (input.patientId || "").trim();
    const patientAge = input.patientAge ?? null;
    const patientGender = (input.patientGender || "").trim() || null;
    const phoneNumber = (input.phoneNumber || "").trim() || null;
    const followUpDate = (input.followUpDate || "").trim() || null;
    const doctorName = (input.doctor || "").trim();
    const department = (input.department || "").trim();
    const consultationType = (input.consultationType || "").trim();
    const notes = (input.notes || "").trim();

    if (patientName.length < 2) {
      return { success: false, error: "Patient name is required" };
    }
    if (!patientId) {
      return { success: false, error: "Patient ID is required" };
    }
    if (patientAge !== null && (patientAge < 0 || patientAge > 150)) {
      return { success: false, error: "Patient age must be between 0 and 150" };
    }
    if (phoneNumber && !/^\+?[0-9]{10,14}$/.test(phoneNumber)) {
      return { success: false, error: "Phone number format is invalid" };
    }

    const visitTime = parseSlot(input.date, input.timeSlot);
    if (!visitTime) {
      return { success: false, error: "Invalid date/time slot" };
    }

    const complaint = notes || `${consultationType || "General"} appointment`;

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
        patientId,
        patientAge,
        patientGender,
        phoneNumber,
        department: department || null,
        doctorName: doctorName || null,
        consultationType: consultationType || "New Visit",
        complaint,
        prescription: notes || null,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        visitTime,
      },
    });

    revalidatePath("/hospital/appointments");
    revalidatePath("/hospital/dashboard");

    return { success: true, data: record };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    if (err?.code === "P2021" || err?.code === "P2022") {
      return { success: false, error: "Hospital appointment table missing. Please run Prisma push/migration." };
    }
    return { success: false, error: err?.message || "Failed to create hospital appointment" };
  }
}
