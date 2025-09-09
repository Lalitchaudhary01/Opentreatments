"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AddHospitalInput } from "../../types/hospital";

interface Props {
  formData: AddHospitalInput;
  updateField: (field: keyof AddHospitalInput, value: any) => void;
}

export default function StepDoctors({ formData, updateField }: Props) {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  function addDoctor() {
    if (!name.trim()) return;
    updateField("doctors", [
      ...(formData.doctors ?? []),
      { name, specialization },
    ]);
    setName("");
    setSpecialization("");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doctor name"
        />
        <Input
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="Specialization"
        />
        <Button onClick={addDoctor}>Add</Button>
      </div>
      <ul className="list-disc pl-6">
        {formData.doctors?.map((d, idx) => (
          <li key={idx}>
            {d.name} – {d.specialization}
          </li>
        ))}
      </ul>
    </div>
  );
}
