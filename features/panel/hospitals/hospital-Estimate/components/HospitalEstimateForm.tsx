"use client";

import { useState } from "react";
import {
  addEstimate,
  updateEstimate,
} from "../actions/hospitalEstimateActions";

interface Props {
  hospitalId: string;
  estimate?: any;
  onSuccess?: () => void;
}

export default function HospitalEstimateForm({
  hospitalId,
  estimate,
  onSuccess,
}: Props) {
  const [procedureId, setProcedureId] = useState(estimate?.procedureId || "");
  const [insuranceId, setInsuranceId] = useState(estimate?.insuranceId || "");
  const [estimatedCost, setEstimatedCost] = useState(
    estimate?.estimatedCost || ""
  );
  const [notes, setNotes] = useState(estimate?.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (estimate) {
      await updateEstimate(estimate.id, {
        procedureId,
        insuranceId,
        estimatedCost: Number(estimatedCost),
        notes,
      });
    } else {
      await addEstimate({
        hospitalId,
        procedureId,
        insuranceId,
        estimatedCost: Number(estimatedCost),
        notes,
      });
    }

    if (onSuccess) onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow"
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Procedure ID"
        value={procedureId}
        onChange={(e) => setProcedureId(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Insurance ID"
        value={insuranceId}
        onChange={(e) => setInsuranceId(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 border rounded"
        placeholder="Estimated Cost"
        value={estimatedCost}
        onChange={(e) => setEstimatedCost(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        {estimate ? "Update Estimate" : "Add Estimate"}
      </button>
    </form>
  );
}
