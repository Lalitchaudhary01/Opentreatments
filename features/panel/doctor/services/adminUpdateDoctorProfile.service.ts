import prisma from "@/lib/prisma";
import { DoctorStatus, AdminUpdateDoctorInput } from "../types";

/* ===============================
   ADMIN UPDATE FULL DOCTOR
================================ */
export async function adminUpdateDoctorService(
  doctorId: string,
  data: Partial<AdminUpdateDoctorInput>
) {
  return prisma.independentDoctor.update({
    where: { id: doctorId },
    data,
  });
}

/* ===============================
   ADMIN DELETE DOCTOR
================================ */
export async function adminDeleteDoctorService(
  doctorId: string
) {
  return prisma.independentDoctor.delete({
    where: { id: doctorId },
  });
}

/* ===============================
   ADMIN UPDATE STATUS
================================ */
export async function adminUpdateDoctorStatusService(
  doctorId: string,
  status: DoctorStatus
) {
  return prisma.independentDoctor.update({
    where: { id: doctorId },
    data: { status },
  });
}