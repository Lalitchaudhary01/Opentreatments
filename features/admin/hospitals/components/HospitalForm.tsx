"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addHospital } from "../actions/addHospital";
import { updateHospital } from "../actions/updateHopital";

import { Hospital } from "../types/hospital";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface HospitalFormProps {
  initialData?: Hospital; // edit ke liye
}

export default function HospitalForm({ initialData }: HospitalFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    country: initialData?.country || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    website: initialData?.website || "",
    logo: initialData?.logo || "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData) {
        await updateHospital({ id: initialData.id, ...formData });
      } else {
        await addHospital(formData);
      }

      // ✅ redirect after success
      router.push("/admin/hospitals");
    } catch (err) {
      console.error("❌ Hospital form error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="name">Hospital Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input name="state" value={formData.state} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="logo">Logo URL</Label>
          <Input name="logo" value={formData.logo} onChange={handleChange} />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading
          ? "Saving..."
          : initialData
          ? "Update Hospital"
          : "Add Hospital"}
      </Button>
    </form>
  );
}
