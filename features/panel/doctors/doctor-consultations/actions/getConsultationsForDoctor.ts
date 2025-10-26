"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DoctorConsultation } from "../types/doctorConsultation";

export async function getConsultationsForDoctor(): Promise<
  DoctorConsultation[]
> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  // Find doctor profile linked to this user
  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });
  if (!doctor) throw new Error("Doctor profile not found");

  const consultations = await prisma.independentConsultation.findMany({
    where: { doctorId: doctor.id },
    include: {
      user: true, // ✅ fetch patient (user) details
    },
    orderBy: { createdAt: "desc" },
  });

  return consultations.map((c) => ({
    id: c.id,
    userId: c.userId,
    doctorId: c.doctorId,
    userName: c.user.name || "Unknown User",
    userEmail: c.user.email,
    slot: c.slot.toISOString(),
    duration: c.duration ?? undefined,
    mode: c.mode,
    fee: c.fee ?? undefined,
    notes: c.notes ?? undefined,
    prescription: c.prescription ?? undefined,
    status: c.status,
    paymentStatus: c.paymentStatus,
    createdAt: c.createdAt.toISOString(),
  }));
}
