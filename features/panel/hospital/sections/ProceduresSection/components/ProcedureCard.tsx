"use client";

import { Procedure } from "../types";

export default function ProcedureCard({
  procedure,
  onEdit,
}: {
  procedure: Procedure;
  onEdit?: (p: Procedure) => void;
}) {
  if (!procedure) return null;

  return (
    <div className="border rounded p-4 space-y-2">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold">{procedure.name}</h3>

          {procedure.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {procedure.description}
            </p>
          )}

          {procedure.cost && <p className="text-sm mt-1">₹ {procedure.cost}</p>}
        </div>

        {onEdit && (
          <button
            onClick={() => onEdit(procedure)}
            className="text-sm text-cyan-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
