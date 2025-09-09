"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AddHospitalInput } from "../../types/hospital";

interface Props {
  formData: AddHospitalInput;
  updateField: (field: keyof AddHospitalInput, value: any) => void;
}

export default function StepInsurance({ formData, updateField }: Props) {
  const [insurance, setInsurance] = useState("");

  function addInsurance() {
    if (!insurance.trim()) return;
    updateField("insurances", [
      ...(formData.insurances ?? []),
      { name: insurance },
    ]);
    setInsurance("");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          placeholder="Insurance name"
        />
        <Button onClick={addInsurance}>Add</Button>
      </div>
      <ul className="list-disc pl-6">
        {formData.insurances?.map((i, idx) => (
          <li key={idx}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}
