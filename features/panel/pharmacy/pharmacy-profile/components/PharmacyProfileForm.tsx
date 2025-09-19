"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PharmacyProfileFormProps {
  defaultValues?: {
    name?: string;
    ownerName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    licenseNumber?: string;
    gstNumber?: string;
  };
  onSubmit: (values: any) => Promise<void>;
  isEdit?: boolean;
}

export function PharmacyProfileForm({
  defaultValues,
  onSubmit,
  isEdit = false,
}: PharmacyProfileFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEdit ? "Edit Pharmacy Profile" : "Submit Pharmacy Profile"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="name">Pharmacy Name</Label>
            <Input name="name" defaultValue={defaultValues?.name} required />
          </div>

          <div>
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              name="ownerName"
              defaultValue={defaultValues?.ownerName}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              defaultValue={defaultValues?.email}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input name="phone" defaultValue={defaultValues?.phone} required />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input name="address" defaultValue={defaultValues?.address} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input name="city" defaultValue={defaultValues?.city} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input name="state" defaultValue={defaultValues?.state} />
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input name="country" defaultValue={defaultValues?.country} />
          </div>

          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              name="licenseNumber"
              defaultValue={defaultValues?.licenseNumber}
              required
            />
          </div>

          <div>
            <Label htmlFor="gstNumber">GST Number (optional)</Label>
            <Input name="gstNumber" defaultValue={defaultValues?.gstNumber} />
          </div>

          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Profile"
              : "Submit Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
