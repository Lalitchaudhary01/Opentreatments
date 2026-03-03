"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getConsultationsForDoctor } from "./getConsultationsForDoctor";
import { getOfflinePatients } from "./getOfflinePatients";
import type { DoctorConsultation } from "../types/doctorConsultation";
import type { OfflinePatient } from "../types/offlinePatient";

export async function getDashboardData(filter: "ALL" | "ONLINE" | "OFFLINE" = "ALL") {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const doctor = await prisma.independentDoctor.findUnique({
      where: { userId: session.user.id },
    });
    if (!doctor) {
      return { success: false, error: "Doctor profile not found" };
    }

    // Get counts for badges
    const [onlineCount, offlineCount] = await Promise.all([
      prisma.independentConsultation.count({
        where: { 
          doctorId: doctor.id,
          status: "APPROVED" 
        },
      }),
      prisma.offlineConsultation.count({
        where: { doctorId: doctor.id },
      }),
    ]);

    // Get data based on filter
    let onlinePatients: DoctorConsultation[] = [];
    let offlinePatients: OfflinePatient[] = [];

    if (filter === "ALL" || filter === "ONLINE") {
      onlinePatients = await getConsultationsForDoctor();
    }
    
    if (filter === "ALL" || filter === "OFFLINE") {
      offlinePatients = await getOfflinePatients();
    }

    // Combine and format
    const allPatients = [
      ...onlinePatients.map(p => ({
        ...p,
        type: "online" as const,
        displayName: p.userName,
        displayTime: p.slot,
        displayReason: p.notes || "Consultation",
      })),
      ...offlinePatients.map(p => ({
        ...p,
        type: "offline" as const,
        displayName: p.patientName,
        displayTime: p.visitTime,
        displayReason: p.complaint,
      })),
    ].sort((a, b) => 
      new Date(b.displayTime).getTime() - new Date(a.displayTime).getTime()
    );

    return {
      success: true,
      data: {
        patients: allPatients,
        counts: {
          ALL: onlineCount + offlineCount,
          ONLINE: onlineCount,
          OFFLINE: offlineCount,
        },
      },
    };

  } catch (error) {
    console.error("Dashboard error:", error);
    return { 
      success: false, 
      error: "Failed to load dashboard",
      data: { patients: [], counts: { ALL: 0, ONLINE: 0, OFFLINE: 0 } }
    };
  }
}
