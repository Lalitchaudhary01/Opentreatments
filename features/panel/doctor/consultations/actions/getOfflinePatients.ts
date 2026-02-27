"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { OfflinePatient } from "../types/offlinePatient";

export async function getOfflinePatients(): Promise<OfflinePatient[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  // Find doctor profile linked to this user
  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });
  if (!doctor) throw new Error("Doctor profile not found");

  const patients = await prisma.offlineConsultation.findMany({
    where: { doctorId: doctor.id },
    orderBy: { visitTime: "desc" }, // Latest first
  });

  return patients.map((p) => ({
    id: p.id,
    doctorId: p.doctorId,
    patientName: p.patientName,
    patientAge: p.patientAge ?? undefined,
    patientGender: p.patientGender ?? undefined,
    phoneNumber: p.phoneNumber ?? undefined,
    complaint: p.complaint,
    prescription: p.prescription ?? undefined,
    diagnosis: p.diagnosis ?? undefined,
    followUpDate: p.followUpDate?.toISOString() ?? undefined,
    vitals: p.vitals as any,
    visitTime: p.visitTime.toISOString(),
    createdAt: p.createdAt.toISOString(),
  }));
}

// Optional: Get single patient by ID
export async function getOfflinePatientById(id: string): Promise<OfflinePatient | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });
  if (!doctor) throw new Error("Doctor profile not found");

  const patient = await prisma.offlineConsultation.findFirst({
    where: { 
      id,
      doctorId: doctor.id // Ensure doctor owns this patient
    },
  });

  if (!patient) return null;

  return {
    id: patient.id,
    doctorId: patient.doctorId,
    patientName: patient.patientName,
    patientAge: patient.patientAge ?? undefined,
    patientGender: patient.patientGender ?? undefined,
    phoneNumber: patient.phoneNumber ?? undefined,
    complaint: patient.complaint,
    prescription: patient.prescription ?? undefined,
    diagnosis: patient.diagnosis ?? undefined,
    followUpDate: patient.followUpDate?.toISOString() ?? undefined,
    vitals: patient.vitals as any,
    visitTime: patient.visitTime.toISOString(),
    createdAt: patient.createdAt.toISOString(),
  };
}