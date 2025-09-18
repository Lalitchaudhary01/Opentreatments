"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getHospitalProfile() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  const profile = await prisma.hospital.findFirst({
    //@ts-ignore
    where: { userId: session.user.id },
    include: {
      services: true,
      facilities: true,
      doctors: true,
      procedures: true,
      estimates: true,
      //@ts-ignore
      Insurance: true,
    },
  });

  return profile;
}
