"use server";

import prisma from "@/lib/prisma";
import { Consultation } from "../types/consultation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getConsultationsByDoctor(): Promise<Consultation[]> {
  try {
    const session = await getServerSession(authOptions);
    const doctorId = session?.user?.id; // 👈 doctor ke account ka id

    if (!doctorId) {
      console.warn("⚠️ Unauthorized access to getConsultationsByDoctor");
      return [];
    }

    const consultations = await prisma.independentConsultation.findMany({
      where: { doctorId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true }, // doctor ko patient info bhi milega
        },
      },
    });

    return consultations;
  } catch (error) {
    console.error("❌ Error fetching doctor consultations:", error);
    return [];
  }
}
