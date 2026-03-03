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

    // 3. Get form data (supports both old + new modal fields)
    const firstName = ((formData.get("firstName") as string) || "").trim();
    const lastName = ((formData.get("lastName") as string) || "").trim();
    const fallbackPatientName = ((formData.get("patientName") as string) || "").trim();
    const patientName = `${firstName} ${lastName}`.trim() || fallbackPatientName;

    const dob = ((formData.get("dob") as string) || "").trim();
    const explicitAge = formData.get("patientAge") ? parseInt(formData.get("patientAge") as string) : null;
    const patientAge =
      explicitAge ??
      (dob
        ? (() => {
            const date = new Date(dob);
            if (Number.isNaN(date.getTime())) return null;
            const now = new Date();
            let age = now.getFullYear() - date.getFullYear();
            const m = now.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < date.getDate())) age -= 1;
            return age >= 0 ? age : null;
          })()
        : null);

    const patientGender = ((formData.get("patientGender") as string) || "").trim() || null;
    const phoneNumber = ((formData.get("phoneNumber") as string) || "").trim() || null;
    const city = ((formData.get("city") as string) || "").trim();
    const bloodGroup = ((formData.get("bloodGroup") as string) || "").trim();
    const complaintInput = ((formData.get("complaint") as string) || "").trim();
    const complaint = complaintInput || "Walk-in registration";
    const followUpDate = ((formData.get("followUpDate") as string) || "").trim() || null;

    const metaBits = [
      city ? `City: ${city}` : null,
      bloodGroup ? `Blood: ${bloodGroup}` : null,
      dob ? `DOB: ${dob}` : null,
    ].filter(Boolean);
    const prescription =
      (((formData.get("prescription") as string) || "").trim() || null) ??
      (metaBits.length ? metaBits.join(" | ") : null);

    // 4. Basic validation
    if (!patientName || patientName.length < 2) {
      return { success: false, error: "Name must be at least 2 characters" };
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
