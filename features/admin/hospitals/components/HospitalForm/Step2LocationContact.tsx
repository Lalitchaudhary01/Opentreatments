import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface HospitalFormData {
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website: string;
}

interface Step2Props {
  formData: HospitalFormData;
  onChange: (field: string, value: any) => void;
}

export default function Step2LocationContact({
  formData,
  onChange,
}: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Full address of the hospital"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="City name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="State name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => onChange("country", e.target.value)}
            placeholder="Country name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="contact@hospital.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website URL</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => onChange("website", e.target.value)}
          placeholder="https://hospital-website.com"
        />
      </div>
    </div>
  );
}
