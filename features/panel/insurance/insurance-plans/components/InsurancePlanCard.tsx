"use client";

import { InsurancePlan } from "../types/insurancePlan";

interface InsurancePlanCardProps {
  plan: InsurancePlan;
  onEdit: (plan: InsurancePlan) => void;
  onDelete: (id: string) => void;
}

export default function InsurancePlanCard({
  plan,
  onEdit,
  onDelete,
}: InsurancePlanCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col gap-2">
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <p className="text-gray-600">{plan.description}</p>
      <p className="text-sm text-gray-500">Premium: ₹{plan.premium}</p>
      <pre className="text-xs bg-gray-100 p-2 rounded">
        {JSON.stringify(plan.coverageDetails, null, 2)}
      </pre>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(plan)}
          className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(plan.id)}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
