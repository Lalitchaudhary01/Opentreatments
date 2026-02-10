import { getConsultationsForDoctor } from "../actions";
import { ConsultationList } from "../components";

import { ConsultationStatus } from "@prisma/client";
import { filterByStatus } from "../filterConsultations";

export default async function PendingConsultations() {
  const all = await getConsultationsForDoctor();
  const pending = filterByStatus(all, ConsultationStatus.PENDING);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pending Consultations</h1>
      <ConsultationList
        consultations={pending}
        emptyText="No pending consultations"
      />
    </div>
  );
}
