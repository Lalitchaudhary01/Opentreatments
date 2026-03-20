"use server";

import prisma from "@/lib/prisma";
import { getHospitalFromSession } from "./_helpers";

export type HospitalOfflinePatientView = {
  id: string;
  patientName: string;
  patientId?: string;
  patientAge?: number;
  patientGender?: string;
  phoneNumber?: string;
  department?: string;
  doctorName?: string;
  consultationType?: string;
  complaint: string;
  prescription?: string;
  followUpDate?: string;
  visitTime: string;
  createdAt: string;
};

export async function getHospitalOfflinePatients(): Promise<HospitalOfflinePatientView[]> {
  const hospital = await getHospitalFromSession();

  const rows = await prisma.hospitalOfflineConsultation.findMany({
    where: { hospitalId: hospital.id },
    orderBy: { visitTime: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    patientName: row.patientName,
    patientId: row.patientId ?? undefined,
    patientAge: row.patientAge ?? undefined,
    patientGender: row.patientGender ?? undefined,
    phoneNumber: row.phoneNumber ?? undefined,
    department: row.department ?? undefined,
    doctorName: row.doctorName ?? undefined,
    consultationType: row.consultationType ?? undefined,
    complaint: row.complaint,
    prescription: row.prescription ?? undefined,
    followUpDate: row.followUpDate?.toISOString(),
    visitTime: row.visitTime.toISOString(),
    createdAt: row.createdAt.toISOString(),
  }));
}
