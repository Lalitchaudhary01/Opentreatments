import { ConsultationStatus } from "@prisma/client";

export interface DoctorConsultation {
  id: string;
  userId: string;
  doctorId: string;
  userName: string;
  userEmail: string;
  slot: string; // ISO date string
  duration?: number;
  mode: string;
  fee?: number;
  notes?: string;
  prescription?: string;
  status: ConsultationStatus;
  paymentStatus: string;
  createdAt: string;
}
