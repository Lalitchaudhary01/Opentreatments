"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getHospitalFromSession } from "./_helpers";
import type { HospitalServiceListItem } from "./getHospitalServices";

export type CreateHospitalServiceInput = {
  name: string;
  category: string;
  department: string;
  price: number;
  duration: string;
  description: string;
};

export async function createHospitalService(
  input: CreateHospitalServiceInput,
): Promise<{ success: true; service: HospitalServiceListItem } | { success: false; error: string }> {
  try {
    const hospital = await getHospitalFromSession();

    const name = input.name.trim();
    const category = input.category.trim();
    const department = input.department.trim();
    const duration = input.duration.trim();
    const description = input.description.trim();
    const price = Number(input.price);

    if (!name) return { success: false, error: "Service name is required" };
    if (!category) return { success: false, error: "Category is required" };
    if (!department) return { success: false, error: "Department is required" };
    if (!duration) return { success: false, error: "Duration is required" };
    if (!Number.isFinite(price) || price < 0) {
      return { success: false, error: "Price must be a valid amount" };
    }

    const created = await prisma.service.create({
      data: {
        hospitalId: hospital.id,
        name,
        category,
        department,
        duration,
        status: "Active",
        cost: price,
        description,
      },
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

    const mapped: HospitalServiceListItem = {
      id: created.id,
      name: created.name,
      category: created.category,
      department: created.department,
      duration: created.duration,
      priceLabel: `₹${Math.round(created.cost ?? 0).toLocaleString("en-IN")}`,
      status: created.status,
      description: created.description ?? "",
      createdAt: created.createdAt.toISOString(),
    };

    revalidatePath("/hospital/services");
    revalidatePath("/hospital/dashboard");

    return { success: true, service: mapped };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    if (err?.code === "P2022") {
      return {
        success: false,
        error:
          "Service schema is outdated. Run: npx prisma db push --schema=./prisma/schema.prisma",
      };
    }
    if (err?.code === "P2021") {
      return { success: false, error: "HospitalService table is missing in database" };
    }
    return { success: false, error: err?.message || "Failed to create hospital service" };
  }
}
