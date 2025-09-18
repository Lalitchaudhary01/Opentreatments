"use client";

import { HospitalProcedure } from "../types/hospitalProcedure";
import { deleteProcedure } from "../actions/hospitalProcedureActions";
import { Button } from "@/components/ui/button";

interface Props {
  procedure: HospitalProcedure;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HospitalProcedureCard({
  procedure,
  onEdit,
  onDelete,
}: Props) {
  const handleDelete = async () => {
    await deleteProcedure(procedure.id);
    onDelete();
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{procedure.name}</h3>
        {procedure.description && (
          <p className="text-sm text-gray-600">{procedure.description}</p>
        )}
        {procedure.cost && <p className="text-sm">💰 {procedure.cost} INR</p>}
        {procedure.duration && (
          <p className="text-sm">⏱ {procedure.duration}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={onEdit} variant="outline" size="sm">
          Edit
        </Button>
        <Button onClick={handleDelete} variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    </div>
  );
}
