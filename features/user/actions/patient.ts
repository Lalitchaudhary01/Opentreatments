"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import {
  Patient,
  Medication,
  Appointment,
} from "@/features/user/types/patient";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const isString = (value: unknown): value is string => typeof value === "string";

const parseOptionalDate = (value: unknown): Date | null => {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
};

const normalizeMedications = (value: unknown): Medication[] => {
  if (!Array.isArray(value)) return [];

  const result: Medication[] = [];

  value.forEach((item) => {
    if (typeof item !== "object" || item === null) return;

    const med = item as Record<string, unknown>;
    if (
      isString(med.id) &&
      isString(med.name) &&
      isString(med.dosage) &&
      isString(med.frequency) &&
      isString(med.forCondition)
    ) {
      result.push({
        id: med.id,
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        forCondition: med.forCondition,
        startDate: parseOptionalDate(med.startDate),
        endDate: parseOptionalDate(med.endDate),
      });
    }
  });

  return result;
};

const serializeMedications = (
  value?: Medication[]
): Prisma.JsonArray | undefined => {
  if (!value) return undefined;

  return value.map<Prisma.JsonObject>((medication) => ({
    ...medication,
    startDate: medication.startDate ? medication.startDate.toISOString() : null,
    endDate: medication.endDate ? medication.endDate.toISOString() : null,
  }));
};

const APPOINTMENT_STATUSES: Appointment["status"][] = [
  "scheduled",
  "completed",
  "cancelled",
  "rescheduled",
];

const isAppointmentStatus = (value: unknown): value is Appointment["status"] =>
  typeof value === "string" &&
  APPOINTMENT_STATUSES.includes(value as Appointment["status"]);

const normalizeAppointments = (value: unknown): Appointment[] => {
  if (!Array.isArray(value)) return [];

  const result: Appointment[] = [];

  value.forEach((item) => {
    if (typeof item !== "object" || item === null) return;

    const appointment = item as Record<string, unknown>;
    const date = parseOptionalDate(appointment.date);
    if (
      !date ||
      !isString(appointment.id) ||
      !isString(appointment.patientId) ||
      !isString(appointment.time) ||
      !isString(appointment.doctor) ||
      !isString(appointment.type) ||
      !isAppointmentStatus(appointment.status)
    ) {
      return;
    }

    const createdAt = parseOptionalDate(appointment.createdAt) || date;
    const updatedAt =
      parseOptionalDate(appointment.updatedAt) || createdAt || date;

    result.push({
      id: appointment.id,
      patientId: appointment.patientId,
      date,
      time: appointment.time,
      doctor: appointment.doctor,
      type: appointment.type,
      status: appointment.status,
      notes:
        appointment.notes === null
          ? null
          : isString(appointment.notes)
          ? appointment.notes
          : undefined,
      createdAt,
      updatedAt,
    });
  });

  return result;
};

const serializeAppointments = (
  value?: Appointment[]
): Prisma.JsonArray | undefined => {
  if (!value) return undefined;

  return value.map<Prisma.JsonObject>((appointment) => ({
    id: appointment.id,
    patientId: appointment.patientId,
    date: appointment.date.toISOString(),
    time: appointment.time,
    doctor: appointment.doctor,
    type: appointment.type,
    status: appointment.status,
    notes: appointment.notes ?? null,
    createdAt: appointment.createdAt.toISOString(),
    updatedAt: appointment.updatedAt.toISOString(),
  }));
};

// Get patient data - agar nahi hai toh create karega
export async function getPatientData(userId: string): Promise<Patient | null> {
  try {
    let patient = await prisma.patient.findUnique({
      where: { userId },
    });

    if (!patient) {
      // User data se basic info leke naya patient create karo
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true, phone: true },
      });

      if (!user) return null;

      patient = await prisma.patient.create({
        data: {
          userId,
          fullName: user.name,
          email: user.email,
          phoneNumber: user.phone,
          conditions: [],
          allergies: [],
          medications: [],
          pastSurgeries: [],
          familyHistory: [],
          appointments: [],
        },
      });
    }

    // Convert null values to empty arrays for array fields
    return {
      ...patient,
      conditions: patient.conditions || [],
      allergies: patient.allergies || [],
      medications: normalizeMedications(patient.medications),
      pastSurgeries: patient.pastSurgeries || [],
      familyHistory: patient.familyHistory || [],
      appointments: normalizeAppointments(patient.appointments),
    } as Patient;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return null;
  }
}

