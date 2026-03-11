"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { SubmitDoctorProfileInput } from "../types";
import { invalidateDoctorPanelCache } from "../cache";

export async function updateDoctorProfile(
  data: Partial<SubmitDoctorProfileInput>
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) {
    throw new Error("Profile not found.");
  }

  const updated = await prisma.independentDoctor.update({
    where: { userId: session.user.id },
    data: {
      ...data,
    },
  });

  invalidateDoctorPanelCache({
    doctorId: updated.id,
    paths: ["/doctor/overview", "/doctor/profile", "/doctor/settings"],
  });

  return updated;
}
