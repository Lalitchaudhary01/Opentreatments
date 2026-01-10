"use server";

import prisma from "@/lib/prisma";
import { DoctorStatus } from "@prisma/client";
import { GetApprovedDoctorsResponse } from "../types/userDoctor";

export async function getApprovedDoctors(): Promise<GetApprovedDoctorsResponse> {
  try {
    // Check total doctors and approved doctors count for debugging
    const totalCount = await prisma.independentDoctor.count();
    const approvedCount = await prisma.independentDoctor.count({
      where: { status: DoctorStatus.APPROVED }
    });
    
    console.log(`[getApprovedDoctors] Total doctors: ${totalCount}, Approved: ${approvedCount}`);
    
    // Use enum from Prisma client instead of string
    const doctors = await prisma.independentDoctor.findMany({
      where: { 
        status: DoctorStatus.APPROVED
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        specialization: true,
        specialties: true,
        experience: true,
        city: true,
        profilePic: true,
        fees: true,
        rating: true,
        totalReviews: true,
        languages: true,
        userId: true,
        user: {
          // ✅ include user relation
          select: {
            email: true,
            phone: true, // ✅ get phone here
          },
        },
      },
    });

    console.log(`[getApprovedDoctors] Found ${doctors.length} approved doctors`);

    // Map doctors and handle missing user relations gracefully
    const mappedDoctors = doctors
      .filter((doc) => {
        if (!doc.user) {
          console.warn(`[getApprovedDoctors] Doctor ${doc.id} (${doc.name}) has no user relation`);
          return false;
        }
        return true;
      })
      .map((doc) => ({
        id: doc.id,
        name: doc.name || "Unknown Doctor",
        email: doc.user?.email ?? "",
        phone: doc.user?.phone ?? "",
        specialization: doc.specialization || "",
        specialties: Array.isArray(doc.specialties) ? doc.specialties : [],
        experience: doc.experience ?? undefined,
        city: doc.city ?? undefined,
        profilePic: doc.profilePic ?? null,
        fees: doc.fees ?? null,
        rating: doc.rating ?? null,
        totalReviews: doc.totalReviews ?? null,
        languages: Array.isArray(doc.languages) ? doc.languages : [],
      }));

    console.log(`[getApprovedDoctors] Returning ${mappedDoctors.length} mapped doctors`);
    return mappedDoctors;
  } catch (error: any) {
    // More detailed error logging for debugging
    const errorDetails = {
      message: error?.message || "Unknown error",
      code: error?.code,
      meta: error?.meta,
      name: error?.name,
    };
    
    console.error("Error in getApprovedDoctors:", errorDetails);
    
    // In development, log full stack trace
    if (process.env.NODE_ENV === "development") {
      console.error("Full error:", error);
    }
    
    // Return empty array instead of throwing to prevent client-side crashes
    return [];
  }
}
