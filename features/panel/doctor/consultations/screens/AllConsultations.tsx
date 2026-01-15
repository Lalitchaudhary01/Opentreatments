import { getConsultationsForDoctor } from "../actions";
import { ConsultationList } from "../components";

export default async function AllConsultations() {
  const consultations = await getConsultationsForDoctor();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Consultations</h1>
      <ConsultationList consultations={consultations} />
    </div>
  );
}
