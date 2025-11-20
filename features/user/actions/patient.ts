"use server";

import { revalidatePath } from "next/cache";
import { Patient, Medication } from "@/features/user/types/patient";
import prisma from "@/lib/prisma";

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
          fullName: user.name || "",
          email: user.email || "",
          phoneNumber: user.phone || "",
          conditions: [],
          allergies: [],
          medications: [],
          pastSurgeries: [],
          familyHistory: [],
        },
      });
    }

    return {
      ...patient,
      conditions: patient.conditions || [],
      allergies: patient.allergies || [],
      medications: (patient.medications as Medication[]) || [],
      pastSurgeries: patient.pastSurgeries || [],
      familyHistory: patient.familyHistory || [],
    };
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return null;
  }
}

// Update personal information
export async function updatePatientPersonalInfo(
  userId: string,
  data: {
    fullName?: string;
    age?: number;
    gender?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    height?: string;
    weight?: string;
    bloodGroup?: string;
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
    await prisma.patient.update({
      where: { userId },
      data: {
        ...medicalData,
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
    smokingStatus?: string;
    alcoholConsumption?: string;
    dietType?: string;
    sleepHours?: number;
    activityLevel?: string;
    waterIntake?: number;
    stressLevel?: string;
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
    healthScore?: number;
    lastVisit?: Date;
    nextAppointment?: Date;
    primaryDoctor?: string;
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
    const appointments = await prisma.appointment.findMany({
      where: { patientId: userId },
      orderBy: { date: "desc" },
    });

    return appointments;
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
  status: string;
  notes?: string;
}) {
  try {
    const appointment = await prisma.appointment.create({
      data: appointmentData,
    });

    revalidatePath("/[id]/user", "page");
    return { success: true, data: appointment };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Failed to create appointment" };
  }
}

export async function updateAppointment(
  id: string,
  appointmentData: Partial<{
    date: Date;
    time: string;
    doctor: string;
    type: string;
    status: string;
    notes: string;
  }>
) {
  try {
    await prisma.appointment.update({
      where: { id },
      data: {
        ...appointmentData,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return { success: false, error: "Failed to update appointment" };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: { id },
    });

    revalidatePath("/[id]/user", "page");
    return { success: true };
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return { success: false, error: "Failed to delete appointment" };
  }
}
