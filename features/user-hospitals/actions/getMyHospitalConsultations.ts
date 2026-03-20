"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";

export type UserHospitalConsultationView = {
  id: string;
  hospitalId: string;
  hospitalName: string;
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

export async function getMyHospitalConsultations(): Promise<UserHospitalConsultationView[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const rows = await prisma.hospitalConsultation.findMany({
    where: { userId: session.user.id },
    include: {
      hospital: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { slot: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    hospitalId: row.hospitalId,
    hospitalName: row.hospital.name,
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
