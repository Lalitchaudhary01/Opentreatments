"use client";

import { deleteEstimate } from "../actions/hospitalEstimateActions";

interface Props {
  estimate: any;
  onDeleted?: () => void;
}

export default function HospitalEstimateCard({ estimate, onDeleted }: Props) {
  const handleDelete = async () => {
    await deleteEstimate(estimate.id);
    if (onDeleted) onDeleted();
  };

  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">
          Procedure: {estimate.procedure?.name || estimate.procedureId}
        </h3>
        <p>Insurance: {estimate.insurance?.name || estimate.insuranceId}</p>
        <p className="text-gray-700">Cost: ₹{estimate.estimatedCost}</p>
        {estimate.notes && (
          <p className="text-sm text-gray-600">{estimate.notes}</p>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
}
