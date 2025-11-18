"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUser(userId: string, formData: FormData) {
  try {
    const updatedData = {
      age: formData.get("age") ? parseInt(formData.get("age") as string) : null,
      bloodGroup: formData.get("bloodGroup") as string,
      gender: formData.get("gender") as string,
      address: formData.get("address") as string,
      allergies: formData.get("allergies") as string,
      chronicDiseases: formData.get("chronicDiseases") as string,
      currentMedication: formData.get("currentMedication") as string,
      smoking: formData.get("smoking") as string,
      alcohol: formData.get("alcohol") as string,
      exercise: formData.get("exercise") as string,
    };

    const user = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    revalidatePath("/profile");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}
