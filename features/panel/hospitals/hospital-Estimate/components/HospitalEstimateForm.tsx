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
  const [policyId, setPolicyId] = useState(estimate?.policyId || "");
  const [procedureId, setProcedureId] = useState(estimate?.procedureId || "");
  const [procedureCost, setProcedureCost] = useState(
    estimate?.procedureCost || ""
  );
  const [coveredAmount, setCoveredAmount] = useState(
    estimate?.coveredAmount || ""
  );
  const [outOfPocket, setOutOfPocket] = useState(estimate?.outOfPocket || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (estimate) {
      await updateEstimate(estimate.id, {
        policyId,
        procedureId,
        procedureCost: Number(procedureCost),
        coveredAmount: Number(coveredAmount),
        outOfPocket: Number(outOfPocket),
      });
    } else {
      await addEstimate({
        hospitalId,
        policyId,
        procedureId,
        procedureCost: Number(procedureCost),
        coveredAmount: Number(coveredAmount),
        outOfPocket: Number(outOfPocket),
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
        placeholder="Policy ID"
        value={policyId}
        onChange={(e) => setPolicyId(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Procedure ID"
        value={procedureId}
        onChange={(e) => setProcedureId(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 border rounded"
        placeholder="Procedure Cost"
        value={procedureCost}
        onChange={(e) => setProcedureCost(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 border rounded"
        placeholder="Covered Amount"
        value={coveredAmount}
        onChange={(e) => setCoveredAmount(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 border rounded"
        placeholder="Out of Pocket"
        value={outOfPocket}
        onChange={(e) => setOutOfPocket(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        {estimate ? "Update Estimate" : "Add Estimate"}
      </button>
    </form>
  );
}
