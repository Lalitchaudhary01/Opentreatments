"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ✅ Add a new doctor under logged-in hospital
export async function addHospitalDoctor(data: {
  name: string;
  specialization: string;
  experience?: number | null;
  profilePic?: string | null;
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
  });

  if (!hospital) throw new Error("Hospital profile not found");

  const doctor = await prisma.doctor.create({
    data: {
      ...data,
      hospitalId: hospital.id,
    },
  });

  return doctor;
}

// ✅ Fetch all doctors of logged-in hospital
export async function getHospitalDoctors() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
    include: { doctors: true },
  });

  if (!hospital) throw new Error("Hospital profile not found");

  return hospital.doctors;
}

// ✅ Update a doctor under logged-in hospital
export async function updateHospitalDoctor(
  doctorId: string,
  data: {
    name?: string;
    specialization?: string;
    experience?: number | null;
    profilePic?: string | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
    include: { doctors: true },
  });

  if (!hospital) throw new Error("Hospital profile not found");

  const doctor = hospital.doctors.find((d) => d.id === doctorId);
  if (!doctor) throw new Error("Doctor not found in your hospital");

  return prisma.doctor.update({
    where: { id: doctorId },
    data,
  });
}

// ✅ Delete a doctor under logged-in hospital
export async function deleteHospitalDoctor(doctorId: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "HOSPITAL") {
    throw new Error("Unauthorized");
  }

  const hospital = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
    include: { doctors: true },
  });

  if (!hospital) throw new Error("Hospital profile not found");

  const doctor = hospital.doctors.find((d) => d.id === doctorId);
  if (!doctor) throw new Error("Doctor not found in your hospital");

  await prisma.doctor.delete({
    where: { id: doctorId },
  });

  return { success: true };
}
