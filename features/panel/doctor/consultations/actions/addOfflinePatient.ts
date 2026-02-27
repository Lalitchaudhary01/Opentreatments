"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

export async function addOfflinePatient(formData: FormData) {
  try {
    // 1. Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Login required" };
    }

    // 2. Get doctor
    const doctor = await prisma.independentDoctor.findUnique({
      where: { userId: session.user.id }
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    // 3. Get form data
    const patientName = formData.get("patientName") as string;
    const patientAge = formData.get("patientAge") ? parseInt(formData.get("patientAge") as string) : null;
    const patientGender = formData.get("patientGender") as string || null;
    const phoneNumber = formData.get("phoneNumber") as string || null;
    const complaint = formData.get("complaint") as string;
    const prescription = formData.get("prescription") as string || null;
    const followUpDate = formData.get("followUpDate") as string || null;

    // 4. Basic validation
    if (!patientName || patientName.length < 2) {
      return { success: false, error: "Name must be at least 2 characters" };
    }
    
    if (!complaint || complaint.length < 3) {
      return { success: false, error: "Complaint must be at least 3 characters" };
    }

    if (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber)) {
      return { success: false, error: "Phone number must be 10 digits" };
    }

    if (patientAge && (patientAge < 0 || patientAge > 150)) {
      return { success: false, error: "Age must be between 0-150" };
    }

    // 5. Create patient
    const patient = await prisma.offlineConsultation.create({
      data: {
        doctorId: doctor.id,
        patientName,
        patientAge,
        patientGender,
        phoneNumber,
        complaint,
        prescription,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        visitTime: new Date(),
      },
    });

    // 6. Revalidate
    revalidatePath("/dashboard");
    revalidatePath("/doctor/patients");

    return { 
      success: true, 
      message: "Patient added successfully!",
      data: patient 
    };

  } catch (error: any) {
    console.error("Error:", error);
    
    // Prisma error
    if (error?.code === "P2021") {
      return { success: false, error: "Database table not found. Run migrations first." };
    }
    
    return { 
      success: false, 
      error: error?.message || "Failed to add patient" 
    };
  }
}