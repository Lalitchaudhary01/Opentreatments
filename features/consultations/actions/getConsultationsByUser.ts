"use server";

import prisma from "@/lib/prisma";
import { Consultation } from "../types/consultation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getConsultationsByUser(): Promise<Consultation[]> {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      console.warn("⚠️ Unauthorized access to getConsultationsByUser");
      return [];
    }

    const consultations = await prisma.independentConsultation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return consultations;
  } catch (error) {
    console.error("❌ Error fetching user consultations:", error);
    return [];
  }
}
