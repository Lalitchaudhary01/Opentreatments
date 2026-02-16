"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Medicine } from "../types/pharmacyMedicine";

type Props = {
  initialData?: Partial<Medicine>;
  onSubmit: (data: any) => Promise<void>;
};

export default function PharmacyMedicineForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<any>(initialData || {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // convert numbers properly
        const prepared = {
          ...form,
          price: form.price ? parseFloat(form.price) : undefined,
          mrp: form.mrp ? parseFloat(form.mrp) : undefined,
          gst: form.gst ? parseFloat(form.gst) : undefined,
          quantity: form.quantity ? parseInt(form.quantity) : undefined,
          purchasePrice: form.purchasePrice
            ? parseFloat(form.purchasePrice)
            : undefined,
          sellingPrice: form.sellingPrice
            ? parseFloat(form.sellingPrice)
            : undefined,
          expiryDate: form.expiryDate ? new Date(form.expiryDate) : undefined,
        };
        await onSubmit(prepared);
      }}
      className="space-y-4 max-w-lg"
    >
      {/* ---------------- Medicine Info ---------------- */}
      <div>
        <Label>Name</Label>
        <Input name="name" value={form.name || ""} onChange={handleChange} required />
      </div>
      <div>
        <Label>Generic Name</Label>
        <Input name="genericName" value={form.genericName || ""} onChange={handleChange} />
      </div>
      <div>
        <Label>Brand</Label>
        <Input name="brand" value={form.brand || ""} onChange={handleChange} />
      </div>
      <div>
        <Label>Category</Label>
        <Input name="category" value={form.category || ""} onChange={handleChange} />
      </div>
      <div>
        <Label>Dosage Form</Label>
        <Input name="dosageForm" value={form.dosageForm || ""} onChange={handleChange} />
      </div>
      <div>
        <Label>Strength</Label>
        <Input name="strength" value={form.strength || ""} onChange={handleChange} />
      </div>
      <div>
        <Label>Manufacturer</Label>
        <Input name="manufacturer" value={form.manufacturer || ""} onChange={handleChange} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea name="description" value={form.description || ""} onChange={handleChange} />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          type="number"
          step="0.01"
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>MRP</Label>
        <Input
          type="number"
          step="0.01"
          name="mrp"
          value={form.mrp || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>GST (%)</Label>
        <Input
          type="number"
          step="0.01"
          name="gst"
          value={form.gst || ""}
          onChange={handleChange}
        />
      </div>

      {/* ---------------- Initial Stock Info ---------------- */}
      <div>
        <Label>Batch Number</Label>
        <Input
          name="batchNumber"
          value={form.batchNumber || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Quantity</Label>
        <Input
          type="number"
          name="quantity"
          value={form.quantity || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Expiry Date</Label>
        <Input
          type="date"
          name="expiryDate"
          value={form.expiryDate || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Purchase Price</Label>
        <Input
          type="number"
          step="0.01"
          name="purchasePrice"
          value={form.purchasePrice || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Selling Price</Label>
        <Input
          type="number"
          step="0.01"
          name="sellingPrice"
          value={form.sellingPrice || ""}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">
        {initialData ? "Update Medicine" : "Add Medicine"}
      </Button>
    </form>
  );
}
