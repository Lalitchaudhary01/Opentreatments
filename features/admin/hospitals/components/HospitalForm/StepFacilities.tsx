"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AddHospitalInput } from "../../types/hospital";

interface Props {
  formData: AddHospitalInput;
  updateField: (field: keyof AddHospitalInput, value: any) => void;
}

export default function StepFacilities({ formData, updateField }: Props) {
  const [facility, setFacility] = useState("");

  function addFacility() {
    if (!facility.trim()) return;
    updateField("facilities", [
      ...(formData.facilities ?? []),
      { name: facility },
    ]);
    setFacility("");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
          placeholder="Facility name"
        />
        <Button onClick={addFacility}>Add</Button>
      </div>
      <ul className="list-disc pl-6">
        {formData.facilities?.map((f, idx) => (
          <li key={idx}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}
