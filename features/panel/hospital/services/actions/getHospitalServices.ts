"use server";

import prisma from "@/lib/prisma";
import { getHospitalFromSession } from "./_helpers";

export type HospitalServiceListItem = {
  id: string;
  name: string;
  category: string;
  department: string;
  duration: string;
  priceLabel: string;
  status: string;
  description: string;
  createdAt: string;
};

export async function getHospitalServices(): Promise<HospitalServiceListItem[]> {
  const hospital = await getHospitalFromSession();

  type ServiceRow = {
    id: string;
    name: string;
    category: string;
    department: string;
    duration: string;
    status: string;
    cost: number | null;
    description: string | null;
    createdAt: Date;
  };
  let rows: ServiceRow[] = [];

  try {
    rows = await prisma.service.findMany({
      where: { hospitalId: hospital.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        category: true,
        department: true,
        duration: true,
        status: true,
        cost: true,
        description: true,
        createdAt: true,
      },
    });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err?.code === "P2021") {
      return [];
    }
    if (err?.code === "P2022") {
      const legacyRows = await prisma.service.findMany({
        where: { hospitalId: hospital.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          cost: true,
          description: true,
          createdAt: true,
        },
      });

      return legacyRows.map((row) => {
        let category = "Consultation";
        let department = "General";
        let duration = "30 min";
        let status = "Active";
        let description = row.description ?? "";

        try {
          const parsed = JSON.parse(row.description || "{}") as {
            category?: string;
            department?: string;
            duration?: string;
            status?: string;
            description?: string;
          };
          category = parsed.category || category;
          department = parsed.department || department;
          duration = parsed.duration || duration;
          status = parsed.status || status;
          description = parsed.description || description;
        } catch {
          // Legacy plain text description; keep defaults.
        }

        return {
          id: row.id,
          name: row.name,
          category,
          department,
          duration,
          priceLabel:
            typeof row.cost === "number"
              ? `₹${Math.round(row.cost).toLocaleString("en-IN")}`
              : "₹0",
          status,
          description,
          createdAt: row.createdAt.toISOString(),
        };
      });
    }
    throw error;
  }

  return rows.map((row) => {
    const priceLabel =
      typeof row.cost === "number"
        ? `₹${Math.round(row.cost).toLocaleString("en-IN")}`
        : "₹0";

    return {
      id: row.id,
      name: row.name,
      category: row.category,
      department: row.department,
      duration: row.duration,
      priceLabel,
      status: row.status,
      description: row.description ?? "",
      createdAt: row.createdAt.toISOString(),
    };
  });
}
