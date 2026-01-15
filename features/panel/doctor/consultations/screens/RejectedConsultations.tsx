import { getConsultationsForDoctor } from "../actions";
import { ConsultationList } from "../components";

import { ConsultationStatus } from "@prisma/client";
import { filterByStatus } from "../filterConsultations";

export default async function RejectedConsultations() {
  const all = await getConsultationsForDoctor();
  const rejected = filterByStatus(all, ConsultationStatus.REJECTED);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Rejected Consultations</h1>
      <ConsultationList
        consultations={rejected}
        emptyText="No rejected consultations"
      />
    </div>
  );
}
