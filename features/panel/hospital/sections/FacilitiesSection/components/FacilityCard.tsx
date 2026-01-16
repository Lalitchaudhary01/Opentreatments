"use client";

import { Facility } from "../types";

export default function FacilityCard({
  facility,
  onEdit,
}: {
  facility: Facility;
  onEdit?: (f: Facility) => void;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <h3 className="font-semibold">{facility.name}</h3>
      {facility.description && (
        <p className="text-sm text-muted-foreground mt-1">
          {facility.description}
        </p>
      )}
      {onEdit && (
        <button
          onClick={() => onEdit(facility)}
          className="mt-3 text-sm text-cyan-600 hover:underline"
        >
          Edit
        </button>
      )}
    </div>
  );
}
