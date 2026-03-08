"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addStockEntry } from "../actions/addStockEntry";

type Props = {
  medicineId: string; // Passed in from parent (medicine being updated)
};

export default function PharmacyInventoryForm({ medicineId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      await addStockEntry({
        medicineId,
        batchNumber: values.batchNumber as string,
        quantity: Number(values.quantity),
        expiryDate: new Date(values.expiryDate as string),
        purchasePrice: values.purchasePrice
          ? parseFloat(values.purchasePrice as string)
          : undefined,
        sellingPrice: values.sellingPrice
          ? parseFloat(values.sellingPrice as string)
          : undefined,
      });

      e.currentTarget.reset();
      alert("✅ Stock entry added successfully!");
    } catch (err: any) {
      console.error("Error adding stock entry:", err);
      alert(`❌ ${err.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-xl gap-4">
          {/* Batch Number */}
          <div>
            <Label htmlFor="batchNumber" className="text-[#94A3B8]">Batch Number</Label>
            <Input id="batchNumber" name="batchNumber" required className="border-white/[0.1] bg-[#0B1120] text-white" />
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity" className="text-[#94A3B8]">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              min={1}
              required
              className="border-white/[0.1] bg-[#0B1120] text-white"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <Label htmlFor="expiryDate" className="text-[#94A3B8]">Expiry Date</Label>
            <Input id="expiryDate" type="date" name="expiryDate" required className="border-white/[0.1] bg-[#0B1120] text-white" />
          </div>

          {/* Purchase Price */}
          <div>
            <Label htmlFor="purchasePrice" className="text-[#94A3B8]">Purchase Price (₹)</Label>
            <Input
              id="purchasePrice"
              type="number"
              step="0.01"
              name="purchasePrice"
              className="border-white/[0.1] bg-[#0B1120] text-white"
            />
          </div>

          {/* Selling Price */}
          <div>
            <Label htmlFor="sellingPrice" className="text-[#94A3B8]">Selling Price (₹)</Label>
            <Input
              id="sellingPrice"
              type="number"
              step="0.01"
              name="sellingPrice"
              className="border-white/[0.1] bg-[#0B1120] text-white"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Stock"}
          </Button>
        </form>
  );
}
