"use client";

import { Procedure } from "../types";

export default function ProcedureCard({
  procedure,
  onEdit,
}: {
  procedure: Procedure;
  onEdit?: (p: Procedure) => void;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold">{procedure.name}</h3>
          {procedure.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {procedure.description}
            </p>
          )}
          {procedure.duration && (
            <p className="text-xs text-muted-foreground mt-1">
              Duration: {procedure.duration}
            </p>
          )}
        </div>

        {procedure.cost != null && (
          <span className="text-sm font-medium">₹{procedure.cost}</span>
        )}
      </div>

      {onEdit && (
        <button
          onClick={() => onEdit(procedure)}
          className="mt-3 text-sm text-cyan-600 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}
