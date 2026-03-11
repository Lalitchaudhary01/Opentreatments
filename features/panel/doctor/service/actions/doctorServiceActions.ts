"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { DoctorService, ServiceCategory, ServiceStatus } from "../types";
import { invalidateDoctorPanelCache } from "../../cache";

export type DoctorServicePayload = {
  name: string;
  category: ServiceCategory;
  price: number;
  discountPrice: number | null;
  duration: number;
  desc: string;
  avail: string;
  isOnline: boolean;
  maxSlots: number | null;
  tags: string[];
  status: ServiceStatus;
};

type StoredDoctorService = {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  discountPrice: number | null;
  duration: number;
  desc: string;
  avail: string;
  isOnline: boolean;
  maxSlots: number | null;
  tags: string[];
  status: ServiceStatus;
  sessions: number;
};

function isDoctorServiceTableMissing(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021" &&
    typeof error.meta?.table === "string" &&
    error.meta.table.includes("DoctorService")
  );
}

function isDoctorServiceLegacySchemaError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientValidationError) return true;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return (
      error.code === "P2021" || // table missing
      error.code === "P2022" // column missing
    );
  }
  return false;
}

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

  return doctor.id;
}

function mapRowToUiService(row: {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number | null;
  duration: number;
  description: string | null;
  availability: string;
  isOnline: boolean;
  maxSlots: number | null;
  tags: string[];
  isActive: boolean;
  sessions: number;
}): DoctorService {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ServiceCategory,
    price: row.price,
    discountPrice: row.discountPrice,
    duration: row.duration,
    desc: row.description ?? "",
    avail: row.availability,
    isOnline: row.isOnline,
    maxSlots: row.maxSlots,
    tags: Array.isArray(row.tags) ? row.tags : [],
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
    discountPrice:
      typeof s.discountPrice === "number" ? Number(s.discountPrice) : null,
    duration: Number(s.duration ?? 30),
    desc: typeof s.desc === "string" ? s.desc : "",
    avail: typeof s.avail === "string" ? s.avail : "All Days",
    isOnline: typeof s.isOnline === "boolean" ? s.isOnline : true,
    maxSlots: typeof s.maxSlots === "number" ? Number(s.maxSlots) : null,
    tags: Array.isArray(s.tags)
      ? s.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
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
    try {
      let created;
      try {
        created = await doctorServiceDelegate.create({
          data: {
            doctorId,
            name: payload.name.trim(),
            category: payload.category,
            price: payload.price,
            discountPrice: payload.discountPrice,
            duration: payload.duration,
            description: payload.desc.trim() || null,
            availability: payload.avail,
            isOnline: payload.isOnline,
            maxSlots: payload.maxSlots,
            tags: payload.tags,
            isActive: payload.status === "Active",
          },
        });
      } catch (error) {
        if (!isDoctorServiceLegacySchemaError(error)) throw error;
        created = await doctorServiceDelegate.create({
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
      }
      invalidateDoctorPanelCache({
        doctorId,
        paths: ["/doctor/services", "/doctor/overview"],
      });
      return mapRowToUiService(created);
    } catch (error) {
      if (!isDoctorServiceTableMissing(error)) throw error;
    }
  }

  const created: StoredDoctorService = {
    id: `svc_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    name: payload.name.trim(),
    category: payload.category,
    price: payload.price,
    discountPrice: payload.discountPrice,
    duration: payload.duration,
    desc: payload.desc.trim(),
    avail: payload.avail,
    isOnline: payload.isOnline,
    maxSlots: payload.maxSlots,
    tags: payload.tags,
    status: payload.status,
    sessions: 0,
  };
  const current = await getDoctorServicesFromAvailability(doctorId);
  await saveDoctorServicesToAvailability(doctorId, [created, ...current]);
  invalidateDoctorPanelCache({
    doctorId,
    paths: ["/doctor/services", "/doctor/overview"],
  });
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
    try {
      const existing = await doctorServiceDelegate.findFirst({
        where: { id, doctorId },
        select: { id: true },
      });
      if (!existing) throw new Error("Service not found");

      let updated;
      try {
        updated = await doctorServiceDelegate.update({
          where: { id },
          data: {
            name: payload.name.trim(),
            category: payload.category,
            price: payload.price,
            discountPrice: payload.discountPrice,
            duration: payload.duration,
            description: payload.desc.trim() || null,
            availability: payload.avail,
            isOnline: payload.isOnline,
            maxSlots: payload.maxSlots,
            tags: payload.tags,
            isActive: payload.status === "Active",
          },
        });
      } catch (error) {
        if (!isDoctorServiceLegacySchemaError(error)) throw error;
        updated = await doctorServiceDelegate.update({
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
      }
      invalidateDoctorPanelCache({
        doctorId,
        paths: ["/doctor/services", "/doctor/overview"],
      });
      return mapRowToUiService(updated);
    } catch (error) {
      if (!isDoctorServiceTableMissing(error)) throw error;
    }
  }

  const current = await getDoctorServicesFromAvailability(doctorId);
  const target = current.find((item) => item.id === id);
  if (!target) throw new Error("Service not found");

  const updated: StoredDoctorService = {
    ...target,
    name: payload.name.trim(),
    category: payload.category,
    price: payload.price,
    discountPrice: payload.discountPrice,
    duration: payload.duration,
    desc: payload.desc.trim(),
    avail: payload.avail,
    isOnline: payload.isOnline,
    maxSlots: payload.maxSlots,
    tags: payload.tags,
    status: payload.status,
  };
  await saveDoctorServicesToAvailability(
    doctorId,
    current.map((item) => (item.id === id ? updated : item))
  );
  invalidateDoctorPanelCache({
    doctorId,
    paths: ["/doctor/services", "/doctor/overview"],
  });
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
    try {
      const existing = await doctorServiceDelegate.findFirst({
        where: { id, doctorId },
        select: { id: true },
      });
      if (!existing) throw new Error("Service not found");

      const updated = await doctorServiceDelegate.update({
        where: { id },
        data: { isActive: nextStatus === "Active" },
      });
      invalidateDoctorPanelCache({
        doctorId,
        paths: ["/doctor/services", "/doctor/overview"],
      });
      return mapRowToUiService(updated);
    } catch (error) {
      if (!isDoctorServiceTableMissing(error)) throw error;
    }
  }

  const current = await getDoctorServicesFromAvailability(doctorId);
  const target = current.find((item) => item.id === id);
  if (!target) throw new Error("Service not found");

  const updated: StoredDoctorService = { ...target, status: nextStatus };
  await saveDoctorServicesToAvailability(
    doctorId,
    current.map((item) => (item.id === id ? updated : item))
  );
  invalidateDoctorPanelCache({
    doctorId,
    paths: ["/doctor/services", "/doctor/overview"],
  });
  return updated;
}

export async function deleteDoctorService(id: string): Promise<{ id: string }> {
  const doctorId = await getDoctorIdFromSession();
  const doctorServiceDelegate = (prisma as unknown as { doctorService?: typeof prisma.doctorService })
    .doctorService;

  if (doctorServiceDelegate?.delete && doctorServiceDelegate?.findFirst) {
    try {
      const existing = await doctorServiceDelegate.findFirst({
        where: { id, doctorId },
        select: { id: true },
      });
      if (!existing) throw new Error("Service not found");
      await doctorServiceDelegate.delete({ where: { id } });
      invalidateDoctorPanelCache({
        doctorId,
        paths: ["/doctor/services", "/doctor/overview"],
      });
      return { id };
    } catch (error) {
      if (!isDoctorServiceTableMissing(error)) throw error;
    }
  }

  const current = await getDoctorServicesFromAvailability(doctorId);
  const exists = current.some((item) => item.id === id);
  if (!exists) throw new Error("Service not found");
  await saveDoctorServicesToAvailability(
    doctorId,
    current.filter((item) => item.id !== id)
  );

  invalidateDoctorPanelCache({
    doctorId,
    paths: ["/doctor/services", "/doctor/overview"],
  });
  return { id };
}
