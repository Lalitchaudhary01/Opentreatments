"use server";

import prisma from "@/lib/prisma";
import { GetMedicinesParams, MedicineSummary } from "../types/medicine";

export async function getMedicines(
  params: GetMedicinesParams = {}
): Promise<MedicineSummary[]> {
  const {
    query,
    city,
    pharmacyId,
    inStockOnly,
    minPrice,
    maxPrice,
    form,
    sort = "relevance",
    page = 1,
    perPage = 20,
  } = params;

  const where: any = {
    AND: [
      query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { genericName: { contains: query, mode: "insensitive" } },
            ],
          }
        : {},
      city ? { pharmacy: { city: { equals: city } } } : {},
      pharmacyId ? { pharmacyId } : {},
      inStockOnly ? { availability: true } : {},
      minPrice ? { price: { gte: minPrice } } : {},
      maxPrice ? { price: { lte: maxPrice } } : {},
      form ? { form: { equals: form } } : {},
    ],
  };

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
      ? { price: "desc" }
      : { createdAt: "desc" };

  const medicines = await prisma.medicine.findMany({
    where,
    include: {
      pharmacy: true,
      priceTrends: { orderBy: { date: "desc" }, take: 1 },
    },
    orderBy,
    skip: (page - 1) * perPage,
    take: perPage,
  });

  return medicines.map((m) => ({
    id: m.id,
    name: m.name,
    genericName: m.genericName,
    form: m.form,
    strength: m.strength,
    packSize: m.packSize,
    price: m.price,
    pharmacy: m.pharmacy,
    availability: m.availability,
    slug: m.slug,
    latestPricePoint: m.priceTrends[0] ?? null,
  }));
}
