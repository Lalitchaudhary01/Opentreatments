"use server";
import prisma from "@/lib/prisma";
import type { Hospital } from "../types/hospital";

export async function getHospitals(): Promise<Hospital[]> {
  try {
    const hospitals = await prisma.hospital.findMany({
      include: { facilities: true, services: true },
    });
    //@ts-ignore
    return hospitals as Hospital[];
  } catch (error) {
    console.error("❌ getHospitals error:", error);
    return [];
  }
}
