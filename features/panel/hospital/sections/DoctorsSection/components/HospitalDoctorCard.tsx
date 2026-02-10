"use client";

import { Button } from "@/components/ui/button";
import { HospitalDoctor } from "../types";

export default function HospitalDoctorCard({
  doctor,
  onEdit,
  onDelete,
}: {
  doctor: HospitalDoctor;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-xl border p-4 space-y-2">
      <div>
        <p className="font-semibold">{doctor.name}</p>
        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
        {doctor.experience && (
          <p className="text-xs text-muted-foreground">
            {doctor.experience} yrs experience
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
