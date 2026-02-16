"use client";

import { HospitalFacility } from "../types/hospitalFacility";
import { Button } from "@/components/ui/button";

interface Props {
  facility: HospitalFacility;
  onEdit: (facility: HospitalFacility) => void;
  onDelete: (id: string) => void;
}

export default function HospitalFacilityCard({
  facility,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{facility.name}</h3>
        {facility.description && (
          <p className="text-sm text-gray-600">{facility.description}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(facility)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(facility.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
