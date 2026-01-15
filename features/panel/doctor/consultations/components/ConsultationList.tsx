"use client";

import { DoctorConsultation } from "../types";
import DoctorConsultationCard from "./DoctorConsultationCard";

interface ConsultationListProps {
  consultations: DoctorConsultation[];
  emptyText?: string;
}

export default function ConsultationList({
  consultations,
  emptyText = "No consultations found",
}: ConsultationListProps) {
  if (!consultations || consultations.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {consultations.map((c) => (
        <DoctorConsultationCard key={c.id} consultation={c as any} />
      ))}
    </div>
  );
}
