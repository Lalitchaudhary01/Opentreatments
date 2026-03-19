"use server";

import prisma from "@/lib/prisma";
import { UserLabDetail } from "../types/userLab";

export async function getLabById(id: string): Promise<UserLabDetail | null> {
  try {
    const lab = await prisma.labCompany.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        address: true,
        city: true,
        state: true,
        country: true,
        pincode: true,
        phone: true,
        email: true,
        website: true,
        rating: true,
        totalReviews: true,
        status: true,
        homeCollection: true,
        registrationNumber: true,
        licenseNumber: true,
        description: true,
        tests: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            category: true,
            price: true,
            discountedPrice: true,
            tatHours: true,
            sampleType: true,
            fastingRequired: true,
            isActive: true,
          },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        packages: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            category: true,
            price: true,
            discountedPrice: true,
            reportTat: true,
            isActive: true,
          },
          orderBy: { createdAt: "desc" },
          take: 12,
        },
        _count: {
          select: {
            tests: true,
            packages: true,
          },
        },
      },
    });

    if (!lab || lab.status !== "APPROVED") {
      return null;
    }

    return {
      id: lab.id,
      name: lab.name,
      slug: lab.slug,
      address: lab.address,
      city: lab.city ?? undefined,
      state: lab.state ?? undefined,
      country: lab.country ?? undefined,
      pincode: lab.pincode ?? undefined,
      phone: lab.phone ?? undefined,
      email: lab.email,
      website: lab.website ?? undefined,
      rating: lab.rating,
      totalReviews: lab.totalReviews,
      status: lab.status,
      homeCollection: lab.homeCollection,
      registrationNumber: lab.registrationNumber ?? undefined,
      licenseNumber: lab.licenseNumber ?? undefined,
      description: lab.description ?? undefined,
      testsCount: lab._count.tests,
      packagesCount: lab._count.packages,
      tests: lab.tests.map((test) => ({
        id: test.id,
        name: test.name,
        category: test.category,
        price: test.price,
        discountedPrice: test.discountedPrice ?? undefined,
        tatHours: test.tatHours ?? undefined,
        sampleType: test.sampleType ?? undefined,
        fastingRequired: test.fastingRequired,
        isActive: test.isActive,
      })),
      packages: lab.packages.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        category: pkg.category,
        price: pkg.price,
        discountedPrice: pkg.discountedPrice ?? undefined,
        reportTat: pkg.reportTat ?? undefined,
        isActive: pkg.isActive,
      })),
    };
  } catch (error) {
    console.error("getLabById failed", error);
    return null;
  }
}
