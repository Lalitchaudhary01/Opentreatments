import { getConsultationsForDoctor } from "../actions";
import { ConsultationList } from "../components";
import { ConsultationStatus } from "@prisma/client";
import { filterByStatus } from "../filterConsultations";

export default async function ApprovedConsultations() {
  const all = await getConsultationsForDoctor();
  const approved = filterByStatus(all, ConsultationStatus.APPROVED);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Approved Consultations</h1>
      <ConsultationList
        consultations={approved}
        emptyText="No approved consultations"
      />
    </div>
  );
}