// Update personal information
export async function updatePatientPersonalInfo(
  userId: string,
  data: {
    fullName?: string | null;
    age?: number | null;
    gender?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    address?: string | null;
    height?: string | null;
    weight?: string | null;
    bloodGroup?: string | null;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.patient.upsert({
      where: { userId },
      update: {
        ...data,
        updatedAt: new Date(),
      },
      create: {
        userId,
        ...data,
        conditions: [],
        allergies: [],
        medications: [],
        pastSurgeries: [],
        familyHistory: [],
        appointments: [],
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating patient personal info:", error);
    return { success: false, error: "Failed to update personal information" };
  }
}

// Update medical history
export async function updateMedicalHistory(
  userId: string,
  medicalData: {
    conditions?: string[];
    allergies?: string[];
    medications?: Medication[];
    pastSurgeries?: string[];
    familyHistory?: string[];
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { medications, ...restMedicalData } = medicalData;

    await prisma.patient.update({
      where: { userId },
      data: {
        ...restMedicalData,
        ...(medications !== undefined && {
          medications: serializeMedications(medications),
        }),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating medical history:", error);
    return { success: false, error: "Failed to update medical history" };
  }
}

// Update lifestyle data
export async function updateLifestyleData(
  userId: string,
  lifestyleData: {
    smokingStatus?: string | null;
    alcoholConsumption?: string | null;
    dietType?: string | null;
    sleepHours?: number | null;
    activityLevel?: string | null;
    waterIntake?: number | null;
    stressLevel?: string | null;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.patient.update({
      where: { userId },
      data: {
        ...lifestyleData,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating lifestyle data:", error);
    return { success: false, error: "Failed to update lifestyle data" };
  }
}

// Update checkup data
export async function updateCheckupData(
  userId: string,
  checkupData: {
    healthScore?: number | null;
    lastVisit?: Date | null;
    nextAppointment?: Date | null;
    primaryDoctor?: string | null;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.patient.update({
      where: { userId },
      data: {
        ...checkupData,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating checkup data:", error);
    return { success: false, error: "Failed to update checkup data" };
  }
}

// Appointments
export async function getPatientAppointments(userId: string) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { userId },
      select: { appointments: true },
    });

    return patient ? normalizeAppointments(patient.appointments) : [];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function createAppointment(appointmentData: {
  patientId: string;
  date: Date;
  time: string;
  doctor: string;
  type: string;
  status: Appointment["status"];
  notes?: string | null;
}) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { userId: appointmentData.patientId },
      select: { appointments: true },
    });

    if (!patient) {
      return { success: false, error: "Patient not found" };
    }

    const existingAppointments = normalizeAppointments(patient.appointments);
    const now = new Date();

    const newAppointment: Appointment = {
      id: randomUUID(),
      patientId: appointmentData.patientId,
      date: appointmentData.date,
      time: appointmentData.time,
      doctor: appointmentData.doctor,
      type: appointmentData.type,
      status: appointmentData.status,
      notes: appointmentData.notes ?? null,
      createdAt: now,
      updatedAt: now,
    };

    await prisma.patient.update({
      where: { userId: appointmentData.patientId },
      data: {
        appointments: serializeAppointments([
          ...existingAppointments,
          newAppointment,
        ]),
        updatedAt: now,
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true, data: newAppointment };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Failed to create appointment" };
  }
}

export async function updateAppointment(
  patientId: string,
  id: string,
  appointmentData: Partial<{
    date: Date;
    time: string;
    doctor: string;
    type: string;
    status: Appointment["status"];
    notes: string | null;
  }>
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { userId: patientId },
      select: { appointments: true },
    });

    if (!patient) {
      return { success: false, error: "Patient not found" };
    }

    const appointments = normalizeAppointments(patient.appointments);
    const index = appointments.findIndex((apt) => apt.id === id);

    if (index === -1) {
      return { success: false, error: "Appointment not found" };
    }

    const now = new Date();
    const updatedAppointment: Appointment = {
      ...appointments[index],
      ...(appointmentData.date ? { date: appointmentData.date } : {}),
      ...(appointmentData.time ? { time: appointmentData.time } : {}),
      ...(appointmentData.doctor ? { doctor: appointmentData.doctor } : {}),
      ...(appointmentData.type ? { type: appointmentData.type } : {}),
      ...(appointmentData.status ? { status: appointmentData.status } : {}),
      ...(appointmentData.notes !== undefined
        ? { notes: appointmentData.notes }
        : {}),
      updatedAt: now,
    };

    appointments[index] = updatedAppointment;

    await prisma.patient.update({
      where: { userId: patientId },
      data: {
        appointments: serializeAppointments(appointments),
        updatedAt: now,
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return { success: false, error: "Failed to update appointment" };
  }
}

export async function deleteAppointment(patientId: string, id: string) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { userId: patientId },
      select: { appointments: true },
    });

    if (!patient) {
      return { success: false, error: "Patient not found" };
    }

    const appointments = normalizeAppointments(patient.appointments);
    const filtered = appointments.filter((apt) => apt.id !== id);

    if (filtered.length === appointments.length) {
      return { success: false, error: "Appointment not found" };
    }

    await prisma.patient.update({
      where: { userId: patientId },
      data: {
        appointments: serializeAppointments(filtered),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return { success: false, error: "Failed to delete appointment" };
  }
}
