"use client";

import { Insurance } from "../types";

export default function InsuranceCard({
  insurance,
  onEdit,
}: {
  insurance: Insurance;
  onEdit?: (i: Insurance) => void;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold">{insurance.name}</h3>
          {insurance.provider && (
            <p className="text-sm text-muted-foreground">
              Provider: {insurance.provider}
            </p>
          )}
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${
            insurance.cashless
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {insurance.cashless ? "Cashless" : "Non-cashless"}
        </span>
      </div>

      {onEdit && (
        <button
          onClick={() => onEdit(insurance)}
          className="mt-3 text-sm text-cyan-600 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}
