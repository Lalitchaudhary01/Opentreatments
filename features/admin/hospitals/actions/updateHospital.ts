"use server";

import prisma from "@/lib/prisma"; // Adjust import path as needed
import { revalidatePath } from "next/cache";

interface UpdateHospitalData {
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  type?: string;
  verified: boolean;
  emergencyAvailable: boolean;
  bedCount?: number;
  availableBeds?: number;
  rating?: number;
  totalReviews?: number;
  logo?: string;
  image?: string;
  facilities: Array<{ id?: string; name: string }>;
  services: Array<{
    id?: string;
    name: string;
    description?: string;
    cost?: number;
  }>;
  doctors: Array<{
    id?: string;
    name: string;
    specialization: string;
    experience?: number;
  }>;
  procedures: Array<{
    id?: string;
    name: string;
    description?: string;
    cost?: number;
    duration?: string;
  }>;
  insurances: Array<{
    id?: string;
    name: string;
    provider?: string;
    cashless: boolean;
  }>;
}

export async function updateHospital(
  hospitalId: string,
  data: UpdateHospitalData
) {
  try {
    // Basic hospital data update
    const hospitalUpdateData = {
      name: data.name,
      description: data.description || null,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      phone: data.phone || null,
      email: data.email || null,
      website: data.website || null,
      type: data.type || null,
      verified: data.verified,
      emergencyAvailable: data.emergencyAvailable,
      bedCount: data.bedCount || null,
      availableBeds: data.availableBeds || null,
      rating: data.rating || null,
      totalReviews: data.totalReviews || null,
      logo: data.logo || null,
      image: data.image || null,
      updatedAt: new Date(),
    };

    // Use transaction to ensure all updates succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // Update main hospital record
      const updatedHospital = await tx.hospital.update({
        where: { id: hospitalId },
        data: hospitalUpdateData,
      });

      // Update facilities
      if (data.facilities) {
        // Delete existing facilities
        await tx.facility.deleteMany({
          where: { hospitalId: hospitalId },
        });

        // Add new facilities
        if (data.facilities.length > 0) {
          await tx.facility.createMany({
            data: data.facilities
              .filter((facility) => facility.name.trim()) // Only add non-empty facilities
              .map((facility) => ({
                hospitalId: hospitalId,
                name: facility.name,
              })),
          });
        }
      }

      // Update services
      if (data.services) {
        await tx.service.deleteMany({
          where: { hospitalId: hospitalId },
        });

        if (data.services.length > 0) {
          await tx.service.createMany({
            data: data.services
              .filter((service) => service.name.trim()) // Only add non-empty services
              .map((service) => ({
                hospitalId: hospitalId,
                name: service.name,
                description: service.description || null,
                cost: service.cost || null,
              })),
          });
        }
      }

      // Update doctors
      if (data.doctors) {
        await tx.doctor.deleteMany({
          where: { hospitalId: hospitalId },
        });

        if (data.doctors.length > 0) {
          await tx.doctor.createMany({
            data: data.doctors
              .filter(
                (doctor) => doctor.name.trim() && doctor.specialization.trim()
              ) // Only add complete doctors
              .map((doctor) => ({
                hospitalId: hospitalId,
                name: doctor.name,
                specialization: doctor.specialization,
                experience: doctor.experience || null,
              })),
          });
        }
      }

      // Update procedures
      if (data.procedures) {
        await tx.procedure.deleteMany({
          where: { hospitalId: hospitalId },
        });

        if (data.procedures.length > 0) {
          await tx.procedure.createMany({
            data: data.procedures
              .filter((procedure) => procedure.name.trim()) // Only add non-empty procedures
              .map((procedure) => ({
                hospitalId: hospitalId,
                name: procedure.name,
                description: procedure.description || null,
                cost: procedure.cost || null,
                duration: procedure.duration || null,
              })),
          });
        }
      }

      // Update insurances
      if (data.insurances) {
        await tx.insurance.deleteMany({
          where: { hospitalId: hospitalId },
        });

        if (data.insurances.length > 0) {
          await tx.insurance.createMany({
            data: data.insurances
              .filter((insurance) => insurance.name.trim()) // Only add non-empty insurances
              .map((insurance) => ({
                hospitalId: hospitalId,
                name: insurance.name,
                provider: insurance.provider || null,
                cashless: insurance.cashless,
              })),
          });
        }
      }

      return updatedHospital;
    });

    // Revalidate relevant paths to update cached data
    revalidatePath(`/admin/hospitals/${hospitalId}`);
    revalidatePath("/admin/hospitals");

    return result;
  } catch (error) {
    console.error("Error updating hospital:", error);
    throw new Error("Failed to update hospital. Please try again.");
  }
}
