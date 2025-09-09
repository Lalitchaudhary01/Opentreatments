"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AddHospitalInput, ProcedureInput } from "../../types/hospital";

interface Props {
  formData: AddHospitalInput;
  updateField: (field: string, value: any) => void;
}

export default function StepProcedures({ formData, updateField }: Props) {
  const [procedures, setProcedures] = useState(
    formData.procedures?.length
      ? formData.procedures.map((p) => ({
          name: p.name,
          description: p.description ?? "",
          cost: p.cost ?? "",
          duration: p.duration ?? "",
        }))
      : [{ name: "", description: "", cost: "", duration: "" }]
  );

  function handleChange(
    index: number,
    field: keyof ProcedureInput,
    value: string | number
  ) {
    const newProcedures = [...procedures];
    if (field === "cost") {
      newProcedures[index][field] = value === "" ? "" : Number(value);
    } else {
      newProcedures[index][field] = value as string;
    }
    setProcedures(newProcedures);
    updateField("procedures", newProcedures);
  }

  function addProcedure() {
    const newProcedures = [
      ...procedures,
      { name: "", description: "", cost: "", duration: "" },
    ];
    setProcedures(newProcedures);
    updateField("procedures", newProcedures);
  }

  function removeProcedure(index: number) {
    const newProcedures = procedures.filter((_, i) => i !== index);
    setProcedures(newProcedures);
    updateField("procedures", newProcedures);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Procedures</h3>
      {procedures.map((procedure, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg flex flex-col gap-2 relative"
        >
          <input
            type="text"
            placeholder="Procedure Name"
            value={procedure.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={procedure.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Cost"
            value={procedure.cost}
            onChange={(e) => handleChange(index, "cost", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Duration (e.g., 1 hr)"
            value={procedure.duration}
            onChange={(e) => handleChange(index, "duration", e.target.value)}
            className="border p-2 rounded"
          />
          {procedures.length > 1 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeProcedure(index)}
              className="absolute top-2 right-2"
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addProcedure} className="mt-2">
        + Add Procedure
      </Button>
    </div>
  );
}
