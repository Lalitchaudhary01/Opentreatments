"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Medicine } from "../types/pharmacyMedicine";

type Props = {
  medicine: Medicine & {
    stock: {
      id: string;
      batchNumber: string;
      quantity: number;
      expiryDate: string | Date;
    }[];
  };
};

export default function PharmacyMedicineCard({ medicine }: Props) {
  // Calculate total stock
  const totalStock = medicine.stock.reduce(
    (acc, entry) => acc + entry.quantity,
    0
  );

  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition space-y-2">
      <h3 className="text-xl font-semibold">{medicine.name}</h3>

      {medicine.genericName && (
        <p className="text-sm text-gray-600">
          <strong>Generic Name:</strong> {medicine.genericName}
        </p>
      )}
      {medicine.brand && (
        <p className="text-sm text-gray-600">
          <strong>Brand:</strong> {medicine.brand}
        </p>
      )}
      {medicine.category && (
        <p className="text-sm text-gray-600">
          <strong>Category:</strong> {medicine.category}
        </p>
      )}
      {medicine.dosageForm && (
        <p className="text-sm text-gray-600">
          <strong>Dosage Form:</strong> {medicine.dosageForm}
        </p>
      )}
      {medicine.strength && (
        <p className="text-sm text-gray-600">
          <strong>Strength:</strong> {medicine.strength}
        </p>
      )}
      {medicine.manufacturer && (
        <p className="text-sm text-gray-600">
          <strong>Manufacturer:</strong> {medicine.manufacturer}
        </p>
      )}
      {medicine.description && (
        <p className="text-sm text-gray-600">
          <strong>Description:</strong> {medicine.description}
        </p>
      )}

      <p className="text-sm">
        <strong>Price:</strong> ₹{medicine.price.toFixed(2)}
      </p>
      {medicine.mrp && (
        <p className="text-sm">
          <strong>MRP:</strong> ₹{medicine.mrp.toFixed(2)}
        </p>
      )}
      {medicine.gst && (
        <p className="text-sm">
          <strong>GST:</strong> {medicine.gst}%
        </p>
      )}

      <p className="text-sm">
        <strong>Total Stock:</strong> {totalStock}
      </p>

      {medicine.stock.length > 0 && (
        <div className="mt-2">
          <strong>Batch-wise Stock:</strong>
          {medicine.stock.map((entry) => (
            <div key={entry.id} className="text-sm text-gray-600">
              Batch: {entry.batchNumber} | Qty: {entry.quantity} | Expiry:{" "}
              {new Date(entry.expiryDate).toLocaleDateString()}
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500">
        <strong>Created At:</strong>{" "}
        {new Date(medicine.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Updated At:</strong>{" "}
        {new Date(medicine.updatedAt).toLocaleString()}
      </p>

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
