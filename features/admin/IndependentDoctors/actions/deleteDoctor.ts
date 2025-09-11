"use server";

import prisma from "@/lib/prisma";

export async function deleteDoctor(id: string): Promise<boolean> {
  if (!id) throw new Error("Doctor ID is required");

  try {
    await prisma.independentDoctor.delete({
      where: { id },
    });

    return true; // deletion successful
  } catch (error) {
    console.error("❌ deleteDoctor error:", error);
    throw new Error("Failed to delete doctor");
  }
}
