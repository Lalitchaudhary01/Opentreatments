"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { DoctorService, ServiceCategory, ServiceStatus } from "../types";

export type DoctorServicePayload = {
  name: string;
  category: ServiceCategory;
  price: number;
  duration: number;
  desc: string;
  avail: string;
  status: ServiceStatus;
};

type StoredDoctorService = {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  duration: number;
  desc: string;
  avail: string;
  status: ServiceStatus;
  sessions: number;
};

async function getDoctorIdFromSession(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "DOCTOR") {
    throw new Error("Unauthorized");
  }

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, status: true },
  });

  if (!doctor) {
    throw new Error("Doctor profile not found");
  }

  if (doctor.status !== "APPROVED") {
    throw new Error("Doctor account is not approved");
  }

  return doctor.id;
}

function mapRowToUiService(row: {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string | null;
  availability: string;
  isActive: boolean;
  sessions: number;
}): DoctorService {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ServiceCategory,
    price: row.price,
    duration: row.duration,
    desc: row.description ?? "",
    avail: row.availability,
    status: row.isActive ? "Active" : "Inactive",
    sessions: row.sessions,
  };
}

function normalizeStoredService(value: unknown): StoredDoctorService | null {
  if (!value || typeof value !== "object") return null;
  const s = value as Record<string, unknown>;
  if (typeof s.id !== "string" || typeof s.name !== "string") return null;
  return {
    id: s.id,
    name: s.name,
    category: (s.category as ServiceCategory) || "Consultation",
    price: Number(s.price ?? 0),
    duration: Number(s.duration ?? 30),
    desc: typeof s.desc === "string" ? s.desc : "",
    avail: typeof s.avail === "string" ? s.avail : "All Days",
    status: s.status === "Inactive" ? "Inactive" : "Active",
    sessions: Number(s.sessions ?? 0),
  };
}

async function getDoctorServicesFromAvailability(doctorId: string): Promise<StoredDoctorService[]> {
  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: doctorId },
    select: { availability: true },
  });
  const availability = (doctor?.availability ?? {}) as Record<string, unknown>;
  const raw = Array.isArray(availability.services) ? availability.services : [];
  return raw.map(normalizeStoredService).filter(Boolean) as StoredDoctorService[];
}

async function saveDoctorServicesToAvailability(
  doctorId: string,
  services: StoredDoctorService[]
): Promise<void> {
  const doctor = await prisma.independentDoctor.findUnique({
    where: { id: doctorId },
    select: { availability: true },
  });
  const current = (doctor?.availability ?? {}) as Record<string, unknown>;
  const nextAvailability = {
    ...current,
    services,
  };
  await prisma.independentDoctor.update({
    where: { id: doctorId },
    data: { availability: nextAvailability as Prisma.InputJsonValue },
  });
}

export async function createDoctorService(
  payload: DoctorServicePayload
): Promise<DoctorService> {
  const doctorId = await getDoctorIdFromSession();
  const doctorServiceDelegate = (prisma as unknown as { doctorService?: typeof prisma.doctorService })
    .doctorService;

  if (doctorServiceDelegate?.create) {
    const created = await doctorServiceDelegate.create({
      data: {
        doctorId,
        name: payload.name.trim(),
        category: payload.category,
        price: payload.price,
        duration: payload.duration,
        description: payload.desc.trim() || null,
        availability: payload.avail,
        isActive: payload.status === "Active",
      },
    });
    revalidatePath("/doctor/services");
    return mapRowToUiService(created);
  }

  const created: StoredDoctorService = {
    id: `svc_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    name: payload.name.trim(),
    category: payload.category,
    price: payload.price,
    duration: payload.duration,
    desc: payload.desc.trim(),
    avail: payload.avail,
    status: payload.status,
    sessions: 0,
  };
  const current = await getDoctorServicesFromAvailability(doctorId);
  await saveDoctorServicesToAvailability(doctorId, [created, ...current]);
  revalidatePath("/doctor/services");
  return created;
}

export async function updateDoctorService(
  id: string,
  payload: DoctorServicePayload
): Promise<DoctorService> {
  const doctorId = await getDoctorIdFromSession();
  const doctorServiceDelegate = (prisma as unknown as { doctorService?: typeof prisma.doctorService })
    .doctorService;

  if (doctorServiceDelegate?.update && doctorServiceDelegate?.findFirst) {
    const existing = await doctorServiceDelegate.findFirst({
      where: { id, doctorId },
      select: { id: true },
    });
    if (!existing) throw new Error("Service not found");

    const updated = await doctorServiceDelegate.update({
      where: { id },
      data: {
        name: payload.name.trim(),
        category: payload.category,
        price: payload.price,
        duration: payload.duration,
        description: payload.desc.trim() || null,
        availability: payload.avail,
        isActive: payload.status === "Active",
      },
    });
    revalidatePath("/doctor/services");
    return mapRowToUiService(updated);
  }

  const current = await getDoctorServicesFromAvailability(doctorId);
  const target = current.find((item) => item.id === id);
  if (!target) throw new Error("Service not found");

  const updated: StoredDoctorService = {
    ...target,
    name: payload.name.trim(),
    category: payload.category,
    price: payload.price,
    duration: payload.duration,
    desc: payload.desc.trim(),
    avail: payload.avail,
    status: payload.status,
  };
  await saveDoctorServicesToAvailability(
    doctorId,
    current.map((item) => (item.id === id ? updated : item))
  );
  revalidatePath("/doctor/services");
  return updated;
}

export async function toggleDoctorServiceStatus(
  id: string,
  nextStatus: ServiceStatus
): Promise<DoctorService> {
  const doctorId = await getDoctorIdFromSession();
  const doctorServiceDelegate = (prisma as unknown as { doctorService?: typeof prisma.doctorService })
    .doctorService;

  if (doctorServiceDelegate?.update && doctorServiceDelegate?.findFirst) {
    const existing = await doctorServiceDelegate.findFirst({
      where: { id, doctorId },
      select: { id: true },
    });
    if (!existing) throw new Error("Service not found");

    const updated = await doctorServiceDelegate.update({
      where: { id },
      data: { isActive: nextStatus === "Active" },
    });
    revalidatePath("/doctor/services");
    return mapRowToUiService(updated);
  }

  const current = await getDoctorServicesFromAvailability(doctorId);
  const target = current.find((item) => item.id === id);
  if (!target) throw new Error("Service not found");

  const updated: StoredDoctorService = { ...target, status: nextStatus };
  await saveDoctorServicesToAvailability(
    doctorId,
    current.map((item) => (item.id === id ? updated : item))
  );
  revalidatePath("/doctor/services");
  return updated;
}

export async function deleteDoctorService(id: string): Promise<{ id: string }> {
  const doctorId = await getDoctorIdFromSession();
  const doctorServiceDelegate = (prisma as unknown as { doctorService?: typeof prisma.doctorService })
    .doctorService;

  if (doctorServiceDelegate?.delete && doctorServiceDelegate?.findFirst) {
    const existing = await doctorServiceDelegate.findFirst({
      where: { id, doctorId },
      select: { id: true },
    });
    if (!existing) throw new Error("Service not found");
    await doctorServiceDelegate.delete({ where: { id } });
    revalidatePath("/doctor/services");
    return { id };
  }

  const current = await getDoctorServicesFromAvailability(doctorId);
  const exists = current.some((item) => item.id === id);
  if (!exists) throw new Error("Service not found");
  await saveDoctorServicesToAvailability(
    doctorId,
    current.filter((item) => item.id !== id)
  );

  revalidatePath("/doctor/services");
  return { id };
}
