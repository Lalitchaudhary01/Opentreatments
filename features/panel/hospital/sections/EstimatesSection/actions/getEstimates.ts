"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getEstimates() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });
  if (!hospital) throw new Error("Hospital not found");

  return prisma.estimate.findMany({
    where: { hospitalId: hospital.id },
    include: {
      procedure: true,
      policy: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
