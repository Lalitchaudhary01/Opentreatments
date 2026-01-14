"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getDoctorProfile() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  return doctor;
}
