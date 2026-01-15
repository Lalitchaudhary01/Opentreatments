import { getConsultationsForDoctor } from "../actions";
import { ConsultationList } from "../components";
import { filterToday, sortBySlot } from "../filterConsultations";

export default async function TodayConsultations() {
  const all = await getConsultationsForDoctor();
  const today = sortBySlot(filterToday(all));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Today's Schedule</h1>
      <ConsultationList
        consultations={today}
        emptyText="No consultations scheduled for today"
      />
    </div>
  );
}
