"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export type DoctorProfileViewData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  specialization: string;
  qualification: string;
  medicalRegistrationNumber: string;
  languages: string[];
  experienceLabel: string;
  clinicName: string;
  city: string;
  pinCode: string;
  address: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export async function getDoctorProfileView(): Promise<DoctorProfileViewData | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      phone: true,
      gender: true,
      specialization: true,
      qualification: true,
      medicalRegistrationNumber: true,
      languages: true,
      experienceLabel: true,
      clinicName: true,
      city: true,
      pinCode: true,
      address: true,
      status: true,
    },
  });

  if (!doctor) return null;

  return {
    id: doctor.id,
    name: doctor.name ?? "",
    email: session.user.email ?? "",
    phone: doctor.phone ?? "",
    gender: doctor.gender ?? "",
    specialization: doctor.specialization ?? "",
    qualification: doctor.qualification ?? "",
    medicalRegistrationNumber: doctor.medicalRegistrationNumber ?? "",
    languages: Array.isArray(doctor.languages) ? doctor.languages : [],
    experienceLabel: doctor.experienceLabel ?? "",
    clinicName: doctor.clinicName ?? "",
    city: doctor.city ?? "",
    pinCode: doctor.pinCode ?? "",
    address: doctor.address ?? "",
    status: doctor.status,
  };
}
