import { DoctorServicesScreen } from "@/features/panel/doctor/service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

function isDoctorServiceTableMissing(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021" &&
    typeof error.meta?.table === "string" &&
    error.meta.table.includes("DoctorService")
  );
}

export default async function DoctorServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, status: true },
  });
  if (!doctor) redirect("/doctor/profile/submit");
  if (doctor.status !== "APPROVED") redirect("/doctor/approvals");

  const doctorServiceDelegate = (prisma as unknown as { doctorService?: typeof prisma.doctorService })
    .doctorService;
  let shouldUseAvailabilityFallback = !doctorServiceDelegate?.findMany;
  let services:
    | {
        id: string;
        name: string;
        category: "Consultation" | "Procedure" | "Diagnostic" | "Therapy" | "Preventive";
        price: number;
        duration: number;
        desc: string;
        avail: string;
        status: "Active" | "Inactive";
        sessions: number;
      }[]
    = [];

  if (doctorServiceDelegate?.findMany) {
    try {
      const dbServices = await doctorServiceDelegate.findMany({
        where: { doctorId: doctor.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          category: true,
          price: true,
          duration: true,
          description: true,
          availability: true,
          isActive: true,
          sessions: true,
        },
      });

      services = dbServices.map((service) => ({
        id: service.id,
        name: service.name,
        category: service.category as
          | "Consultation"
          | "Procedure"
          | "Diagnostic"
          | "Therapy"
          | "Preventive",
        price: service.price,
        duration: service.duration,
        desc: service.description ?? "",
        avail: service.availability,
        status: service.isActive ? ("Active" as const) : ("Inactive" as const),
        sessions: service.sessions,
      }));
    } catch (error) {
      if (!isDoctorServiceTableMissing(error)) {
        throw error;
      }
      shouldUseAvailabilityFallback = true;
    }
  }

  if (shouldUseAvailabilityFallback) {
    const fallbackDoctor = await prisma.independentDoctor.findUnique({
      where: { id: doctor.id },
      select: { availability: true },
    });
    const availability = (fallbackDoctor?.availability ?? {}) as Record<string, unknown>;
    const rawServices = Array.isArray(availability.services) ? availability.services : [];
    services = rawServices
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const s = item as Record<string, unknown>;
        if (typeof s.id !== "string" || typeof s.name !== "string") return null;
        return {
          id: s.id,
          name: s.name,
          category: ((s.category as string) || "Consultation") as
            | "Consultation"
            | "Procedure"
            | "Diagnostic"
            | "Therapy"
            | "Preventive",
          price: Number(s.price ?? 0),
          duration: Number(s.duration ?? 30),
          desc: typeof s.desc === "string" ? s.desc : "",
          avail: typeof s.avail === "string" ? s.avail : "All Days",
          status: s.status === "Inactive" ? ("Inactive" as const) : ("Active" as const),
          sessions: Number(s.sessions ?? 0),
        };
      })
      .filter(Boolean) as typeof services;
  }

  if (!shouldUseAvailabilityFallback && services.length === 0) {
    const fallbackDoctor = await prisma.independentDoctor.findUnique({
      where: { id: doctor.id },
      select: { availability: true },
    });
    const availability = (fallbackDoctor?.availability ?? {}) as Record<string, unknown>;
    const rawServices = Array.isArray(availability.services) ? availability.services : [];
    const fallbackServices = rawServices
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const s = item as Record<string, unknown>;
        if (typeof s.id !== "string" || typeof s.name !== "string") return null;
        return {
          id: s.id,
          name: s.name,
          category: ((s.category as string) || "Consultation") as
            | "Consultation"
            | "Procedure"
            | "Diagnostic"
            | "Therapy"
            | "Preventive",
          price: Number(s.price ?? 0),
          duration: Number(s.duration ?? 30),
          desc: typeof s.desc === "string" ? s.desc : "",
          avail: typeof s.avail === "string" ? s.avail : "All Days",
          status: s.status === "Inactive" ? ("Inactive" as const) : ("Active" as const),
          sessions: Number(s.sessions ?? 0),
        };
      })
      .filter(Boolean) as typeof services;

    if (fallbackServices.length > 0) {
      services = fallbackServices;
    }
  }

  return <DoctorServicesScreen firstTime={services.length === 0} initialServices={services} />;
}
