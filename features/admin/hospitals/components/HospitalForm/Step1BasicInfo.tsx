import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HospitalFormData {
  name: string;
  description: string;
  type: string;
  logo: string;
  image: string;
}

interface Step1Props {
  formData: HospitalFormData;
  onChange: (field: string, value: any) => void;
}

export default function Step1BasicInfo({ formData, onChange }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Hospital Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter hospital name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Brief description of the hospital"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Hospital Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => onChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hospital type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="government">Government</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="semi-private">Semi-Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            value={formData.logo}
            onChange={(e) => onChange("logo", e.target.value)}
            placeholder="https://example.com/logo.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Hospital Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => onChange("image", e.target.value)}
            placeholder="https://example.com/hospital.jpg"
          />
        </div>
      </div>
    </div>
  );
}
