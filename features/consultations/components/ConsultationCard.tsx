import { Consultation } from "../types/consultation";
import ConsultationStatusBadge from "./ConsultationStatusBadge";

export default function ConsultationCard({
  consultation,
}: {
  consultation: Consultation;
}) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">
          Consultation with Doctor {consultation.doctorId}
        </h3>
        <ConsultationStatusBadge status={consultation.status} />
      </div>
      <p className="text-sm text-gray-600">
        Slot: {new Date(consultation.slot).toLocaleString()}
      </p>
      {consultation.notes && (
        <p className="text-sm mt-2">Notes: {consultation.notes}</p>
      )}
    </div>
  );
}
