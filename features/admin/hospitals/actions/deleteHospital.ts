"use server";

import prisma from "@/lib/prisma";

export async function deleteHospital(id: string) {
  try {
    await prisma.hospital.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting hospital:", error);
    throw new Error("Failed to delete hospital");
  }
}
