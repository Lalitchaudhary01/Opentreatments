"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getSessionPharmacy } from "../../actions/getSessionPharmacy";

type UpsertCustomerInput = {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
};

export async function upsertPharmacyCustomer(input: UpsertCustomerInput) {
  const pharmacy = await getSessionPharmacy();

  const name = input.name.trim();
  const phone = input.phone.trim();
  if (!name || !phone) throw new Error("Name and phone are required");

  const payload = {
    name,
    phone,
    email: input.email?.trim() || null,
    notes: input.notes?.trim() || null,
  };

  const customer = input.id
    ? await prisma.pharmacyCustomer.update({
        where: { id: input.id },
        data: payload,
      })
    : await prisma.pharmacyCustomer.upsert({
        where: { pharmacyId_phone: { pharmacyId: pharmacy.id, phone } },
        update: payload,
        create: { pharmacyId: pharmacy.id, ...payload },
      });

  revalidatePath("/pharmacy/customers");
  revalidatePath("/pharmacy/orders");

  return customer;
}

export async function getPharmacyCustomers() {
  const pharmacy = await getSessionPharmacy();

  return prisma.pharmacyCustomer.findMany({
    where: { pharmacyId: pharmacy.id },
    orderBy: { updatedAt: "desc" },
  });
}
