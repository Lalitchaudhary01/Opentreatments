"use server";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { invalidateDoctorPanelCache } from "../../cache";

export async function addOfflinePatient(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Login required" };
    }

    const doctor = await prisma.independentDoctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true, status: true },
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    if (doctor.status !== "APPROVED") {
      return {
        success: false,
        error: "Offline patient registration is available after admin approval.",
      };
    }

    const firstName = ((formData.get("firstName") as string) || "").trim();
    const lastName = ((formData.get("lastName") as string) || "").trim();
    const fallbackPatientName = ((formData.get("patientName") as string) || "").trim();
    const patientName = `${firstName} ${lastName}`.trim() || fallbackPatientName;

    const dob = ((formData.get("dob") as string) || "").trim();
    const explicitAge = formData.get("patientAge")
      ? parseInt(formData.get("patientAge") as string, 10)
      : null;
    const patientAge =
      explicitAge ??
      (dob
        ? (() => {
            const date = new Date(dob);
            if (Number.isNaN(date.getTime())) return null;
            const now = new Date();
            let age = now.getFullYear() - date.getFullYear();
            const monthDiff = now.getMonth() - date.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) age -= 1;
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

    const prescriptionRaw = ((formData.get("prescription") as string) || "").trim();
    const prescription = prescriptionRaw || (metaBits.length ? metaBits.join(" | ") : null);

    if (!patientName || patientName.length < 2) {
      return { success: false, error: "Name must be at least 2 characters" };
    }

    if (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber)) {
      return { success: false, error: "Phone number must be 10 digits" };
    }

    if (patientAge !== null && (patientAge < 0 || patientAge > 150)) {
      return { success: false, error: "Age must be between 0-150" };
    }

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

    invalidateDoctorPanelCache({
      doctorId: doctor.id,
      paths: ["/doctor/overview", "/doctor/patients", "/doctor/appointments"],
    });

    return {
      success: true,
      message: "Patient added successfully",
      data: patient,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err?.code === "P2021") {
      return { success: false, error: "Database table not found. Run migrations first." };
    }
    return { success: false, error: err?.message || "Failed to add patient" };
  }
}

