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

  const consultationDelegate = (prisma as unknown as {
    hospitalConsultation?: {
      findMany?: typeof prisma.independentConsultation.findMany;
    };
  }).hospitalConsultation;

  if (!consultationDelegate?.findMany) {
    return [];
  }

  let rows: Array<{
    id: string;
    userId: string;
    user: { name: string | null; email: string; phone: string | null };
    slot: Date;
    duration: number | null;
    status: string;
    mode: string;
    fee: number | null;
    department: string | null;
    doctorName: string | null;
    notes: string | null;
    createdAt: Date;
  }> = [];

  try {
    rows = (await consultationDelegate.findMany({
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
    })) as typeof rows;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err?.code === "P2021" || err?.code === "P2022") {
      return [];
    }
    throw error;
  }

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
