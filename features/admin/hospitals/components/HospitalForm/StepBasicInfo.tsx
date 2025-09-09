"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AddHospitalInput } from "../../types/hospital";

interface Props {
  formData: AddHospitalInput;
  updateField: <K extends keyof AddHospitalInput>(
    field: K,
    value: AddHospitalInput[K]
  ) => void;
}

export default function StepBasicInfo({ formData, updateField }: Props) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Hospital Name"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={formData.description ?? ""}
        onChange={(e) => updateField("description", e.target.value)}
      />
      <Input
        placeholder="Address"
        value={formData.address ?? ""}
        onChange={(e) => updateField("address", e.target.value)}
      />
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="City"
          value={formData.city ?? ""}
          onChange={(e) => updateField("city", e.target.value)}
        />
        <Input
          placeholder="State"
          value={formData.state ?? ""}
          onChange={(e) => updateField("state", e.target.value)}
        />
        <Input
          placeholder="Country"
          value={formData.country ?? ""}
          onChange={(e) => updateField("country", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Phone"
          value={formData.phone ?? ""}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        <Input
          placeholder="Email"
          value={formData.email ?? ""}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>
      <Input
        placeholder="Website"
        value={formData.website ?? ""}
        onChange={(e) => updateField("website", e.target.value)}
      />
    </div>
  );
}
