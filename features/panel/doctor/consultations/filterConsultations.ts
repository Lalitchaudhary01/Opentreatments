import { ConsultationStatus } from "@prisma/client";
import { DoctorConsultation } from "./types";

/**
 * Filter consultations by status
 */
export function filterByStatus(
  list: DoctorConsultation[],
  status: ConsultationStatus
) {
  return list.filter((c) => c.status === status);
}

/**
 * Get only today's consultations (based on slot date)
 */
export function filterToday(list: DoctorConsultation[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return list.filter((c) => {
    const slot = new Date(c.slot);
    return slot >= today && slot < tomorrow;
  });
}

/**
 * Sort consultations by slot time (ascending)
 */
export function sortBySlot(list: DoctorConsultation[]) {
  return [...list].sort(
    (a, b) => new Date(a.slot).getTime() - new Date(b.slot).getTime()
  );
}
