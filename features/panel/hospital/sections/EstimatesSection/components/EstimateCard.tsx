"use client";

export default function EstimateCard({
  estimate,
  onEdit,
}: {
  estimate: any;
  onEdit?: (e: any) => void;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h3 className="font-semibold">
        {estimate.procedure?.name || "Procedure"}
      </h3>

      <p className="text-sm text-muted-foreground">
        Policy: {estimate.policy?.name || "—"}
      </p>

      <div className="mt-2 text-sm space-y-1">
        <p>Cost: ₹{estimate.procedureCost}</p>
        <p className="text-green-700">Covered: ₹{estimate.coveredAmount}</p>
        <p className="text-red-600">
          Out of Pocket: ₹{estimate.outOfPocket}
        </p>
      </div>

      {onEdit && (
        <button
          onClick={() => onEdit(estimate)}
          className="mt-3 text-sm text-cyan-600 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}
