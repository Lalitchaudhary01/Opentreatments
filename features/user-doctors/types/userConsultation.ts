export interface UserConsultationInput {
  doctorId: string;
  slot: string; // ISO date string
  duration?: number;
  mode?: "online" | "offline";
  notes?: string;
}
