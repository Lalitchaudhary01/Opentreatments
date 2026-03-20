"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export type MyConsultationFilter = "ALL" | "ONLINE" | "OFFLINE";

export type MyConsultationView = {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string | null;
  slot: string;
  duration: number | null;
  mode: string;
  status: string;
  paymentStatus: string;
  notes: string | null;
  createdAt: string;
};

export async function getMyConsultations(
  filter: MyConsultationFilter = "ALL",
): Promise<MyConsultationView[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  const modeWhere =
    filter === "ONLINE"
      ? { mode: "online" }
      : filter === "OFFLINE"
      ? { mode: "offline" }
      : {};

  const rows = await prisma.independentConsultation.findMany({
    where: {
      userId: session.user.id,
      ...modeWhere,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      doctorId: true,
      slot: true,
      duration: true,
      mode: true,
      status: true,
      paymentStatus: true,
      notes: true,
      createdAt: true,
      doctor: {
        select: {
          name: true,
          specialization: true,
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    doctorId: row.doctorId,
    doctorName: row.doctor?.name ?? "Unknown Doctor",
    doctorSpecialization: row.doctor?.specialization ?? null,
    slot: row.slot.toISOString(),
    duration: row.duration ?? null,
    mode: row.mode,
    status: row.status,
    paymentStatus: row.paymentStatus,
    notes: row.notes ?? null,
    createdAt: row.createdAt.toISOString(),
  }));
}

