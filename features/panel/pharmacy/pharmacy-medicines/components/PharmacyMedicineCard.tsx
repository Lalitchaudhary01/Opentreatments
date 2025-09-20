"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Medicine } from "../types/pharmacyMedicine";

type Props = {
  medicine: Medicine;
};

export default function PharmacyMedicineCard({ medicine }: Props) {
  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{medicine.name}</h3>
      <p className="text-sm text-gray-600">{medicine.genericName}</p>
      <p className="text-sm mt-1">Price: ₹{medicine.price}</p>

      <div className="flex gap-2 mt-3">
        <Link href={`/pharmacy-medicines/${medicine.id}`}>
          <Button size="sm" variant="outline">
            View
          </Button>
        </Link>
        <Link href={`/pharmacy-medicines/${medicine.id}/edit`}>
          <Button size="sm" variant="secondary">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
