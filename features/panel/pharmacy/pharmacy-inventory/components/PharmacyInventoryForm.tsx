"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Add Stock Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Batch Number */}
          <div>
            <Label htmlFor="batchNumber">Batch Number</Label>
            <Input id="batchNumber" name="batchNumber" required />
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              min={1}
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input id="expiryDate" type="date" name="expiryDate" required />
          </div>

          {/* Purchase Price */}
          <div>
            <Label htmlFor="purchasePrice">Purchase Price (₹)</Label>
            <Input
              id="purchasePrice"
              type="number"
              step="0.01"
              name="purchasePrice"
            />
          </div>

          {/* Selling Price */}
          <div>
            <Label htmlFor="sellingPrice">Selling Price (₹)</Label>
            <Input
              id="sellingPrice"
              type="number"
              step="0.01"
              name="sellingPrice"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Stock"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
