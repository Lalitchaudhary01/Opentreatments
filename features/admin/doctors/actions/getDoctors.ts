"use server";

import prisma from "@/lib/prisma";
import { AdminDoctor, DoctorStatus } from "../types/adminDoctor";

export async function getDoctors(
  status?: DoctorStatus
): Promise<AdminDoctor[]> {
  const doctors = await prisma.independentDoctor.findMany({
    where: status ? { status } : {}, // filter if status provided
    orderBy: { createdAt: "desc" },
  });

  return doctors as unknown as AdminDoctor[];
}

// "use server";

// import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { AdminDoctor, DoctorStatus } from "../types/adminDoctor";

// export async function getDoctors(
//   status?: DoctorStatus
// ): Promise<AdminDoctor[]> {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "ADMIN") {
//     throw new Error("Unauthorized: Admin only");
//   }

//   const doctors = await prisma.independentDoctor.findMany({
//     where: status ? { status } : {}, // filter if status provided
//     orderBy: { createdAt: "desc" },
//   });

//   return doctors as unknown as AdminDoctor[];
// }
