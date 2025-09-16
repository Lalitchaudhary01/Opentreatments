"use server";

import prisma from "@/lib/prisma";
import { DoctorStatus, AdminUpdateDoctorInput } from "../types/doctorProfile";

export async function adminUpdateDoctor(data: AdminUpdateDoctorInput) {
  const { doctorId, ...rest } = data;

  const updated = await prisma.independentDoctor.update({
    where: { id: doctorId },
    data: {
      ...rest,
    },
  });

  return updated;
}

export async function adminDeleteDoctor(doctorId: string) {
  return prisma.independentDoctor.delete({
    where: { id: doctorId },
  });
}

// "use server";

// import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { DoctorStatus, AdminUpdateDoctorInput } from "../types/doctorProfile";

// async function ensureAdmin() {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user?.role !== "ADMIN") {
//     throw new Error("Unauthorized – Admin only");
//   }
//   return session;
// }

// // ✅ Admin can approve / reject / edit doctor info
// export async function adminUpdateDoctor(
//   data: AdminUpdateDoctorInput
// ) {
//   await ensureAdmin();

//   const { doctorId, ...rest } = data;

//   const updated = await prisma.independentDoctor.update({
//     where: { id: doctorId },
//     data: {
//       ...rest,
//     },
//   });

//   return updated;
// }

// // ✅ Admin can delete doctor profile
// export async function adminDeleteDoctor(doctorId: string) {
//   await ensureAdmin();

//   return prisma.independentDoctor.delete({
//     where: { id: doctorId },
//   });
// }

// // ✅ Admin can change status explicitly
// export async function adminUpdateDoctorStatus(
//   doctorId: string,
//   status: DoctorStatus
// ) {
//   await ensureAdmin();

//   return prisma.independentDoctor.update({
//     where: { id: doctorId },
//     data: { status },
//   });
// }
