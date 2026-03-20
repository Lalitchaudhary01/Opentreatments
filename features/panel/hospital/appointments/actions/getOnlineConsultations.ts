"use server";

import prisma from "@/lib/prisma";
import { getHospitalFromSession } from "./_helpers";

export type HospitalOnlineConsultationView = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  slot: string;
  duration?: number;
  status: string;
  mode: string;
  fee?: number;
  department?: string;
  doctorName?: string;
  notes?: string;
  createdAt: string;
};

export async function getHospitalOnlineConsultations(): Promise<HospitalOnlineConsultationView[]> {
  const hospital = await getHospitalFromSession();

  const rows = await prisma.hospitalConsultation.findMany({
    where: { hospitalId: hospital.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: { slot: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    userName: row.user.name || "Unknown User",
    userEmail: row.user.email,
    userPhone: row.user.phone ?? undefined,
    slot: row.slot.toISOString(),
    duration: row.duration ?? undefined,
    status: row.status,
    mode: row.mode,
    fee: row.fee ?? undefined,
    department: row.department ?? undefined,
    doctorName: row.doctorName ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.createdAt.toISOString(),
  }));
}
