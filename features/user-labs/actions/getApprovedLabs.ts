"use server";

import prisma from "@/lib/prisma";
import { UserLabListItem } from "../types/userLab";

export async function getApprovedLabs(): Promise<UserLabListItem[]> {
  try {
    const labs = await prisma.labCompany.findMany({
      where: { status: "APPROVED", isActive: true },
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
        _count: {
          select: {
            tests: true,
            packages: true,
          },
        },
      },
      orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
    });

    return labs.map((lab) => ({
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
      testsCount: lab._count.tests,
      packagesCount: lab._count.packages,
    }));
  } catch (error) {
    console.error("getApprovedLabs failed", error);
    return [];
  }
}
