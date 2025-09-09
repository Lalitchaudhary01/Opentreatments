"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AddHospitalInput } from "../../types/hospital";

interface Props {
  formData: AddHospitalInput;
  updateField: (field: keyof AddHospitalInput, value: any) => void;
}

export default function StepServices({ formData, updateField }: Props) {
  const [service, setService] = useState("");
  const [cost, setCost] = useState("");

  function addService() {
    if (!service.trim()) return;
    updateField("services", [
      ...(formData.services ?? []),
      { name: service, cost: parseFloat(cost) },
    ]);
    setService("");
    setCost("");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Service name"
        />
        <Input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Cost"
        />
        <Button onClick={addService}>Add</Button>
      </div>
      <ul className="list-disc pl-6">
        {formData.services?.map((s, idx) => (
          <li key={idx}>
            {s.name} – ₹{s.cost}
          </li>
        ))}
      </ul>
    </div>
  );
}
