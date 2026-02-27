// app/doctor/components/ConsultationList.tsx
"use client";

import { DoctorConsultation } from "../types";
import DoctorConsultationCard from "./DoctorConsultationCard";

interface ConsultationListProps {
  consultations: DoctorConsultation[];
}

export default function ConsultationList({ consultations }: ConsultationListProps) {
  if (!consultations || consultations.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-b-xl border border-gray-200 dark:border-gray-700">
        <div className="text-6xl mb-4">📅</div>
        <p className="text-gray-500 dark:text-gray-400">No appointments found</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-b-xl border border-t-0 border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
      {consultations.map((consultation) => (
        <DoctorConsultationCard key={consultation.id} consultation={consultation} />
      ))}
    </div>
  );
}